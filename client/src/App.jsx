import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/NavBar'; // Ensure this path is correct
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from, ApolloLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://aiflashcard-production.up.railway.app/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('id_token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
