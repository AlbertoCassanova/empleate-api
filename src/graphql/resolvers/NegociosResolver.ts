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
            return [{
                cantidad: negocios.length,
                negocio: negocios.length != 0 ?[negocios[0].dataValues] : []
            }]
        }
    },
    Mutation: {
        async createNegocio(_ : any, { token, negocio }: any){
            const tokenDecoded = decodeJwt(token);
            await Negocios.create({
                nombre: negocio.nombre,
                creadoPor: tokenDecoded.id,
                verificado: false
            })
            return [{
                code: 200
            }]
        },
        async updateNegocioLocation(_: any, { token, businessId, latitude, longitude }: any) {
            const tokenDecoded = decodeJwt(token);
            const buscarNgocio = await Negocios.findOne({ where: { id: businessId }});
            if (buscarNgocio?.dataValues.creadoPor == tokenDecoded.id) {
                const rs = await Negocios.update({
                    latitude: latitude,
                    longitude: longitude
                }, { where: { id: businessId}});
                return [{
                    code: 200
                }]
            }
            else {
                return [{
                    code: 400,
                    msg: "Ha ocurrido un error"
                }]
            }
        }
    }
}