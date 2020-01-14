import {compareSync} from 'bcryptjs';
import {generateToken} from '../../auth/token';
import {createModel} from  '../index';
import {extendsWithDates} from  '../utils/interfaces';

const attributes = {
  ...extendsWithDates(),
  email: {type: String, required: true, unique: true, dropDups: true},
  password: {type: String, default: null},
  perms: {type: Number, required: true, default: 0}
};

const methods = {
  validPassword,
  getLogged
};

export const UserModel = createModel('User', attributes, methods);

function validPassword(password) {
  return compareSync(password, this.password);
}

function getLogged() {
  const token =  generateToken(this);
  return {...this.toObject(), token}
}
