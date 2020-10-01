import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {ReservacionEntity} from "./reservacion.entity";

@Injectable()
export class ReservacionService {
    constructor(
        @InjectRepository(ReservacionEntity)
        private repositorio: Repository<ReservacionEntity>
    ){
    }
    crearUno(nuevoReservacion: ReservacionEntity){
        return this.repositorio.save(nuevoReservacion) //Promesa
    }
    buscarTodos(textoDeConsulta?: string){
        const consulta: FindManyOptions<ReservacionEntity> = {
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
    editarUno(reservacionEditada: ReservacionEntity){
        return this.repositorio.save(reservacionEditada);
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }

}