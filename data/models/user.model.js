const init = (db) => {
    const userSchema = new db.Schema({
        name: {
            type: String
        },
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

    const User = db.model('User', userSchema);
    return User;
};

module.exports = init;