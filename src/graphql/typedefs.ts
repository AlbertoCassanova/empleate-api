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
    token: String
  }
  type Query {
    user(email: String, password: String): [Message]
  }
  type User {
    email: String
    password: String,
    nombre: String,
    apellido: String
  }
  type Mutation {
    createUser(nombre: String, apellido: String, email: String, password: String): [Message]
  }
`; 