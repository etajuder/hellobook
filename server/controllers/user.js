import bcrypt from 'bcryptjs';
import passport from 'passport';

import db from '../models';

const UsersController = {
    /* Register / create user account */
    signup: (req, res) => {
        // Validate input
        req.checkBody('username', 'Invalid username').notEmpty();
        req.checkBody('password', 'Invalid password')
            .notEmpty().isLength({ min: 5 });
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('firstname', 'Invalid entry - Firstname')
            .notEmpty().isLength({ min: 2 });
        req.checkBody('lastname', 'Invalid entry - Lastname')
            .notEmpty().isLength({ min: 2 });

        // Validation result
        req.getValidationResult().then((result) => {
            if (!result.isEmpty()) {
                return res.status(400)
                    .json({ status: 'Validation error', data: result.array() });
            }

            const newUser = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8),
                email: req.body.email,
                fullname: `${req.body.firstname} ${req.body.lastname}`
            };

            db.User
                .create(newUser)
                .then(user => res.status(201).json(user))
                .catch(err => res.status(400).send(err));
        });
    },

    /* Login user */
    login: (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            if (err) return next(err);
            if (!user) {
                return res.status(500).send({
                    status: 'Invalid credentials'
                });
            }
            req.login(user, (err) => {
                if (err) return next(err);
                return res.status(200).send(user);
            });
        })(req, res, next);
    },

    /* logout user */
    logout: (req, res) => {
        req.logout();
        res.status(200).json({ status: 'Logged out' });
    }
};

export default UsersController;
