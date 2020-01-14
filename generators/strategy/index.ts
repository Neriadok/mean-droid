import { Rule } from '@angular-devkit/schematics';
import {getTemplateRule} from "../generators.utils";
import {join} from "path";
import {strings} from '@angular-devkit/core';

export default function rule(options: {name: string}): Rule {
  const destinationPath = 'server/auth/strategies';
  return getTemplateRule(__dirname, destinationPath, options);
}
