import {UserModel} from '../database/models/user';
import {Strategy} from 'passport-custom';
import {Passport} from 'passport';
import {resolve} from "path";
import {sync} from "glob";

const refreshParams = {
    usernameField: 'token',
    passReqToCallback: false
};

export const serverPassport: Passport = createPassport();

function createPassport() {
    const passport = new Passport();
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    const strategies = sync(resolve(__dirname, 'strategies/*.ts'));
    return strategies.reduce(intoUse, passport);
}

function intoUse(passport, strategyPath: string) {
    const strategyName = strategyPath.split('/').pop().replace('.ts', '');
    const {strategy} = require(strategyPath);
    passport.use(strategyName, new Strategy(strategy));
    return passport;
}

function serializeUser(user, done) {
    done(null, user.id);
}

function deserializeUser(id, done) {
    UserModel.findById(id, (err, user) => done(err, user));
}
