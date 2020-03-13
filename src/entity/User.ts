import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {IsEmail, IsNotEmpty, Length} from 'class-validator'
import * as bcrypt from 'bcryptjs'
import {Role} from "./Role";
import {Story} from "./Story";

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *        format: int64
 *      email:
 *        type: string
 *      name:
 *        type: string
 *      password:
 *        type: string
 */
@Entity({ name: 'users' })
export class User extends  BaseEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column()
    @IsNotEmpty()
    @Length(4, 255)
    name: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    @Length(4, 255)
    email: string;

    @Column()
    @Length(5, 255)
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @ManyToOne(type => Role,{
        eager: true
    })
    role: Role;

    @OneToMany(type => Story, story => story.owner)
    stories: Story[];

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    hashPassword (): void {
        this.password = bcrypt.hashSync(this.password, 10)
    }

    checkIfUnEncryptedPasswordIsValid (unEncryptedPassword: string): boolean {
        return bcrypt.compareSync(unEncryptedPassword, this.password)
    }

}
