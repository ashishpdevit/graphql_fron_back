import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
})


const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token")

    return {
        headers: {
            ...headers,
            authorization: token
        }
    }

})


const client = new ApolloClient({
    // uri: 'http://localhost:4000/graphql',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client
