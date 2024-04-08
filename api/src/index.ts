import cors from "cors";
import express, {Request, Response} from "express";
import {AssistantService} from "./services/AssistantService";
import {ThreadService} from "./services/ThreadService";
import {RunService} from "./services/RunService";
import {MessageService} from "./services/MessageService";
import {FileService} from "./services/FileService";
import {AssistantController} from "./controller/AssistantController";
import {ThreadController} from "./controller/ThreadController";
import {RunController} from "./controller/RunController";
import {MessageController} from "./controller/MessageController";
import {FileController} from "./controller/FileController";
import {PDFController} from "./controller/PDFController";
import {FunctionCallingController} from "./controller/FunctionCallingController";

const app = express();
app.use(cors()); // Enable CORS for all routes
const port = 3001;

// Route for creating an Assistant
app.use(express.json());

app.post("/createAssistant", AssistantController.createAssistant);
app.get("/assistantsList", AssistantController.assistantsList);
app.get("/getAssistant/:assistant_id", AssistantController.getAssistant);
app.delete("/deleteAssistant/:assistant_id", AssistantController.deleteAssistant);

// Route for creating a Thread
app.get("/createThread", ThreadController.createThread);
app.delete("/deleteThread/:thread_id", ThreadController.deleteThread);

// Route for creating a Message
app.post("/createMessage", MessageController.createMessage);
app.get("/messageList/:thread_id", MessageController.messageList);

// Route for creating a run
app.post("/createRun", RunController.createRun);
app.get("/retrieveRun/:thread_id/:run_id", RunController.retrieveRun);
app.post("/submitToolOutputs/:thread_id/:run_id", RunController.submitToolOutputs);

// Route for creating a File
app.get("/fileList", FileController.fileList);
app.post("/uploadFile", FileController.uploadFile);

app.get("/generatePDF", PDFController.generatePDF);

app.get("/functionCalling-get", FunctionCallingController.get);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
