export const userTypeDefs = `#graphql
    scalar Upload

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    input updateUserData {
        fechaNacimiento: String,
        documento: String,
        sexo: String,
        telefono: String
    }
    type Query {
        loginUser(email: String, password: String): [Message],
        getUserInfo(token: String): User,
    }
    type User {
        email: String,
        nombre: String,
        apellido: String,
        sexo: String,
        editado: Boolean,
        fotoPerfil: String
        id: Int
        negocios: Negocios,
        fechaNacimiento: String,
        telefono: String
    }
    type Mutation {
        createUser(nombre: String, apellido: String, email: String, password: String): [Message]
        updateUser(token: String, newData: updateUserData): [Message]
        updaetProfilePhoto(token: String, file: Upload!): [Message]!
    }
`; 