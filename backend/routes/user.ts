import express, { Request, Response } from 'express';
import {User} from '../models/User';
import { uid } from 'uid';
import sequelize from '../models/sequelizeBase';

const userRouter = express.Router();

type UserType = {
    id: string;
    username: string;
    email: string;
    password: string;
};
const users: UserType[] = [];


userRouter.get('/all', async (req: Request, res: Response) =>  {
    console.log("getリクエストを受け付けました");
    const users: User[] = await User.getAllUsers();
    return res.status(200).json({ users });
});

userRouter.post('/register', async (req: Request, res: Response) => {
    console.log('postリクエストを受け付けました');
    console.log(req.body.data);
    const addedUser = await User.createFromForm({ ...req.body.data });
    const users: User[] = await User.findAll();
    return res.status(200).json({ users });
});

export default userRouter;