import {Request, Response} from 'express';
import {validate} from 'class-validator';
import {User} from '../entity/User';
import {Story} from "../entity/Story";

class StoryController {

    public create = async (req: Request, res: Response): Promise<Response> => {
        const { summary, description, owner, types, complexity, estimated_time, cost, state } = req.body;

        const story: Story = new Story();
        story.summary = summary;
        story.owner = owner;
        story.description = description;
        story.types = types;
        story.complexity = complexity;
        story.estimated_time = estimated_time;
        story.cost = cost;
        story.state = state;

        const errors = await validate(story);
        if (errors.length > 0) {
            return res.status(400).json({ error: errors });
        }

        //Check for owner
        const userCount: number = await User.count({ where: { id: owner } });

        if(userCount < 1 ) {
            return res.status(409).json({
                error: { message: 'Owner does not exist' }
            });
        }

        try {
            await story.save();
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: { message: "Something went wrong. It's our fault and we are working on it :)" }
            });
        }

        return res.status(201).json(story);
    };

    public update = async (req: Request, res: Response): Promise<Response> => {
        const { storyId } = req.params;
        const { reviewerId } = req.body;

        //Check if story exists
        const story: Story = await Story.findOne({
            relations: ["owner"],
            where: { id: storyId }
        });

        if(! story ) {
            return res.status(409).json({
                error: { message: 'Story does not exist' }
            });
        }

        //Is the logged in user the owner?
        const authUser = res.locals.jwtPayload;
        if(authUser.userId  !== story.owner.id) {
            return res.status(403).json({
                error: { message: 'You are not authorized to perform this action' }
            });
        }

        //Does the reviewer exist
        const reviewer: User = await User.findOne({ relations: ["role"], where: { id: reviewerId } });

        if(! reviewer) {
            return res.status(409).json({
                error: { message: 'Invalid reviewer' }
            });
        }

        if(reviewer.role.name !== "admin") {
            return res.status(409).json({
                error: { message: 'Reviewer must be an admin user' }
            });
        }

        story.reviewer =  reviewer;
        await story.save();

        return res.status(204).json(story);
    };

}

export default new StoryController();
