const axios = require('axios');
const { ApolloServer, gql } = require('apollo-server');
const GraphQLJSON = require('graphql-type-json');

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

    scalar Object

    type Coin {
        id: ID
        name: String
        symbol: String
        rank: Int
        quotes: Quotes
    }

    type Quotes {
        USD: USD
    }

    type USD {
        price: Float
        market_cap: Float
        percent_change_12h: Float
    }

    type CoinById {
        id: ID
        name: String
        symbol: String
        description: String
    }
    
    type Query {
        coins: [Coin]
        coin: CoinById
    }
`;

const resolvers = {
    Query: {
        coins: () => axios.get('https://api.coinpaprika.com/v1/tickers')
        .then(res => res.data),
        coin: () => axios.get(`https://api.coinpaprika.com/v1/coins/`)
        .then(res => res.data)
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(`server is running at ${url}`)
})