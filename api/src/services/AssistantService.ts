import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
import {AssistantTool} from "openai/resources/beta";

interface AssistantPayload {
    name: string,
    instructions: string,
    code_interpreter: boolean,
    retrieval: boolean
}

export class AssistantService {

    public static async createAssistant(assistant: AssistantPayload) {
        let tools: Array<AssistantTool> = [];
        if (assistant.code_interpreter) {
            tools.push({
                type: "code_interpreter"
            });
        }
        if (assistant.retrieval) {
            tools.push({
                type: "retrieval"
            });
        }
        return openai.beta.assistants.create({
            instructions: assistant.instructions,
            name: assistant.name,
            tools: tools,
            model: "gpt-3.5-turbo-0125",
        });
    }

    public static async assistantsList() {
        return openai.beta.assistants.list({
            order: "desc",
            limit: 20,
        });
    }

    public static async getAssistant(assistant_id: string) {
        return openai.beta.assistants.retrieve(
            assistant_id
        );
    }

    public static async deleteAssistant(assistant_id: string) {
        return openai.beta.assistants.del(assistant_id);
    }

}