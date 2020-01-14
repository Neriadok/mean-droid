import {createModel} from  '../index';
import {extendsWithDates} from  '../utils/interfaces';

const attributes = {
  ...extendsWithDates(),
  key: {type: String, required: true, unique: true, dropDups: true}
};

const methods = {};

export const <%= classify(name) %>Model = createModel('<%= classify(name) %>', attributes, methods);
