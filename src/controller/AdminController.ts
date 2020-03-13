import {Request, Response} from 'express';
import {State, Story} from "../entity/Story";
import {getRepository} from "typeorm";
import {validate} from "class-validator";

class AdminController {

    public index = async (req: Request, res: Response): Promise<Response> => {
        const adminUserId: string = res.locals.jwtPayload.userId;

        const data = await getRepository(Story)
            .createQueryBuilder("stories")
            .where("reviewerId = :id AND state = :state", {
                id: adminUserId, state: State.WAITING_AUTHORIZATION
            })
            .getMany();

        return res.status(200).json({ data });
    };

    public update = async (req: Request, res: Response): Promise<Response> => {
        const { summary, description, types, complexity, estimated_time, cost, state } = req.body;

        const storyId : string = req.params.storyId;
        let story: Story = await Story.findOne({ relations: ["owner"], where: { id: storyId } });

        if(! story ) {
            return res.status(404).json({ error: { message: 'Story does not exist' } });
        }

        story.summary = summary;
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

        if(story.state === State.APPROVED ) {
            story.is_active = true;
        }

        if(story.state === State.REJECTED ) {
            story.is_active = false;
        }

        try {
            await story.save();
        } catch (err) {
            return res.status(500).json({
                error: { message: "Something went wrong. It's our fault and we are working on it :)" }
            });
        }

        return res.status(204).json();
    };

}

export default new AdminController();
