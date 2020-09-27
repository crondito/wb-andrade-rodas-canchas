import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {CanchaEntity} from "../cancha/cancha.entity";
import {EquipoEntity} from "../equipo/equipo.entity";

@Entity()
export class ReservacionEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fechaRegistro: Date;

    @Column()
    fechaHoraReserva: Date;

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

    @ManyToMany(
        type => EquipoEntity,
        equipos => equipos.reservaciones
    )
    @JoinTable()
    equipos: EquipoEntity[]
}