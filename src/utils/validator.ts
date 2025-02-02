export type ValidationResult = {
    validation: boolean,
    msg: string
}

export const validateSignUp = (email: string, nombre: string, apellido: string) : ValidationResult => {
    if (email=='' || nombre == '' || apellido == '') {
        return {
            validation: false,
            msg: "Rellene todos los campos"
        }
    }
    else {
        if (!email.includes('@')) {
            return {
                validation: false,
                msg: 'Correo electronico invalido'
            }
        } else {
            return {
                validation: true,
                msg: 'OK!'
            }
        }
    }
}