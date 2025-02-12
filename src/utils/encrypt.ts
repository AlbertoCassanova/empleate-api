import jwt from 'jsonwebtoken';

type tokenDecodedType = {
    valid: boolean,
    id?: number,
    email?: string,
    nombre?: string,
    rol?: string,
    apellido?: string
}

export const decodeJwt = (token: string) : tokenDecodedType => {
    const tokenDecoded : any = jwt.decode(token);
    if (tokenDecoded) {
        return {
            valid: true,
            id: tokenDecoded.id,
            email: tokenDecoded.email,
            nombre: tokenDecoded.nombre,
            apellido: tokenDecoded.apellido,
            rol: tokenDecoded.rol
        }
    }
    else {
        return {
            valid: false
        }
    }
}