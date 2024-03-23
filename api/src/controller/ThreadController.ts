// ThreadController.ts
import {Request, Response} from "express";
import {ThreadService} from "../services/ThreadService";

export class ThreadController {

    public static async createThread(req: Request, res: Response) {
        try {
            const result = await ThreadService.createThread();
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    public static async deleteThread(req: Request, res: Response) {
        try {
            const result = await ThreadService.deleteThread(req.params.thread_id);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }
}