import "dotenv/config";
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export class FileService {

    public static async fileList() {
        return openai.files.list();
    }

    public static async uploadFile(filepath: string) {
        return openai.files.create({
            file: fs.createReadStream(filepath),
            purpose: "assistants",
        });
    }

}