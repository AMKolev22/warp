
import fse from 'fs-extra';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server'; 
import path from "path"

export async function POST(req : Request, res : NextApiResponse) {
  const { username } = await req.json();
  const jsonName = username.replaceAll(" ", "").toLowerCase();
  const destinationJSON = path.join(process.cwd(), "app/data/", `${jsonName}.json`);
  try {
    const fileContents = await fse.readFile(destinationJSON, 'utf8');
    const jsonData = JSON.parse(fileContents);
    console.log(jsonData);
    return NextResponse.json({ data : jsonData }, { status: 200 })
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
