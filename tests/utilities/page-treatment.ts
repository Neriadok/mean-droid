import {PageObject} from './page-object';
import {strings} from '@angular-devkit/core';
import {resolve} from 'path';

export function getPageObject(page: string): PageObject {
  const pagePath = resolve(process.cwd(), `src/app/pages/${page}/${page}.page.object`);
  const pageClassName = strings.classify(page) + 'PageObject';
  const pageConstructor = require(pagePath)[pageClassName];
  return new pageConstructor();
}

export async function accessPage(page: string) {
  const pageObject = getPageObject(page);
  await pageObject.navigate();
}

export async function isVisible(page: string) {
  const pageObject = getPageObject(page);
  await pageObject.isVisible();
}
