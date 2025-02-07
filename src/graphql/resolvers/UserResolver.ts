import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateSignUp } from '../../utils/validator.ts';
import { User } from '../../modelS/User.ts';

export type UserType = {
    email: string,
    password: string,
    nombre: string,
    apellido: string
}

export const userResolvers = {
    Query: {
        async loginUser(_:any, { email, password } : UserType){
            const user = await User.findOne({where:{email: email,}});
            const compare = bcrypt.compareSync(password, user?.dataValues.password);
            if (compare) {
                let token = jwt.sign({ 
                    nombre: user?.dataValues.nombre,
                    apellido: user?.dataValues.apellido,
                    email: user?.dataValues.email,
                    rol: user?.dataValues.rol,
                    id: user?.dataValues.id
                }, 'empleate.secret.key.login.authentification');
                return [{
                    msg: "OK",
                    code: 200,
                    token: token
                }]
            }
            else {
                return [{
                    msg: "ERROR",
                    code: 400,
                    token: 0
                }]
            }
        },
        async getUserInfo(_: any, { token } : any) {
            const tokenDecoded : any = jwt.decode(token);
            const user = await User.findOne({
                where: {
                    id: tokenDecoded.id,
                }
            });
            return [
                {
                    email: user?.dataValues.email,
                    nombre: user?.dataValues.nombre,
                    apellido: user?.dataValues.apellido
                }
            ]
        }
    },
    Mutation: {
        async createUser(_ : any, data: UserType){
            if (data) {
                const result = validateSignUp(data.email, data.nombre, data.apellido);
                if (result) {
                    const hash = bcrypt.hashSync(data.password, 10);
                    const count = await User.count();
                    try {
                        await User.create({
                            email: data.email,
                            password: hash,
                            nombre: data.nombre,
                            apellido: data.apellido,
                            rol: count == 0 ? "admin" : "client"
                        })
                        return [{
                            code: 200,
                            msg: result.msg
                        }]
                    } catch (error : any) {
                        return [{
                            code: 400,
                            msg: error.errors[0].message
                        }]
                    }
                }
                else {
                    return [{
                        code: 400,
                        msg: "ERROR"
                    }]
                }
            } else {
                return [{
                    code: 400,
                    msg: "ERROR"
                }]
            }
        }
    }
};