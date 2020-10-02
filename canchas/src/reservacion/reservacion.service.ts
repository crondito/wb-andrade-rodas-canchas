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
    crearUno(nuevaReservacion: ReservacionEntity){
        return this.repositorio.save(nuevaReservacion) //Promesa
    }
    buscarTodos(textoDeConsulta?: string){
        const consulta: FindManyOptions<ReservacionEntity> = {
            where: [
                {
                    fechaRegistro: Like(`%${textoDeConsulta}`)
                },
                {
                    fechaHoraReservacion: Like(`%${textoDeConsulta}`)
                },
                {
                    estado: Like(`%${textoDeConsulta}`)
                }
            ],
            relations:["cancha"]
        }
        return this.repositorio.find(consulta) //Promesa
    }
    buscarUno(id: number){
        return this.repositorio.findOne(id,{relations:["cancha","usuario","reservacionEquipos"]}) //Promesa
    }
    editarUno(reservacionEditada: ReservacionEntity){
        return this.repositorio.save(reservacionEditada);
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }

}