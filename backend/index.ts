import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();
const PORT: number = 3000;
const FRONTEND_URL: string = "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL }));

try {
    app.listen(PORT, () => {
        console.log(`server running at: //localhost:${PORT}`);
    });
} catch (e) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

app.get('/', (req: Request, res: Response) => {
    console.log("getリクエストを受け付けました");
    return res.status(200).json({ message: 'Hello World' });
});