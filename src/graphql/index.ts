// Resolvers
import { negociosResolvers } from "./resolvers/NegociosResolver.ts";
import { userResolvers } from "./resolvers/UserResolver.ts";

// Typedefs
import { messageTypeDefs } from "./typedefs/MessageTypedef.ts";
import { negociosTypeDefs } from "./typedefs/NegociosTypedefs.ts";
import { userTypeDefs } from "./typedefs/UserTypedef.ts";

export const resolvers = [ 
    negociosResolvers,
    userResolvers,
];
export const typeDefs = [ 
    messageTypeDefs,
    negociosTypeDefs,
    userTypeDefs 
];