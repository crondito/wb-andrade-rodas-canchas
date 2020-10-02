import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ){
    }
    crearUno(nuevoUsuario: UsuarioEntity){
        return this.repositorio.save(nuevoUsuario) //Promesa
    }
    buscarTodos(textoDeConsulta?: string){
        const consulta: FindManyOptions<UsuarioEntity> = {
            where: [
                {
                    numeroCedula: Like(`%${textoDeConsulta}`)
                },
                // {
                //     numeroPasaporte: Like(`%${textoDeConsulta}`)
                // },
                // {
                //     numeroRuc: Like(`%${textoDeConsulta}`)
                // },
                {
                    nombre: Like(`%${textoDeConsulta}`)
                },
                {
                    apellido: Like(`%${textoDeConsulta}`)
                },
                {
                    telefono: Like(`%${textoDeConsulta}`)
                }
            ]
        }
        return this.repositorio.find(consulta) //Promesa
    }
    buscarUno(id: number){
        return this.repositorio.findOne(id) //Promesa
    }
    editarUno(usuarioEditado: UsuarioEntity){
        return this.repositorio.save(usuarioEditado);
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }

}