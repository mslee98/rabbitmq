import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ schema: 'rabbit', name: 'users' })
export class Users {

    @PrimaryColumn({
        name: 'id',
        length: 13
    })
    id: string;

    @Column({
        type: 'varchar',
        name: 'name',
        length: 30
    })
    name: string;

    @Column({
        type: 'varchar',
        name: 'password',
        length: 100
    })
    password: string;
}