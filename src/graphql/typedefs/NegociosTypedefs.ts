export const negociosTypeDefs = `#graphql
    input NegocioInput {
        nombre: String
    }
    type Negocio {
        id: Int
        nombre: String
        verificado: Boolean
        latitude: Float
        longitude: Float
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
        updateNegocioLocation(token: String,businessId:Int,latitude: Float, longitude: Float): [Message]
    }
`
