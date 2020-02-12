export function sortAlphabetically(list, property?) {
  return list.sort((a, b) => isHighier(a, b, property) ? 1 : -1);
}

function isHighier(a, b, property?) {
  return property ? a[property] > b[property] : a > b;
}

export function isNotRepeated(target, index, list, property?) {
  const properties = list.map((listItem) => property ? listItem[property] : listItem);
  const targetProperty = property ? target[property] : target;
  return properties.indexOf(targetProperty) === index;
}

export function isSame (element1, element2, property?) {
  return property ? element1[property] === element2[property]
     : element1 === element2;
}

export function match(given, expected, property?) {
  return property
      ? matchProperty(given, expected, property)
      : Object.keys(expected).every((expectedProperty) => matchProperty(given, expected, expectedProperty));
}

export function matchProperty(given, expected, property): boolean {
  return isSame(given, expected, property)
      || matchInOptions(given, expected, property)
      || matchRegExp(given, expected, property);
}

export function matchInOptions(given, expected, property): boolean {
  return Array.isArray(expected[property])
      ? expected[property].includes(given[property])
      : false;
}

export function matchRegExp(given, expected, property): boolean {
  return Object.keys(expected).includes('$regex')
      ? given[property].match(expected[property].$regex)
      : false;
}
