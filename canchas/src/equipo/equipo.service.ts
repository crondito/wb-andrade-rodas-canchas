import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {EquipoEntity} from "./equipo.entity";

@Injectable()
export class EquipoService {
    constructor(
        @InjectRepository(EquipoEntity)
        private repositorio: Repository<EquipoEntity>
    ){
    }
    crearUno(nuevoEquipo: EquipoEntity){
        return this.repositorio.save(nuevoEquipo) //Promesa
    }
    buscarTodos(textoDeConsulta?: string){
        const consulta: FindManyOptions<EquipoEntity> = {
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
    editarUno(equipoEditado: EquipoEntity){
        return this.repositorio.save(equipoEditado);
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }

}