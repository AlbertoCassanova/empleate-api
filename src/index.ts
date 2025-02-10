import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { sequelize } from './db.ts';
import { resolvers, typeDefs } from './graphql/index.ts';
import cors from "cors";
import requestIp from 'request-ip';
import express from "express";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import mediaRoutes from "./routes/media.router.ts"

const app = express();

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
});

app.use(requestIp.mw())
app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE",],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use("/media", mediaRoutes);

const startServer = async () => {
    await sequelize.authenticate();
    await server.start();
    app.use("/graphql", expressMiddleware(server, {
        context: async ({ req }) => ({ req: req }),
    }))
    app.listen(4000, () => {
        console.log("Servidor GraphQL listo en http://localhost:4000/graphql");
    });
};

try {
    startServer();
} catch (error) {
    console.error('Unable to connect to the database:', error);
}