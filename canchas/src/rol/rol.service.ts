import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RolEntity} from "./rol.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private repositorio: Repository<RolEntity>
    ){
    }
    crearUno(nuevoRol: RolEntity){
        return this.repositorio.save(nuevoRol) //Promesa
    }
    buscarTodos(textoDeConsulta?: string){
        const consulta: FindManyOptions<RolEntity> = {
            where: [
                {
                    nombre: Like(`%${textoDeConsulta}`)
                },
                {
                    descripcion: Like(`%${textoDeConsulta}`)
                }
            ]
        }
        return this.repositorio.find(consulta) //Promesa
    }
    buscarUno(id: number){
        return this.repositorio.findOne(id) //Promesa
    }
    editarUno(rolEditado: RolEntity){
        return this.repositorio.save(rolEditado);
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }

}