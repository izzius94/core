import {Router} from 'express';

export default (router: Router): Router => {
    router.get('/', (req, res) => {
        res.json({message: 'It works'})
    });

    router.get('/error', (req, res, next) => {
        next(new Error('error test'));
    });

    return router;
}
