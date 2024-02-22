import fs from 'fs-extra';
import { NextRequest, NextResponse } from 'next/server';
import path from "path";

import { NextApiResponse } from 'next';


export async function POST(req : NextRequest, res : NextApiResponse ) {
    const body = await req.json();
    const { id, content } = body;
    const filePath = path.join(process.cwd(), `app/project/${id}/page.tsx`);

    try {
        let fileContent = await fs.readFile(filePath, 'utf8');
        
        const componentMap = {
            Typography: 'Typography',
        };

        let componentsStr = '';
        content.forEach(item => {
            const { component, props, x, y } = item;
            const htmlTag = componentMap[component];
            if (!htmlTag) return; 

            componentsStr += `
            <${htmlTag} variant = "${props.variant}" className="${props.className}">${props.children}</${htmlTag}>\n`;
        });

        const canvasDivPattern = /(<div[^>]*id\s*=\s*"canvas"[^>]*>)([\s\S]*?)(<\/div>)/;
        if (canvasDivPattern.test(fileContent)) {
            fileContent = fileContent.replace(canvasDivPattern, `$1$2${componentsStr}$3`);
        }
        else {
            console.error('Div with ID "canvas" not found');
            return  NextResponse.json({ message : "tmonkey negro nonon" }, { status: 400 });
        }

        await fs.writeFile(filePath, fileContent);
        return NextResponse.json({ message : "testing nigger monkey fat urmen dsada" }, { status: 200 });
    } catch (error) {
        console.error('Error modifying TSX file:', error);
        return NextResponse.json({ message : "testing nigger monkey fat urmen dsada" }, { status: 400 });
    }
}