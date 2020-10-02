import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {CanchaEntity} from "../cancha/cancha.entity";
import {EquipoEntity} from "../equipo/equipo.entity";
import {ReservaEquipoEntity} from "../reservaEquipo/reservaEquipo.entity";

@Entity("reservacion")
export class ReservacionEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fechaRegistro: Date;

    @Column()
    fechaHoraReservacion: Date;

    @Column()
    tiempoReservacion: number;

    @Column()
    estado: string;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.reservaciones
    )
    usuario: UsuarioEntity;

    @ManyToOne(
        type => CanchaEntity,
        cancha => cancha.reservaciones
    )
    cancha: CanchaEntity;

    @OneToMany(
        type => ReservaEquipoEntity,
        reservacionEquipos => reservacionEquipos.reservaciones
    )
    reservacionEquipos: ReservaEquipoEntity[];
}