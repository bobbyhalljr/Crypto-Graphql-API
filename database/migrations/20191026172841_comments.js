
exports.up = function(knex) {
    return knex.schema.createTable('comments', comments => {
        comments.increments('id').primary()

        comments.text('comments')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('comments')
};
