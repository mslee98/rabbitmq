import { Column, Entity } from "typeorm";

@Entity({schema: 'rabbit', name: 'roomusres'})
export class RoomUsers {

    @Column({
        type: 'int',
        name: 'RoomId',
        primary: true
    })
    RoomId: number;

    @Column({
        type: 'varchar',
        name: 'UserId',
        primary: true
    })
    UserId: number;

}