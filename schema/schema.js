// Coin Type
const CoinType = new GraphQLObjectType({
    name: 'Coins',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        rank: { type: GraphQLInt },
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