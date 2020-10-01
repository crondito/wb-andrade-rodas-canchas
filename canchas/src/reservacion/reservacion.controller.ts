import {Controller, Get, InternalServerErrorException, NotFoundException, Query, Res} from "@nestjs/common";
import {ReservacionService} from "./reservacion.service";
import {CanchaService} from "../cancha/cancha.service";
import {EquipoService} from "../equipo/equipo.service";

@Controller("reservaciones")
export class ReservacionController {
    constructor(
        private readonly _reservacionService: ReservacionService,
        private readonly _canchaService: CanchaService,
        private readonly _equipoService: EquipoService
    ){}
    @Get()
    async vistaHome(
        @Query() parametrosConsulta,
        @Res() res
    ){
        let resultadoEncontrado
        let busqueda = ""
        const existeBusqueda = typeof parametrosConsulta.busqueda!="undefined";
        if (existeBusqueda){
            busqueda = parametrosConsulta.busqueda
        }
        try {
            resultadoEncontrado = await this._reservacionService.buscarTodos(busqueda)
        } catch{
            /*throw new InternalServerErrorException("Error encontrando reservaciones")*/
            res.render(
                "reservacion/reservaciones",
                {
                    parametrosConsulta: parametrosConsulta
                }
            )
        }
        if(resultadoEncontrado){
            res.render(
                "reservacion/reservaciones",
                {
                    arregloReservaciones: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                }
            )
        }else {
            throw new NotFoundException("No se encontraron reservaciones")
        }
    }

    @Get("crear")
    async vistaCrear(
        @Query() parametrosConsulta,
        @Res() res
    ){
        let canchasEncontradas, equiposEncontrados
        let busqueda = ""
        const existeBusqueda = typeof parametrosConsulta.busqueda!="undefined";
        if (existeBusqueda){
            busqueda = parametrosConsulta.busqueda
        }
        try {
            canchasEncontradas = await this._canchaService.buscarTodos(busqueda)
            equiposEncontrados = await this._equipoService.buscarTodos(busqueda)
        } catch{
            res.render(
                "reservacion/crear-reservacion",
                {
                    error: parametrosConsulta.error,
                    fechaHoraReservacionError: parametrosConsulta.fechaHoraReservacionError,
                    horaReservacionError: parametrosConsulta.horaReservacionError,
                    tiempoReservacionError: parametrosConsulta.tiempoReservacionError,
                    estadoError: parametrosConsulta.estadoError,
                    usuarioError: parametrosConsulta.usuarioError,
                    cantidadEquipoError: parametrosConsulta.cantidadEquipoError,
                    fechaHoraReservacion: parametrosConsulta.fechaHoraReservacion,
                    horaReservacion: parametrosConsulta.horaReservacion,
                    tiempoReservacion: parametrosConsulta.tiempoReservacion,
                    estado: parametrosConsulta.estado,
                    usuario: parametrosConsulta.usuario,
                    cantidadEquipo: parametrosConsulta.cantidadEquipo,
                    equipo: parametrosConsulta.equipo,
                    cancha: parametrosConsulta.cancha,
                    canchasArray: [],
                    equiposArray: [],
                }
            )
        }
        res.render(
            "reservacion/crear-reservacion",
            {
                error: parametrosConsulta.error,
                fechaHoraReservacionError: parametrosConsulta.fechaHoraReservacionError,
                horaReservacionError: parametrosConsulta.horaReservacionError,
                tiempoReservacionError: parametrosConsulta.tiempoReservacionError,
                estadoError: parametrosConsulta.estadoError,
                usuarioError: parametrosConsulta.usuarioError,
                cantidadEquipoError: parametrosConsulta.cantidadEquipoError,
                fechaHoraReservacion: parametrosConsulta.fechaHoraReservacion,
                horaReservacion: parametrosConsulta.horaReservacion,
                tiempoReservacion: parametrosConsulta.tiempoReservacion,
                estado: parametrosConsulta.estado,
                usuario: parametrosConsulta.usuario,
                cantidadEquipo: parametrosConsulta.cantidadEquipo,
                equipo: parametrosConsulta.equipo,
                cancha: parametrosConsulta.cancha,
                canchasArray: canchasEncontradas,
                equiposArray: equiposEncontrados,
            }
        )
    }
    
}