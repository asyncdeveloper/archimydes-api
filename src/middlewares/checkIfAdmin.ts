import {NextFunction, Request, Response} from 'express';

export const checkIfAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const authUser = res.locals.jwtPayload || null;

    if( authUser === null) {
        return res.status(403).json({
            error: { message: 'You are not authenticated' }
        });
    }

    if(authUser.role !== "admin") {
        return res.status(403).json({
            error: { message: 'You are not authorized to perform this action' }
        });
    }

    next();
};
