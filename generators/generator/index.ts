import { Rule } from '@angular-devkit/schematics';
import {getTemplateRule} from "../generators.utils";
import {join} from "path";
import {strings} from '@angular-devkit/core';

export default function rule(options: {name: string}): Rule {
  const destinationPath = strings.underscore( join('./generators', options.name)).toLowerCase();
  return getTemplateRule(__dirname, destinationPath, options);
}
