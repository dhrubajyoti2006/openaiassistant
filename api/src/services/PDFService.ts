import puppeteer from "puppeteer";
import {Request, Response} from "express";

export class PDFService {

    /**
     * Generates a PDF from the given URL and saves it with the provided filename.
     *
     * @param url The URL of the website to generate the PDF from.
     * @param filename Optional. The name of the file to save the PDF as. Defaults to "website_snapshot.pdf".
     */
    static async generatePDF(){
        const url: string = "https://www.youtube.com/";
        const filename: string = "website_snapshot.pdf";
        try {
            // Launch a new browser instance.
            const browser = await puppeteer.launch();
            // Open a new page.
            const page = await browser.newPage();
            // Navigate to the URL.
            await page.goto(url, {waitUntil: 'networkidle2'});
            // Generate PDF and save it to the given filename.
            const pdfBuffer = await page.pdf({path: filename, format: 'A4'});
            // Close the browser.
            await browser.close();
            console.log(`PDF has been generated and saved as ${filename}`);

            return pdfBuffer;
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }

}