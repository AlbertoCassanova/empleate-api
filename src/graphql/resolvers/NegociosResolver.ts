import { Negocios } from "../../modelS/Negocios.ts"

export const negociosResolvers = {
    Query: {
        async getNegocios(){
            const negocios = await Negocios.findAll();
            console.log(negocios);
            return [{
                id: 1
            }]
        }
    }
}