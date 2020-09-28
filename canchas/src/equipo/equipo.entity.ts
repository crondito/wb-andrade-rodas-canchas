import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ReservacionEntity} from "../reservacion/reservacion.entity";
import {ReservaEquipoEntity} from "../reservaEquipo/reservaEquipo.entity";

@Entity()
export class EquipoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @OneToMany(
        type => ReservaEquipoEntity,
        reservacionEquipos => reservacionEquipos.equipos
    )
    reservacionEquipos: ReservaEquipoEntity[];

    /*@ManyToMany(
        type => ReservacionEntity,
        reservaciones => reservaciones.equipos
    )
    @JoinTable()
    reservaciones: ReservacionEntity[]*/

}