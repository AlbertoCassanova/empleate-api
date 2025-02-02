import bcrypt from 'bcrypt'
import { validateSignUp } from '../utils/validator.ts';
import { User } from '../modelS/User.ts';

export type UserType = {
    email: string,
    password: string,
    nombre: string,
    apellido: string
}

export type DataType = {
    user?: UserType
}

export const resolvers = {
    Query: {
        async user(_:any, { email, password } : UserType){
            console.log(email);
            return await User.findAll({
                where: {
                    email: email,
                    password: password
                }
            })
        },
    },
    Mutation: {
        async createUser(_ : any, data: DataType){
            const { user } = data;
            if (user) {
                const result = validateSignUp(user.email, user.nombre, user.apellido);
                if (result) {
                    const hash = bcrypt.hashSync(user.password, 10);
                    console.log(hash);
                    await User.create({
                        email: user.email,
                        password: user.password,
                        nombre: user.nombre,
                        apellido: user.apellido
                    });
                    return {
                        code: 200,
                        msg: result.msg
                    }
                }
                else {
                    return {
                        code: 400,
                        msg: result.msg
                    }
                }
            } else {
                return {
                    code: 400,
                    msg: "ERROR"
                }
            }
        }
    }
};