// FileController.ts
import {Request, Response} from "express";
import {FileService} from "../services/FileService";

export class FileController {

    public static async fileList(req: Request, res: Response) {
        try {
            const result = await FileService.fileList();
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    public static async uploadFile(req: Request, res: Response) {
        try {
            const result = await FileService.uploadFile(req.body);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }
}
