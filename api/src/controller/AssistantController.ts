// AssistantController.ts
import {Request, Response} from "express";
import {AssistantService} from "../services/AssistantService";

export class AssistantController {

    public static async createAssistant(req: Request, res: Response) {
        try {
            const result = await AssistantService.createAssistant(req.body);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    public static async assistantsList(req: Request, res: Response) {
        try {
            const result = await AssistantService.assistantsList();
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    public static async getAssistant(req: Request, res: Response) {
        try {
            const result = await AssistantService.getAssistant(req.params.assistant_id);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    public static async deleteAssistant(req: Request, res: Response) {
        try {
            const result = await AssistantService.deleteAssistant(req.params.assistant_id);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }
}
