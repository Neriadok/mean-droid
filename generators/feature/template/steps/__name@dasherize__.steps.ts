import { defineStep } from 'cucumber';

defineStep(/^<%= dasherize(name) %> stuff$/, stuff);

export async function stuff() {
    // TODO
}
