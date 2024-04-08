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

    public static async submitToolOutputs(
        thread_id: string,
        run_id: string,
        tool_outputs: OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParamsNonStreaming
    ) {
        return openai.beta.threads.runs.submitToolOutputs(
            thread_id,
            run_id,
            tool_outputs
        );
    }
}