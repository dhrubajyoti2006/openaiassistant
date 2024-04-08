// RunController.ts
import {Request, Response} from "express";
import {RunService} from "../services/RunService";

export class RunController {

    public static async createRun(req: Request, res: Response) {
        try {
            const result = await RunService.createRun(req.body.assistant_id, req.body.thread_id);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    public static async retrieveRun(req: Request, res: Response) {
        try {
            const result = await RunService.retrieveRun(req.params.thread_id, req.params.run_id);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    public static async submitToolOutputs(req: Request, res: Response) {
        try {
            const result = await RunService.submitToolOutputs(
                req.params.thread_id,
                req.params.run_id,
                {
                    tool_outputs: req.body
                }
            );
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }
}