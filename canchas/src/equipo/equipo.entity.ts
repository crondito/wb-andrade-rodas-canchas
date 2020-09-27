import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ReservacionEntity} from "../reservacion/reservacion.entity";

@Entity()
export class EquipoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    /*@ManyToMany(
        type => ReservacionEntity,
        reservaciones => reservaciones.equipos
    )
    @JoinTable()
    reservaciones: ReservacionEntity[]*/

}