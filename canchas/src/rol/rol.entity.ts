import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class RolEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;
}