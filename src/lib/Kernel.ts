import {Request, Response, NextFunction} from 'express';

export default abstract class Kernel {
    /** Here you can define your global middleware */
    protected abstract _globals: Middleware;

    public get globals(): Middleware {
        return this._globals;
    }

    /**
     * Not found error handler
     * @param req The request sent by tbe client
     * @param res The response to send to the client
     */
    public notFound(req: Request, res: Response) {
        res.status(404).json({message: 'Not found'});
    }

    /**
     * Error handler
     * @param err The error
     * @param req The request sent by tbe client
     * @param res The response to send to the client
     * @param next Next callable function
     */
    public errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
        res.status(500).json({message: 'Something went wrong'});
    }
}


type Middleware = ((req: Request, res: Response, next: NextFunction) => void) | ((req: Request, res: Response, next: NextFunction) => void)[];
