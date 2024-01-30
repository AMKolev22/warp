import { Storage } from "@google-cloud/storage";
import fs from "fs-extra"


const storage = new Storage();

export async function uploadFile(bucketID : string = "warp-storage", id : string) {
    let destination : string | null = `../projects/${id}`;
    await storage.bucket(bucketID).upload(id, {
        gzip: true,
        destination: destination,
    });
  fs.remove(destination, err => {
        console.log(`${err}`)
        return err;
    })
  console.log(`Successfully uploaded.`);
}

export async function createFile(id : string){
    let destination : string | null = `../projects/${id}/index.html`;
    destination = `../projects/${id}`;
    fs.createFile(destination, err => {
        console.log(`${err}`)
        return err;
    })
}
