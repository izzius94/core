import {Application} from 'express'
import {RouterProvider as Parent} from '../../../src'
import Kernel from '../http/Kernel'
import routes from '../../routes/api'


export default class RouteServiseProvider extends Parent {
    protected _map = [{
        prefix: '/',
        router: routes
    }]

    constructor(app: Application) {
        super(app, new Kernel());
        app.disable('x-powered-by')
        this.boot()
    }
}
