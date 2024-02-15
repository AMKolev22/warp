import { v4 } from 'uuid';
import fse from 'fs-extra';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server'; 
import path from "path"
import { writeFile } from 'fs/promises';

export async function POST(request: Request, res: NextApiResponse) {
  const idProject = v4();
  const destination = path.join(process.cwd(), "app/project/", idProject)
  const { username } = await request.json();
  const jsonName = username.replaceAll(" ", "").toLowerCase();
  const destinationJSON = path.join(process.cwd(), "app/data/", `${jsonName}.json`);
let existingData: { [key: string]: any } = {};
if (fse.existsSync(destinationJSON)) {
      const fileData = fse.readFileSync(destinationJSON, 'utf8');
      existingData = JSON.parse(fileData);
}

if (!existingData[jsonName]) {
      existingData[jsonName] = [];
}
existingData[jsonName].push(idProject);
const jsonData = JSON.stringify(existingData);
await fse.ensureFile(destinationJSON);
fse.writeFileSync(destinationJSON, jsonData);
await fse.ensureDir(destination);
  return NextResponse.json({ projectId: idProject, data : existingData }, { status: 200 });
}