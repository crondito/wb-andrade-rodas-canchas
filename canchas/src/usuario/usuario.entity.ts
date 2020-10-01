import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {TelefonoEntity} from "../telefono/telefono.entity";
import {ReservacionEntity} from "../reservacion/reservacion.entity";
import {RolEntity} from "../rol/rol.entity";

@Entity("usuario")
@Unique(["numeroCedula"])
@Unique(["numeroPasaporte"])
@Unique(["numeroRuc"])
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

    @Column()
    telefono: string;

    @Column()
    tipo: string;

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