// MessageController.ts
import {Request, Response} from "express";
import {MessageService} from "../services/MessageService";

export class MessageController {

    public static async createMessage(req: Request, res: Response) {
        try {
            const result = await MessageService.createMessage(req.body.thread_id, req.body.content);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    public static async messageList(req: Request, res: Response) {
        try {
            const result = await MessageService.messageList(req.params.thread_id);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }
}