import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Entity("rol")
@Unique(["nombre"])
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