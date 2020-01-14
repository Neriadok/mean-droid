export async function extendsWithRef(element, attribute, model) {
  const reference = element[attribute] ? await getAttributeReference(element, attribute, model) : null;
  return {...element, [attribute]: reference}
}

export async function getAttributeReference(element, attribute, model) {
  const key = typeof element[attribute] === 'object' ? element[attribute].key : element[attribute];
  const referencedElement = await getKeyToRef(model, key);
  return referencedElement ? referencedElement._id : null;
}

export async function getKeyToRef(model, key) {
  return model.findOne({key}, '_id');
}

export async function getRefToKey(model, id) {
  return model.findOne({id}, 'key');
}

export function toRef({_id}) {
  return _id
}
