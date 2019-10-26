const db = require('../../database/dbConfig');

module.exports = {
    getComments,
    getCommentById,
    postComment,
    updateComment,
    deleteComment,
}

function getComments(){
    return db('comments')
}

function getCommentById(id){
    return db('comments')
    .where({ id })
    .first();
}

async function postComment(comment) {
    const [id] = await db('comments').insert(comment);
  
    return findById(id);
}

function updateComment(id, changes) {
    return db('comments')
      .where({ id })
      .update(changes, '*');
}

function deleteComment(id) {
    return db('comment')
      .where({ id })
      .del();
  }