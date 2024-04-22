import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'rabbit', name: 'users' })
export class Users {

    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int'
    })
    id: number

    @IsEmail()
    @Column({
        type: 'varchar',
        name: 'email',
        length: 30
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @Column({
        type: 'varchar',
        name: 'nickname',
        length: 30
    })
    nickname: string;

    @IsString()
    @IsNotEmpty()
    @Column({
        type: 'varchar',
        name: 'password',
        length: 100
    })
    password: string;
}