import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {IsEnum, IsNotEmpty, Length} from 'class-validator'
import {User} from "./User";

enum Types {
    ENHANCEMENT = "ENHANCEMENT",
    BUGFIX = "BUGFIX",
    DEVELOPMENT = "DEVELOPMENT"
}

enum State {
    REJECTED = "REJECTED",
    APPROVED = "APPROVED",
    WAITING_AUTHORIZATION = "WAITING_AUTHORIZATION"
}

/**
 * @swagger
 * definitions:
 *  Story:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *        format: int64
 *      summary:
 *        type: string
 *      description:
 *        type: string
 *      owner:
 *        type: User
 *      reviewer:
 *        type: User
 *      types:
 *        type: string
 *      complexity:
 *        type: string
 *      estimated_time:
 *        type: string
 *      cost:
 *        type: number
 *      is_active:
 *        type: boolean
 */
@Entity({ name: 'stories' })
export class Story extends  BaseEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column()
    @IsNotEmpty()
    @Length(4, 255)
    summary: string;

    @Column()
    @IsNotEmpty()
    @Length(4, 255)
    description: string;

    @IsNotEmpty()
    @ManyToOne(type => User, user => user.stories)
    owner: User;

    @ManyToOne(type => User)
    reviewer: User;

    @IsEnum(Types)
    @IsNotEmpty()
    @Column({
        type: "enum",
        enum: Types,
        default: Types.BUGFIX
    })
    types: Types;

    @Column()
    @IsNotEmpty()
    @Length(4, 255)
    complexity: string;

    @Column({
        type: "time"
    })
    @IsNotEmpty()
    @Length(4, 255)
    estimated_time: Date;

    @Column()
    @IsNotEmpty()
    cost: number;

    @IsEnum(State)
    @Column({
        type: "enum",
        enum: State,
        default: State.WAITING_AUTHORIZATION
    })
    state: State;

    @Column({
        type: "tinyint",
        default: false
    })
    is_active: boolean;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

}
