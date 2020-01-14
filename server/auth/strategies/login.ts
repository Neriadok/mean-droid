import {UserModel} from '../../database/models/user';

export async function strategy(req, done) {
    const user = await getUser(req.body);
    const correctLogin = user ? user.validPassword(req.body.password) : false;
    done(correctLogin ? user.getLogged() : null)
}

async function getUser({email}) {
    return UserModel.findOne({email})
}
