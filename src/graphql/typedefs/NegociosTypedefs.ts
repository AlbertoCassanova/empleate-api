export const negociosTypeDefs = `#graphql
    input NegocioInput {
        nombre: String
    }
    type Negocio {
        id: Int
        nombre: String
        verificado: Boolean
    }
    type Negocios {
        cantidad: Int
        negocio: [Negocio]
    }
    type Query {
        getNegocios(token: String): [Negocios],
    }
    type Mutation {
        createNegocio(token: String, negocio: NegocioInput): [Message]
    }
`
