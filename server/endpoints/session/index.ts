import {status} from '../../../src/configuration';
import {generateToken, authenticateToken} from '../../auth/token';
import {UserModel} from "../../database/models/user";
import {serverPassport} from "../../auth";

export function getMethod(req, res) {
  authenticateToken(req, res, () => sendTokenizedUser(req, res));
}

async function sendTokenizedUser(req, res) {
  const user = await UserModel.findOne({email: req.user.email});
  user ? sendToken(res, user) : res.sendStatus(status.forbidden);
}

export function postMethod(req, res) {
  const sessionCallback = (err, user) => {
    err ? res.json(err)
      : user ? sendUser(res, user)
      : res.sendStatus(status.unauthorized);
  };

  serverPassport.authenticate('login', sessionCallback)(req, res);
}

function sendToken(res, user) {
  const token = generateToken(user);
  res.send({token});
}

function sendUser(res, user) {
  res.json(user)
}

