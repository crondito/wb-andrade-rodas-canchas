import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ReservacionEntity} from "../reservacion/reservacion.entity";

@Entity("cancha")
export class CanchaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    comentario: string;

    @Column()
    tipo: string;

    @OneToMany(
        type => ReservacionEntity,
        reservacion => reservacion.cancha
    )
    reservaciones: ReservacionEntity[];
}