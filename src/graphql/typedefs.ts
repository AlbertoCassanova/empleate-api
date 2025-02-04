export const typeDefs = `#graphql
  input inputUser {
    email: String
    password: String,
    nombre: String,
    apellido: String
  }
  type Message {
    code: Int,
    msg: String
  }
  type Query {
    user(email: String, password: String): [User]
  }
  type User {
    email: String
    password: String,
    nombre: String,
    apellido: String
  }
  type Mutation {
    createUser(email: String, password: String): [Message]
  }
`; 