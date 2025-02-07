export const userTypeDefs = `#graphql
    input inputUser {
        email: String
        password: String,
        nombre: String,
        apellido: String
    }
    type Query {
        loginUser(email: String, password: String): [Message],
        getUserInfo(token: String): [User],
    }
    type User {
        email: String,
        nombre: String,
        apellido: String
    }
    type Mutation {
        createUser(nombre: String, apellido: String, email: String, password: String): [Message]
    }
`; 