// AssistantController.ts
import {Request, Response} from "express";
import {PDFService} from "../services/PDFService";

export class PDFController {

    public static async generatePDF(req: Request, res: Response) {
        try {
            const result = await PDFService.generatePDF();
            res.setHeader('Content-Type', 'application/pdf');
            // You could also set a filename for the PDF here
            res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }
}
