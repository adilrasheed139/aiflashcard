import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
const httpLink = createHttpLink({
  uri: 'https://aiflashcard-production.up.railway.app/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {

  return (
    <ApolloProvider client={client}>
    <Navbar/>
    <Outlet/>
    </ApolloProvider>
  )
}

export default App
