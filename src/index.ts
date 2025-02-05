import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './graphql/typedefs.ts';
import { sequelize } from './db.ts';
import { resolvers } from './graphql/resolvers.ts';
import cors from "cors";
import express from "express";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE",],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

const startServer = async () => {
    await sequelize.authenticate();
    await server.start();
    app.use("/graphql", expressMiddleware(server))
    app.listen(4000, () => {
        console.log("Servidor GraphQL listo en http://localhost:4000/graphql");
    });
};

try {
    startServer();
} catch (error) {
    console.error('Unable to connect to the database:', error);
}