import {
    Rule,
    apply,
    url,
    template,
    move,
    mergeWith,
    chain,
    branchAndMerge,
    Source,
    Tree
} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {resolve} from "path";
import * as path from "path";
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

export function getTemplateRule(dir, destinationPath, options): Rule {
    const templatePath = resolve(dir, './template').replace(/^\w:\\/, '/');
    const templateSource = getTemplateSource(templatePath, destinationPath, options);
    const baseRule = chain([mergeWith(templateSource)]);
    return chain([branchAndMerge(baseRule)]);

}

export function getTemplateSource(templatePath, destinationPath, options): Source {
    const templateSource = url(templatePath);
    const rules = [
        template({
            ...strings,
            ...options
        }),
        move(destinationPath)
    ];
    return apply(templateSource, rules);
}

export async function assertGeneration(generator: string, options: any , expected: Array<string>) {
    const collectionPath = path.join(__dirname, './collection.json');
    const runner = new SchematicTestRunner(generator, collectionPath);
    const tree = await runner.runSchematicAsync(generator, options, Tree.empty()).toPromise();
    expect(tree.files).toEqual(expect.arrayContaining(expected))
}
