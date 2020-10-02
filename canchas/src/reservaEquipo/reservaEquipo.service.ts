import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ReservaEquipoEntity} from "./reservaEquipo.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class ReservaEquipoService{
    constructor(
        @InjectRepository(ReservaEquipoEntity)
        private repositorio: Repository<ReservaEquipoEntity>
    ) {
    }
    crearUno(nuevoReservaEquipo: ReservaEquipoEntity){
        return this.repositorio.save(nuevoReservaEquipo) //Promesa
    }
    buscarTodos(textoDeConsulta?: string){
        const consulta: FindManyOptions<ReservaEquipoEntity> = {
            where: [
                {
                    cantidad: Like(`%${textoDeConsulta}`)
                }
            ]
        }
        return this.repositorio.find(consulta) //Promesa
    }
    buscarUno(id: number){
        return this.repositorio.findOne(id,{relations:["equipos"]}) //Promesa
    }
    editarUno(reservaEquipoEditado: ReservaEquipoEntity){
        return this.repositorio.save(reservaEquipoEditado);
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }

}