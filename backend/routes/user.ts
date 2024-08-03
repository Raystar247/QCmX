import express, { Request, Response } from 'express';
import { uid } from 'uid';

const userRouter = express.Router();

type UserType = {
    id: string;
    username: string;
    email: string;
    password: string;
};
const users: UserType[] = [];


userRouter.get('/all', (req: Request, res: Response) => {
    console.log("getリクエストを受け付けました");
    return res.status(200).json({ users });
});

userRouter.post('/register', (req: Request, res: Response) => {
    console.log('postリクエストを受け付けました');
    const { username } = req.body.data;
    // console.log(req.body.data);
    const uidValue = uid();
    users.push(req.body.data);
    console.log(users);
    // return res.status(200).json({ id: uidValue, ...req.body.data });
    return res.status(200).json({ users });
});

export default userRouter;