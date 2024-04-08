// AssistantController.ts
import {Request, Response} from "express";
import {FunctionCallingService} from "../services/FunctionCallingService";

export class FunctionCallingController {

    public static async get(req: Request, res: Response) {
        try {
            const result = await FunctionCallingService.get();
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }
}
