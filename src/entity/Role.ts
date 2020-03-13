import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {IsNotEmpty, Length} from 'class-validator'
import {User} from "./User";

/**
 * @swagger
 * definitions:
 *  Role:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *        format: int64
 *      name:
 *        type: string
 */
@Entity({ name: 'roles' })
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column()
    @IsNotEmpty()
    @Length(4, 255)
    name: string;

    @OneToMany(type => User, user => user.role)
    users: User[];

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

}
