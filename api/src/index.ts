// src/index.ts
import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();
app.use(cors()); // Enable CORS for all routes
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/get', (req: Request, res: Response) => {
    res.send('/getMe');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
