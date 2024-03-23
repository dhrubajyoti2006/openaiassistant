import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export class MessageService {

    public static async createMessage(thread_id: string, content: string) {
        return openai.beta.threads.messages.create(
            thread_id,
            {role: "user", content: content}
        );
    }

    public static async messageList(thread_id: string) {
        return openai.beta.threads.messages.list(thread_id);
    }
}