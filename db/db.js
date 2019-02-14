const mongoose = require('mongoose');

const init = (connectionString) => {
    return mongoose.connect(connectionString, { useNewUrlParser: true })
        .then((db) => {
            console.log(`Connected to ${db.connections[0].name}.`);
            return db;
        })
        .catch((err) => console.error(err.message));
};

module.exports = init;