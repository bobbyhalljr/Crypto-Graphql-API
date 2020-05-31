const { gql } = require('apollo-server');


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
    
    type Query {
        coins: [Coin]
        coin(id: String!): CoinById!
    }
`;

module.exports = { typeDefs }