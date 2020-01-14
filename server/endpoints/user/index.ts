import {status} from '../../../src/configuration';
import {serverPassport} from "../../auth";

export function postMethod(req, res) {
    const sessionCallback = (err, user) => {
        err ? res.json(err) :
        user ? res.json(user) :
        res.sendStatus(status.conflict);
    };

    if(hasAllParams(req.body)){
        serverPassport.authenticate('registration', sessionCallback)(req, res);
    } else{
        res.sendStatus(status.ko);
    }
}

function hasAllParams(userData) {
    return userData.password && userData.email;
}
