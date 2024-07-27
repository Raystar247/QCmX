import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { uid } from 'uid';

const app: Application = express();
const PORT: number = 3000;
const FRONTEND_URL: string = "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

type UserType = {
    id: string;
    username: string;
};


const users: UserType[] = [];

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
    return res.status(200).json({ users });
});

app.post('/user/register', (req: Request, res: Response) => {
    console.log('postリクエストを受け付けました');
    const { username } = req.body.data;
    console.log(req.body.data.username);
    const uidValue = uid();
    return res.status(200).json({ id: uidValue, username });
});