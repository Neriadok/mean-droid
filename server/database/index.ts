
// @ts-ignore
import {name} from '../../package.json';
import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';
import * as mongooseHidden from 'mongoose-hidden';
import {status} from "../../src/configuration";

export function startConnection() {
  mongoose.connect(`mongodb://localhost/${name}`, {useNewUrlParser: true});
  mongoose.connection.on('error', console.error.bind(console, 'DB error:'));
}

export function stopConnection() {
  mongoose.connection.close();
}

export async function getModel(model, req, res) {
  const body = await getObjects(model, req);
  if(body.length){
    res.send(body);
  } else {
    res.sendStatus(status.empty);
  }
}

export async function postModel(model, req, res) {
  if(Array.isArray(req.body)){
    await postManyModels(model, req.body, res);
  } else {
    await postSingleModel(model, req.body, res);
  }
}

export async function postSingleModel(model, data, res) {
  let element = await model.findOne({key: data.key});
  if (element) {
    res.sendStatus(status.conflict);
  } else {
    await addModel(model, data);
    element = await model.findOne({key: data.key});
    res.send(toObject(element));
  }
}

export async function postManyModels(model, items, res) {
  await Promise.all(items.map((item) => setModel(model, item)));
  await getModel(model, {}, res);
}


export async function putModel(model, req, res) {
  let element = await model.findOne({key: req.body.key});
  if (element) {
    await editModel(model, req.body);
    element = await model.findOne({key: req.body.key});
    res.send(toObject(element));
  } else {
    res.sendStatus(status.notFound);
  }
}

export async function addModel(model, data) {
  await model.create(extendsAtThisMoment(data));
}

export async function editModel(model, data) {
  const $set = {...data, updatedAt: Date.now()};
  await model.update({key: data.key}, {$set});
}

export async function setModel(model, data) {
  let element = await model.findOne({key: data.key});
  if (element) {
    await editModel(model, data);
  } else {
    await addModel(model, data);
  }
}

export async function deleteModel(model, req, res) {
  let element = await model.findOne({key: req.body.key});
  if (element) {
    element.delete();
    res.sendStatus(status.ok);
  } else {
    res.sendStatus(status.notFound);
  }
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

export async function getObjects(Model, req) {
  const params = Object.keys(req.body || {}).length ? req.body
      : Object.keys(req.query || {}).length ? req.query
      : Object.keys(req.params || {}).length ? req.params
      : {};
  const pagination = getPagination(params);
  const query = getQuery(params);
  const elements = pagination ? await getObjectsPage(Model, query, pagination)
    : await Model.where(query);
  return elements.map(toObject);
}

export function getPagination(params) {
  return params && params.limit ? {
    page: parseInt(params.page) || 0,
    limit: parseInt(params.limit)
  } : null;
}

export function getQuery(params = {}) {
  return Object.keys(params).reduce((query, param) => intoQueryParams(query, params, param),{});
}

export function getObjectsPage(Model, query, {page, limit}) {
  return Model.where(query).skip(page * limit).limit(limit);
}

export function intoQueryParams(query, params, param) {
  return isPaginationParam(param) ? {...query}
    : {...query, [param]: toQueryParam(params[param])}
}

export function toQueryParam(value) {
  try{
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

function isPaginationParam(param:string) {
  return ['page', 'limit'].includes(param);
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
