import "dotenv/config";
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export class FunctionCallingService {

    public static async get() {
        return "Hi";
    }

}