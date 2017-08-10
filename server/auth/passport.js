import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import db from '../models';

// const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
});

passport.use(new LocalStrategy(
    (username, password, done) => {
        db.User
            .findOne({ where: { username } })
            .then((user) => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect user' });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Incorrect password' });
                }

                return done(null, user);
            })
            .catch(err => done(err));
    }
));
