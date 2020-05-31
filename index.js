const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');


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
