export function sortAlphabetically(list, property) {
  return list.sort((a, b) => isHighier(a, b, property) ? 1 : -1);
}

function isHighier(a, b, property) {
  return property ? a[property] > b[property] : a > b;
}

export function setFormList (element, keyRegExp) {
  Object.keys(element)
    .filter((key) => keyRegExp.test(key))
    .forEach((key) => {
      const [list, index, value] = key.split('.');
      if (!element[list]) element[list] = [];
      if (!element[list][index]) element[list][index] = {};
      element[list][index][value] = element[key];
    });

  return element;
}

export function setFormSubproperty (element, keyRegExp) {
  Object.keys(element)
    .filter((key) => keyRegExp.test(key))
    .forEach((key) => {
      const [property, value] = key.split('.');
      if (!element[property]) element[property] = {};
      element[property][value] = element[key];
    });

  return element;
}

export function sortRandomly () {
  return Math.random() - 0.5;
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
