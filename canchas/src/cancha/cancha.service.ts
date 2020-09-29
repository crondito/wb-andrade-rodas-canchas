import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CanchaEntity} from "./cancha.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class CanchaService{
    constructor(
        @InjectRepository(CanchaEntity)
        private repositorio: Repository<CanchaEntity>
    ) {
    }
    crearUno(nuevoCancha: CanchaEntity){
        return this.repositorio.save(nuevoCancha) //Promesa
    }
    buscarTodos(textoDeConsulta?: string){
        const consulta: FindManyOptions<CanchaEntity> = {
            where: [
                {
                    nombre: Like(`%${textoDeConsulta}`)
                },
                {
                    comentario: Like(`%${textoDeConsulta}`)
                },
                {
                    tipo: Like(`%${textoDeConsulta}`)
                },
                {
                    estado: Like(`%${textoDeConsulta}`)
                }
            ]
        }
        return this.repositorio.find(consulta) //Promesa
    }
    buscarUno(id: number){
        return this.repositorio.findOne(id) //Promesa
    }
    buscarCanchasDisponibles(){
        const consulta: FindManyOptions<CanchaEntity>={
            where: {
                estado: "Disponible"
            }
        }
        return this.repositorio.findAndCount(consulta)
    }
    editarUno(canchaEditado: CanchaEntity){
        return this.repositorio.save(canchaEditado);
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }
    
}