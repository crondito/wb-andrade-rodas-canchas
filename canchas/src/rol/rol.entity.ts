import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Entity("rol")
export class RolEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    /*@ManyToMany(
        type => UsuarioEntity,
        usuarios => usuarios.roles
    )
    @JoinTable()
    usuarios: UsuarioEntity[]*/
}