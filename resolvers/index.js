const resolvers = {
    Query: {
        coins: async (parent, args, { dataSources }) => {
            const getCoins = await dataSources.coinAPI.getAllCoins()
            return getCoins
        },

        coin: async (parent, { id }, { dataSources }) => {
            const coinById = await dataSources.coinAPI.getCoinById(id)
            return coinById
        },

    }
}

module.exports = { resolvers }