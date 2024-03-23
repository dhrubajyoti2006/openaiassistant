import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export class RunService {

    public static async createRun(assistant_id: string, thread_id: string) {
        return openai.beta.threads.runs.create(
            thread_id,
            {assistant_id: assistant_id}
        );
    }

    public static async retrieveRun(thread_id: string, run_id: string) {
        return openai.beta.threads.runs.retrieve(
            thread_id,
            run_id
        );
    }
}