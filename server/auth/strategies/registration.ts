import {UserModel} from '../../database/models/user';
import {generateHash} from "../token";

export async function strategy(req, done) {
    const emailInUse = await UserModel.findOne({'email': req.body.email});
    done(emailInUse ? null : await getUserRegistrated(req.body))
}


async function getUserRegistrated(userData) {
    const user = new UserModel({
        ...userData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        password: generateHash(userData.password)
    });
    await user.save();
    return user.getLogged();
}
