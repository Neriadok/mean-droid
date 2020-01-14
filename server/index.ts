import * as express from 'express';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import {startConnection} from './database';
import {json, urlencoded} from 'body-parser';
import {join} from 'path';
import {createServer} from 'http';
import {serverPassport} from "./auth";

const port = process.env.PORT || '80';
const app = express();

export default startServer();

function startServer() {
    setAppPort();
    startConnection();
    setRequestManagement();
    setSessionManagement();
    setAppRoutes();
    return createServer(app).listen(port, () => console.log(`API running on localhost:${port}`));
}

function setAppPort() {
    app.set('port', port);
}

function setRequestManagement() {
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(json({limit: '100mb'}));
    app.use(urlencoded({extended: true, limit:'100mb'}));
}

function setSessionManagement() {
    app.use(serverPassport.initialize());
    app.use(serverPassport.session());
}

function setAppRoutes() {
    app.use('/api', require('./endpoints'));
    app.use(express.static(join(__dirname, '../www')));
    app.use('/android-debug', express.static(join(process.cwd(), '../platforms/android/app/build/outputs/apk/debug/app-debug.apk')));
    app.get('*', (req, res) => {
        res.sendFile(join(__dirname, '../www/index.html'));
    });
}


