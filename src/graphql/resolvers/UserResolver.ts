// Encrypt utils
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

// Utils
import path from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { validateSignUp } from '../../utils/validator.ts';

// Graphql
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';

// Models
import "../../modelS/Relationships.ts"
import { User } from '../../modelS/User.ts';
import { Negocios } from '../../modelS/Negocios.ts';

export type UserType = {
    email: string,
    password: string,
    nombre: string,
    apellido: string,
    sexo?: string,
    editado?: boolean
}

export const userResolvers = {
    Upload: GraphQLUpload,
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
                },
                include: Negocios
            });
            return {
                    email: user?.dataValues.email,
                    nombre: user?.dataValues.nombre,
                    apellido: user?.dataValues.apellido,
                    sexo: user?.dataValues.sexo,
                    editado: user?.dataValues.editado,
                    fotoPerfil: user?.dataValues.fotoPerfil,
                    id: user?.dataValues.id,
                    fechaNacimiento: user?.dataValues.fechaNacimiento,
                    telefono: user?.dataValues.telefono,
                    negocios: {
                        cantidad: user?.dataValues != undefined ? user?.dataValues.negocios.length : null,
                        negocio: []
                    }
                }
        }
    },
    Mutation: {
        async createUser(_ : any, data: UserType, { req } : any){
            if (data) {
                const result = validateSignUp(data.email, data.nombre, data.apellido);
                let sesionIp = [
                    {
                        ip: req.clientIp,
                        fecha: new Date()
                    }
                ]
                if (result) {
                    const hash = bcrypt.hashSync(data.password, 10);
                    const count = await User.count();
                    try {
                        await User.create({
                            email: data.email,
                            password: hash,
                            nombre: data.nombre,
                            apellido: data.apellido,
                            rol: count == 0 ? "admin" : "client",
                            editado: false,
                            direccionIp: JSON.stringify(sesionIp),
                            verificado: true
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
        },
        async updateUser(_: any, data: any){
            const tokenDecoded : any = jwt.decode(data.token);
            const rs = await User.update(
                {
                    fechaNacimiento: data.newData.fechaNacimiento,
                    documento: data.newData.documento,
                    sexo: data.newData.sexo,
                    telefono: data.newData.telefono,
                    editado: true
                },
                {where: {id: tokenDecoded.id}}
            )
            if (rs) {
                return [{
                    code: 200,
                    msg: "OK"
                }]   
            }
            else {
                return [{
                    code: 400,
                    msg: "OK"
                }]   
            }
        },
        async updaetProfilePhoto(_ : any, data: any){
            const file = await data.file;
            const token = data.token;
            const tokenDecoded : any = jwt.decode(token);
            
            const { createReadStream, filename, mimetype } = await file;
            const stream = createReadStream();
            const dirname = path.resolve(path.dirname(''));
            const uploadDir = path.join(dirname, `./media/${tokenDecoded.id}`);
            if (!existsSync(uploadDir)) {
                mkdirSync(uploadDir, { recursive: true });
            }
            const extension = path.extname(filename);
            const newFilename = `${randomUUID()}${extension}`;
            const filePath = path.join(uploadDir, newFilename);
            await new Promise((resolve, reject) => {
                const writeStream = createWriteStream(filePath);
                stream.pipe(writeStream);
                writeStream.on("finish", resolve);
                writeStream.on("error", reject);
            });
            const rs = await User.update(
                {
                    fotoPerfil: newFilename
                },
                {where: {id: tokenDecoded.id}}
            )
            if (rs) {
                return [{
                    code: 200,
                    msg: "OK"
                }]   
            }
            else {
                return [{
                    code: 400,
                    msg: "OK"
                }]   
            }
        }
    }
};