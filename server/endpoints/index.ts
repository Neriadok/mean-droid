import {relative} from 'path';
import {status} from '../../src/configuration';
import {sync} from 'glob';
import {Router} from 'express';
import * as multer from 'multer';
const controllersPath = __dirname;
const availableMethods = ['post', 'put', 'patch', 'delete', 'get'];
const router = Router();
const upload = multer();
module.exports = generateRouter();

function generateRouter(){
    setBaseEndpoint();
    setAvailableEndpoints();
    return router;
}

function setBaseEndpoint(){
    router.get('/', (req, res) => {
        res.send('API');
    });
}

function setAvailableEndpoints(){
    console.log('Available Endpoints:');
    const endpoints = sync(`${controllersPath}/**/index.ts`);
    endpoints.reduce(toRouterEndpoints,router);
}

function toRouterEndpoints (router, controllerPath) {
    const controller = require(controllerPath);
    const endpoint = toEndpointRoute(controllerPath);

    return Object.keys(controller).map((fn) => fn.replace('Method',''))
        .filter((method) => availableMethods.includes(method))
        .reduce((router, method) => toEndpoint(router, method, endpoint, controller), router);
}

function toEndpointRoute (controllerPath) {
    const route = relative(controllersPath, controllerPath).replace(/\\/, '/');
    return route.substring(0, route.lastIndexOf('/'));
}

function toEndpoint(router, method, endpoint, controller) {
    console.log(`${method.toUpperCase()} api/${endpoint}`);
    router[method](
        `/${endpoint}`,
        upload.none(),
        controller[`${method}Method`]
    );
    return router;
}
