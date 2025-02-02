import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/typedefs.ts';
import { sequelize } from './db.ts';
import { resolvers } from './graphql/resolvers.ts';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
} catch (error) {
    console.error('Unable to connect to the database:', error);
}