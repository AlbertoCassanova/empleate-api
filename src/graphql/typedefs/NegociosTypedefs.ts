export const negociosTypeDefs = `#graphql
    type Negocio {
        nombre: String
    }
    type Query {
        getNegocios(id: String): [Negocio],
    }
`