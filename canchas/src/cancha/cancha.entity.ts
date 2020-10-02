import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {ReservacionEntity} from "../reservacion/reservacion.entity";

@Entity("cancha")
@Unique(["nombre"])
export class CanchaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    comentario: string;

    @Column()
    tipo: string;

    @Column()
    estado: string;

    @OneToMany(
        type => ReservacionEntity,
        reservacion => reservacion.cancha
    )
    reservaciones: ReservacionEntity[];
}