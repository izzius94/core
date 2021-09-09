import {Kernel as Parent} from '../../../src';

export default class Kernel extends Parent {
    protected _globals = [
        (req, res, next) => {
            console.log('test');
            next();
        }
    ]
}