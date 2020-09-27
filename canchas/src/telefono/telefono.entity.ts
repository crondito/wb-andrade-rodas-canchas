import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Entity()
export class TelefonoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    telefono: string;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.telefonos
    )
    usuario: UsuarioEntity;

}