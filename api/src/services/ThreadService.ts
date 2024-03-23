import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export class ThreadService {
    public static async createThread() {
        const emptyThread = await openai.beta.threads.create();
        console.log(emptyThread);

        return emptyThread;
    }

    public static async deleteThread(thread_id: string) {
        return openai.beta.threads.del(thread_id);
    }
}