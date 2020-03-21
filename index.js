const axios = require('axios');
const { ApolloServer, gql } = require('apollo-server');
const GraphQLJSON = require('graphql-type-json');
const { RESTDataSource } = require('apollo-datasource-rest');


class CoinAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.coinpaprika.com/v1';
    }

    async getCoin(id){
        await this.get(`/coins/${id}`)
    }
}

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
        percent_change_1h: Float
    }

    type CoinById {
        id: ID
        name: String
        symbol: String
        description: String
        team: [Team]
        started_at: String
        proof_type: String
        hash_algorithm: String
        whitePaper: String
        links: [Links]
    }

    type Team {
        name: String
        position: String
    }

    type Links {
        website: String
    }
    
    type Query {
        coins: [Coin]
        coin(id: String): CoinById
    }
`;

const resolvers = {
    Query: {
        coins: () => axios.get('https://api.coinpaprika.com/v1/tickers')
        .then(res => res.data),
        
        coin: async (_source, { id }, { dataSources }) => {
            return dataSources.coinAPI.getCoin(id);
        }
    }
}

const server = new ApolloServer({ 
    typeDefs, 
    resolvers ,
    dataSources: () => {
        return {
            coinAPI: new CoinAPI()
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`server is running at ${url}`)
})