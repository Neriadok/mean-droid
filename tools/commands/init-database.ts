import {ensureDir} from 'fs-extra';
import {resolve} from "path";
import {spawn} from "child_process";

export async function main() {
    const dbPath = resolve(process.cwd(), 'storage/database');
    const logPath = resolve(dbPath, 'logs');
    const logFile = resolve(logPath, 'mongodb.log');
    ensureDir(logPath);
    const options = [
        `--logpath=${logFile}`,
        `--dbpath=${dbPath}`
    ];
    const dbProcess = spawn('mongod',
        process.platform === "win32" ? ['--install', ...options] : ['--fork', ...options]
    );

    return new Promise((resolve, reject) => {
        dbProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        dbProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            reject();
        });

        dbProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });
    });
}
