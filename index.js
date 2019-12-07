const axios = require('axios');
const { ApolloServer, gql } = require('apollo-server');

const tempCoins = [
    {
        name: "Bitcoin",
        rank: 1,
    },
    {
        name: "Ethereum",
        rank: 2,
    },
    {
        name: "Bitcoin Cash",
        rank: 5,
    }
];

const typeDefs = gql`

    type Coin {
        id: ID
        name: String
        symbol: String
        rank: Int
    }
    
    type Query {
        coins: [Coin]
    }
`;

const resolvers = {
    Query: {
        coins: () => axios.get('https://api.coinpaprika.com/v1/tickers')
        .then(res => res.data),
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(`server is running at ${url}`)
})