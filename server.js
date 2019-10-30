const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

// enable cors
app.use(cors());

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})