"use client"
import { toast } from "sonner"
import React, { useEffect } from 'react';
import { FollowerPointerCard } from "../../../components/ui/following-pointer";



const TitleComponent = ({
  title,
}: {
  title: string;
}) => (
  <div className="flex items-center space-x-2">
    <p>{title}</p>
  </div>
)

export default function useContextMenu() {
useEffect(() => {
  let actionInProgress = false;

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      if (!actionInProgress) {
        actionInProgress = true;

        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 4000));

        toast.promise(promise, {
          loading: 'Loading...',
          success: (data) => {
            actionInProgress = false; 
            return `Content has been successfully saved.`;
          },
          error: (err) => {
            actionInProgress = false;
            return 'Error';
          },
        });
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Control' || e.key === 's') {
      actionInProgress = false; 
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
  };
}, []);

  return (
    <div className="w-screen h-screen">
    <FollowerPointerCard
        title={
          <TitleComponent
            title={"Title"}
          />
        }
      ></FollowerPointerCard>
    </div>
  );
};

