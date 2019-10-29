
exports.up = function(knex) {
    return knex.schema.createTable('favoriteCoins', favCoins => {
        favCoins.increments('id').primary()

        favCoins.integer('favoriteCoins')

    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('favoriteCoins')
};
