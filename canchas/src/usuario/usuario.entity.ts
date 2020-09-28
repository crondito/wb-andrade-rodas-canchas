import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TelefonoEntity} from "../telefono/telefono.entity";
import {ReservacionEntity} from "../reservacion/reservacion.entity";
import {RolEntity} from "../rol/rol.entity";

@Entity("usuario")
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numeroCedula: string;

    @Column()
    numeroPasaporte: string;

    @Column()
    numeroRuc: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @OneToMany(
        type => TelefonoEntity,
        telefono => telefono.usuario
    )
    telefonos: TelefonoEntity[];

    @OneToMany(
        type => ReservacionEntity,
        reservacion => reservacion.usuario
    )
    reservaciones: ReservacionEntity[];

    @ManyToMany(
        type => RolEntity,
        //roles => roles.usuarios
    )
    @JoinTable()
    roles: RolEntity[]

}