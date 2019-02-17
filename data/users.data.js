const init = (User, bcrypt) => {
    const addUser = (newUser, callback) => {
        const user = new User(newUser);

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) console.error(err.message);
                user.password = hash;
                user.save(callback);
            });
        })
    };

    const deleteUser = (id, callback) => {
        User.deleteOne({ _id: id}, callback);
    }

    const getUserById = (id, callback) => {
        User.findById(id, callback);
    };

    const getUserByUsername = (username, callback) => {
        User.findOne({ username}, callback);
    };

    const comparePassword = (candidatePassword, hash, callback) => {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) console.error(err.message);

            callback(null, isMatch);
        });
    };

    return {
        addUser,
        deleteUser,
        getUserById,
        getUserByUsername,
        comparePassword
    }
};

module.exports = init;