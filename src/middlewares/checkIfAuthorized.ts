import {NextFunction, Request, Response} from 'express';
import {Story} from "../entity/Story";

export const checkIfAuthorized = async (req: Request, res: Response, next: NextFunction) => {
    const authUser = res.locals.jwtPayload || null;

    if( authUser === null) {
        return res.status(403).json({
            error: { message: 'You are not authenticated ' }
        });
    }

    const storyId : string = req.params.storyId;
    const story: Story = await Story.findOne({ relations: ["owner"], where: { id: storyId } });

    if(! story ) {
        return res.status(404).json({
            error: { message: 'Story does not exist' }
        });
    }

    //Is the logged in user authourized to update resource ?
    if(authUser.userId  !== story.owner.id) {
        return res.status(403).json({
            error: { message: 'You are not authorized to perform this action' }
        });
    }

    next();
};
