import {Application, Router, Request, Response, NextFunction} from 'express';
import Kernel from './Kernel';

/**
 * Rappresentation of the Route service provider
 */
 abstract class RouteServiceProvider {
    /**
     * This attribute is used to map the router(s) in your application, it can take
     * a third parameter to specify the middleware(s) to use in the router
     */
    protected abstract _map: Route[];
    protected _app: Application;
    protected _kernel: Kernel;

    /**
     * 
     * @param app The express application
     */
    constructor(app: Application, kernel: Kernel) {
        this._app = app;
        this._kernel = kernel;
    }

    protected boot() {
        const globals = this._kernel.globals;

        if (globals) {
            if (Array.isArray(globals)) {
                globals.forEach(el => {
                    this._app.use(el);
                });
            } else {
                this._app.use(globals);
            }
        }
        
        this._map.forEach(el => {
            if (el.middleware) {
                this._app.use(el.prefix, el.middleware, el.router(Router()));
            } else {
                this._app.use(el.prefix, el.router(Router()));
            }
        });

        this._app.use(this._kernel.notFound);
        this._app.use(this._kernel.errorHandler);
    }
}

interface Route {
    prefix: string,
    router: (router: Router) => Router,
    middleware?: ((req: Request, res: Response, next: NextFunction) => void) | ((req: Request, res: Response, next: NextFunction) => void)[]
}

export default RouteServiceProvider;