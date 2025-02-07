import { userResolvers } from "./resolvers/UserResolver.ts";
import { messageTypeDefs } from "./typedefs/MessageTypedef.ts";
import { userTypeDefs } from "./typedefs/UserTypedef.ts";

export const resolvers = [ userResolvers ];
export const typeDefs = [ 
    messageTypeDefs,
    userTypeDefs 
];