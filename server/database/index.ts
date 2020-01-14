
// @ts-ignore
import {name} from '../../package.json';
import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';
import * as mongooseHidden from 'mongoose-hidden';

export function startConnection() {
  mongoose.connect(`mongodb://localhost/${name}`, {useNewUrlParser: true});
  mongoose.connection.on('error', console.error.bind(console, 'DB error:'));
}

export function stopConnection() {
  mongoose.connection.close();
}

export function createModel(name, attributes, methods = {}, transform?) {
  const schema = new mongoose.Schema(attributes);
  schema.plugin(autopopulate);
  schema.plugin(mongooseHidden(), getHiddenParams());
  schema.methods = {...schema.methods, ...methods};
  if (transform) schema.options.toObject.transform = transform;
  return mongoose.model(name, schema);
}

export function extendsAtThisMoment(element) {
  const thisMoment = Date.now();
  return {...element, updatedAt: thisMoment, createdAt: thisMoment}
}

export function getPagination(req) {
  const params = req.body.page ?  req.body
    : req.query.page ?  req.query
    : null;
  return params ? {
    page: parseInt(params.page) || 0,
    limit: parseInt(params.limit) || 1
  } : null;
}

export async function getObjects(Model, options = {}, req = null) {
  const pagination = req ? getPagination(req) : null;
  const elements = pagination ? await getObjectsPage(Model, options, pagination)
    : await Model.where(options);
  return elements.map(toObject);
}

export function getObjectsPage(Model, options = {}, {page, limit}) {
  return Model.where(options).skip(page * limit).limit(limit);
}

export function toObject(element) {
  return element.toReferencedObject ? element.toReferencedObject() : element.toObject();
}

export function getHiddenParams() {
  const params = {
    _id: true,
    password: true,
    createdAt: true,
    updatedAt: true
  };
  return {hidden: params}
}
