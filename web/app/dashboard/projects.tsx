import Role from "./label"
import { v4 } from "uuid"
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import ProjectsCard from "./project-component";
import { ReactEventHandler, useEffect } from "react";
import { useState } from 'react';


export default function Projects({ role, session }: { role: string, session: any }): JSX.Element {
  const filePathName = session?.user?.name.replaceAll(" ", "");
  const [projectIds, setProjectIds] = useState<string[]>([]);

const loadProjects = async () => {
    const username = session?.user?.name;
    const data = JSON.stringify({ username });
    try {
      const response = await fetch(`/api/load`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data,
      });

      if (response.ok) {
        const { data } = await response.json();
        const user = Object.keys(data)[0];
        setProjectIds(data[user]);
      } else {
        console.error('Failed to load projects');
      }
    } catch (error) {
      console.log("inside catch");
      console.error(`Error loading projects: ${error}`);
    }
  };
  useEffect(() => {
      loadProjects();
  });

  const newProject = async () => {
    const username = session.user.name;
    const data = JSON.stringify({ username });
    try {
      const response = await fetch(`/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data,
      });

      if (response.ok) {
        const { projectId, data } = await response.json();
        location.reload();
        window.open(`/project/${projectId}`);
        const user = Object.keys(data)[0];
      } else {
        console.error('Failed to create project');
      }
    } catch (error) {
      console.log("inside catch");
      console.error(`Error creating project: ${error}`);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center ml-44 mt-80" style={{ fontFamily: "Inter, sans-serif" }}>
        <span className='text-[2.6rem] tracking-wider font-semibold text-font-color opacity-90 __username inline-block'>{session?.user?.name}'s websites</span>
        <Role role={role} />
        <a className="font-medium tracking-wider __create text-font-color text-[1.3rem] -mr-20 ml-auto border-solid border-x-[0.1rem] border-y-[0.1rem] border-font-color rounded-xl hover:cursor-pointer hover:-translate-y-2 transition-all duration-200 ">
          <span className="inline-block px-6 py-3" onClick={() => newProject()}>CREATE NEW</span>
        </a>
      </div>
      <div className="h-[0.2rem] -mr-32 bg-[#888] bg-opacity-50 ml-44 mt-16"></div>
      <div className="flex flex-row mt-20 gap-44 ml-44">
      {projectIds.slice(0, 4).map((projectId) => (
        <ProjectsCard key={projectId} projectID={projectId} session={session} />
      ))}
      </div>
    </div>
  );
}
