import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {IsEmail, IsNotEmpty, Length} from 'class-validator'
import * as bcrypt from 'bcryptjs'
import {Role} from "./Role";

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
    @OneToOne(type => Role)
    @JoinColumn()
    role: Role;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    hashPassword (): void {
        this.password = bcrypt.hashSync(this.password, 10)
    }

}
