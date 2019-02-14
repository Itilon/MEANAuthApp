const bcrypt = require('bcryptjs');

const init = (db) => {
    const users = require('./users.data')(require('./models/user.model')(db), bcrypt);

    return Promise.resolve({
        users
    });
};

module.exports = init;