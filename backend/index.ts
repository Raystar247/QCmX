import express, { Application } from 'express';
import cors from 'cors';

import userRouter from './routes/user';

const app: Application = express();
const PORT: number = 3000;
const FRONTEND_URL: string = "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



try {
    app.listen(PORT, () => {
        console.log(`server running at: //localhost:${PORT}`);
    });
} catch (e) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

app.use('/user', userRouter);