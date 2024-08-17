const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { authMiddleware } = require('./utils/auth');
const { connectToDatabase } = require('./config/connection'); // Updated import
const cors = require('cors'); // Import cors

const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  try {
    // Connect to the database
    await connectToDatabase();
    await server.start();

    // Use CORS middleware
    app.use(cors({
      origin: 'https://aiflashcard-rho.vercel.app', // Your frontend URL
      methods: ['GET', 'POST', 'OPTIONS'],
      credentials: true,
    }));

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
      context: authMiddleware,
    }));

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Failed to start Apollo Server:', error);
  }
};

startApolloServer();
