import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/typedefs.js';
import { sequelize } from './db.js';
import { User } from './modelS/User.js';

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const user = [
    {
        email: "algo@nada.com",
        password: "123456789"
    },
    {
        email: "pedro@perez.com",
        password: "123456789"
    }
]

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
        async user(_, { email, password }){
            console.log(email);
            return await User.findAll({
                where: {
                    email: email,
                    password: password
                }
            })
        },
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
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