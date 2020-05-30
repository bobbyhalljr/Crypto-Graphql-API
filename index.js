const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');


class CoinAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.coinpaprika.com/v1';
    }

    async getAllCoins(){
        return this.get('/tickers')
    }

    async getCoinById(id){
        return this.get(`/coins/${id}`)
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

        rank: Int
        is_new: Boolean

        is_active: Boolean
        type: String
        tags: [Tag]

        team: [Team]

        description: String
        message: String
        open_source: Boolean
        hardware_wallet: Boolean
        started_at: String
        development_status: String
        proof_type: String
        org_structure: String
        hash_algorithm: String
        platform: String
        whitePaper: Object
        links: Link
        links_extended: Object
    }

    type Tag {
        id: String
        name: String
        coin_counter: Int   # Number of currencies with this tag
        ico_counter: Int    # Number of ic projects with this tag
    }

    type Team {
        name: String
        position: String
    }

    type Link {
        explorer: [String]
        facebook: [String]
        reddit: [String]
        source_code: [String]
        website: [String]
        youtube: [String]
    }

    type PriceConverter {
        base_currency_id: String
        base_currency_name: String
        base_price_last_updated: String
        quote_currency_id: String
        quote_currency_name: String
        quote_price_last_updated: String
        amount: Int
        price: Float
    }
    
    type Query {
        coins: [Coin]
        coin(id: String!): CoinById!
    }
`;

const resolvers = {
    Query: {
        coins: (parent, args, { dataSources }) => {
            return dataSources.coinAPI.getAllCoins()
        },

        coin:(parent, { id }, { dataSources }) => {
            return dataSources.coinAPI.getCoinById(id)
        },
        
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

server.listen({ port: process.env.PORT || 4040 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });