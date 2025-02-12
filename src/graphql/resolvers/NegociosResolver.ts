import jwt from 'jsonwebtoken';
import "../../modelS/Relationships.ts"
import { Negocios } from "../../modelS/Negocios.ts"
import { decodeJwt } from '../../utils/encrypt.ts';
import { User } from '../../modelS/User.ts';

export const negociosResolvers = {
    Query: {
        async getNegocios(_: any, { token } : any){
            const tokenDecoded : any = jwt.decode(token);
            const negocios = await Negocios.findAll({
                where:{creadoPor:tokenDecoded.id},
                include: User
            });
            console.log(negocios[0].dataValues)
            return [{
                cantidad: negocios.length,
                negocio: [negocios[0].dataValues]
            }]
        }
    },
    Mutation: {
        async createNegocio(_ : any, { token, negocio }: any){
            const tokenDecoded = decodeJwt(token);
            const crearNegocio = await Negocios.create({
                nombre: negocio.nombre,
                creadoPor: tokenDecoded.id,
                verificado: false
            })
            console.log(crearNegocio);
            return [{
                code: 200
            }]
        }
    }
}