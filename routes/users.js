const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret.config');

const init = (data, passport) => {
    const router = Router();

    const { users: { addUser, deleteUser, getUserByUsername, comparePassword } } = data;

    router
        .post('/register', (req, res) => {
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            };

            getUserByUsername(newUser.username, (err, user) => {
                if (err) console.error(err.message);

                if (user) {
                    return res.json({ success: false, msg: 'This username already exists.' })
                }

                addUser(newUser, (err, user) => {
                    if (err) {
                        return res.json({ success: false, msg: 'Failed to register a user.' });
                    }
    
                    return res.json({ success: true, msg: 'The user was registered.' })
                });

            });
        })

        .post('/authenticate', (req, res) => {
            const { username, password } = req.body;

            getUserByUsername(username, (err, user) => {
                if (err) console.error(err.message);

                if (!user) {
                    return res.json({ success: false, msg: 'The user was not found.'});
                }

                comparePassword(password, user.password, (err, isMatch) => {
                    if (err) console.error(err.message);

                    if (isMatch) {
                        const token = jwt.sign(user.toJSON(), secret, {
                            expiresIn: 604800
                        });

                        return res.json({
                            success: true,
                            token: `JWT ${token}`,
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                username: user.username
                            }
                        });
                    }

                    return res.json({ success: false, msg: 'Wrong password.' });
                });
            });
        })
    
        .get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
            res.json({ user: req.user });
        })

        .delete('/profile/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
            const id = req.params.id;
            deleteUser(id, () => {
                return res.json({ success: true, msg: 'The user was deleted.' })
            });
        });


    return router;
};

module.exports = init;