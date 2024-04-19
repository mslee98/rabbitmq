import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: 'rabbit', name: 'rooms'})
export class Rooms {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id'
    })
    id: number;

    @Column({
        type: 'varchar',
        name: 'name',
        length: 30
    })
    name: string;

}