export const userTypeDefs = `#graphql
    input updateUserData {
        fechaNacimiento: String,
        documento: String,
        sexo: String,
        telefono: String
    }
    type Query {
        loginUser(email: String, password: String): [Message],
        getUserInfo(token: String): [User],
    }
    type User {
        email: String,
        nombre: String,
        apellido: String,
        sexo: String,
        editado: Boolean
    }
    type Mutation {
        createUser(nombre: String, apellido: String, email: String, password: String): [Message]
        updateUser(token: String, newData: updateUserData): [Message]
    }
`; 