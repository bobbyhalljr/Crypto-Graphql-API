const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Coin Type
const CoinType = new GraphQLObjectType({
    name: 'Coins',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        rank: { type: GraphQLInt },
    })
})

const QuotesType = new GraphQLObjectType({
    name: 'quotes',
    fields: () => ({
        USD: { USD }
    })
})

const USDType = new GraphQLObjectType({
    name: 'USD',
    fields: () => ({
        market_cap: { type: GraphQLFloat },
        price: { type: GraphQLFloat },
        price_change_12h: { type: GraphQLFloat },
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        coins: {
            type: new GraphQLList(CoinType),
            resolve(parent, args){
                return axios.get('https://api.coinpaprika.com/v1/tickers')
                .then(res => res.data);
            }
        },
        quotes: {
            type: new GraphQLList(QuotesType),
            resolve(parent, args){
                return axios.get('https://api.coinpaprika.com/v1/tickers')
                .then(res => res.data);
            }
        },
        USD: {
            type: new GraphQLList(USDType),
            resolve(parent, args){
                return axios.get('https://api.coinpaprika.com/v1/tickers')
                .then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})


/* 
    id: string
    name: string
    rank: number
    market_cap: number
    price: number
    percent_change_12h: number
*/

// Single Coin
/* 
    name: string
    description: string
    proof_type: string
    org_structure: string
    started_at: string
    hash_algorithm: string
    team: array
    website: array [0] -> string
*/