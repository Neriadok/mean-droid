import {resolve} from "path";
import {start} from "forever";

export async function main() {
    const serverPath = resolve(process.cwd(), './server/index.ts');
    start(serverPath, {
        command: 'ts-node --type-check -r tsconfig-paths/register',
        errFile:   resolve(process.cwd(), './storage/server-err.log'),
        logFile:   resolve(process.cwd(), './storage/server-log.log'),
        outFile:   resolve(process.cwd(), './storage/server-out.log'),
        verbose: true,
        path: process.cwd()
    });
}
