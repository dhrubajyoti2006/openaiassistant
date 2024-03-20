// src/index.ts
import cors from 'cors';
import express, {Request, Response} from 'express';
import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function createAssistant() {
    const myAssistant = await openai.beta.assistants.create({
        instructions:
            "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
        name: "Math Tutor",
        tools: [{type: "code_interpreter"}],
        model: "gpt-3.5-turbo-0125",
    });

    console.log(myAssistant);
}

async function createThread() {
    const emptyThread = await openai.beta.threads.create();

    console.log(emptyThread);
}

async function assistantsList() {
    return openai.beta.assistants.list({
        order: "desc",
        limit: 20,
    });
}

async function deleteAssistant(assistant_id: string) {
    return await openai.beta.assistants.del(assistant_id);

}

const app = express();
app.use(cors()); // Enable CORS for all routes
const port = 3000;

app.use(express.json());

app.get('/createAssistant', async (req: Request, res: Response) => {
    await createAssistant();
    res.send('Assistant created');
});

app.get('/assistantsList', async (req: Request, res: Response) => {
    // await assistantsList();
    res.send(await assistantsList());
});

app.delete('/deleteAssistant/:assistant_id', async (req: Request, res: Response) => {
    res.send(await deleteAssistant(req.params.assistant_id));
});

app.get('/createThread', async (req: Request, res: Response) => {
    await createThread();
    res.send('Thread Created');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
