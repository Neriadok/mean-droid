import {Schema} from 'mongoose';

export function extendsWithDates() {
  return {
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true},
  }
}

export function  getRefToSchema(ref, options = {}) {
  const defaultOptions = {autopopulate: true, hide: false};
  const config = {...defaultOptions, ...options};
  return {
    ...config,
    type: Schema.Types.ObjectId,
    ref
  }
}
