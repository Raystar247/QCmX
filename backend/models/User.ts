import { Model, DataType, DataTypes } from 'sequelize';
import sequelize from './sequelizeBase';
import { uid } from 'uid';

type UserFormType = {
    username: string;
    email: string;
    password: string;
};

export class User extends Model {
    declare id: string;
    declare username: string;
    declare email: string;
    declare password: string;

    public static async createFromForm(input: UserFormType): Promise<User> {
        await User.sync();
        const _id: string = uid();
        return await User.create({ id: _id, ...input });
    }
}


( async () => { 
    User.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, { sequelize });
console.log('initialize table User');
})();