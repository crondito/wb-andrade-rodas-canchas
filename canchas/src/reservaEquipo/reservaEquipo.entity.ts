import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ReservacionEntity} from "../reservacion/reservacion.entity";
import {EquipoEntity} from "../equipo/equipo.entity";

@Entity("reserva_equipo")
export class ReservaEquipoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidad: number;

    @ManyToOne(
        type => ReservacionEntity,
        reservacion => reservacion.reservacionEquipos,
        {
            onDelete: 'CASCADE',
        }
    )
    reservaciones: ReservacionEntity;

    @ManyToOne(
        type => EquipoEntity,
        equipo => equipo.reservacionEquipos
    )
    equipos: EquipoEntity;
}