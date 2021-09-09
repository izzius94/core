import * as express from 'express';
import RouterProvider from './lib/RouterProvider';

export default function start(port: number, routeProvider: IRouterProvider, callbacks?: Promise<any>[], callback?: () => void) {
    Promise.all(callbacks).then(() => {
        const app = express();
        new routeProvider(app);
        
        app.listen(port, callback);
    });
}

interface IRouterProvider {
    new (app: express.Application): RouterProvider
}

export {default as Kernel} from './lib/Kernel';
export {RouterProvider};