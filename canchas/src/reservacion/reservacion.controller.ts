import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException, Param,
    Post,
    Query,
    Res
} from "@nestjs/common";
import {ReservacionService} from "./reservacion.service";
import {CanchaService} from "../cancha/cancha.service";
import {EquipoService} from "../equipo/equipo.service";
import {ReservacionCreateDTO} from "./dto/reservacion.create";
import {validate, ValidationError} from "class-validator";
import {UsuarioService} from "../usuario/usuario.service";
import {ReservacionEntity} from "./reservacion.entity";
import {ReservaEquipoCreateDTO} from "../reservaEquipo/dto/reservaEquipo.create";
import {ReservaEquipoEntity} from "../reservaEquipo/reservaEquipo.entity";
import {ReservaEquipoService} from "../reservaEquipo/reservaEquipo.service";

@Controller("reservaciones")
export class ReservacionController {
    constructor(
        private readonly _reservacionService: ReservacionService,
        private readonly _canchaService: CanchaService,
        private readonly _equipoService: EquipoService,
        private readonly _usuarioService: UsuarioService,
        private readonly _reservaEquipoService: ReservaEquipoService
    ) {
    }

    @Get()
    async vistaHome(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        let resultadoEncontrado
        let busqueda = ""
        const existeBusqueda = typeof parametrosConsulta.busqueda != "undefined";
        if (existeBusqueda) {
            busqueda = parametrosConsulta.busqueda
        }
        try {
            resultadoEncontrado = await this._reservacionService.buscarTodos(busqueda)
        } catch (error) {
            throw new InternalServerErrorException("Error encontrando reservaciones" + error)
            /*res.render(
                "reservacion/reservaciones",
                {
                    arregloReservaciones: [],
                    parametrosConsulta: parametrosConsulta
                }
            )*/
        }
        if (resultadoEncontrado) {
            res.render(
                "reservacion/reservaciones",
                {
                    arregloReservaciones: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                }
            )
        } else {
            throw new NotFoundException("No se encontraron reservaciones")
        }
    }

    @Get("crear")
    async vistaCrear(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        let canchasEncontradas, equiposEncontrados
        let busqueda = ""
        const existeBusqueda = typeof parametrosConsulta.busqueda != "undefined";
        if (existeBusqueda) {
            busqueda = parametrosConsulta.busqueda
        }
        try {
            canchasEncontradas = await this._canchaService.buscarTodos(busqueda)
            equiposEncontrados = await this._equipoService.buscarTodos(busqueda)
        } catch {
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


    @Post("crearDesdeVista")
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const reservacionValidada = new ReservacionCreateDTO();
        reservacionValidada.fechaHoraReservacion = new Date(parametrosCuerpo.fechaHoraReservacion.toString() + " " + parametrosCuerpo.horaReservacion.toString());
        reservacionValidada.tiempoReservacion = Number(parametrosCuerpo.tiempoReservacion);
        reservacionValidada.estado = parametrosCuerpo.estado = "Programada";

        const reservaEquipoValidada = new ReservaEquipoCreateDTO();
        if (parametrosCuerpo.cantidadEquipo == "") {
            parametrosCuerpo.cantidadEquipo = 0
        }
        reservaEquipoValidada.cantidad = Number(parametrosCuerpo.cantidadEquipo);

        let fechaHoraReservacionConsulta = "";
        let horaReservacionConsulta = "";
        let tiempoReservacionConsulta = "";
        let estadoConsulta = "";
        let usuarioConsulta = "";
        let cantidadEquipoConsulta = "";
        let equipoConsulta = "";
        let canchaConsulta = "";
        let fechaHoraReservacionError = "";
        let horaReservacionError = "";
        let tiempoReservacionError = "";
        let estadoError = "";
        let usuarioError = "";
        let cantidadEquipoError = "";
        let equipoError = "";
        let canchaError = "";

        let usuarioEncontrado
        try {
            usuarioEncontrado = await this._usuarioService.buscarTodos(parametrosCuerpo.usuario)
            console.error(usuarioEncontrado)
        } catch (error) {
            usuarioError = "&usuarioError=Error en CI de usuario"

        }
        let equipoEncontrado
        try {
            equipoEncontrado = await this._equipoService.buscarTodos(parametrosCuerpo.equipo)
            console.error(equipoEncontrado)
        } catch (error) {
            equipoError = "&equipoError=Error en equipo"
        }
        let canchaEncontrada
        try {
            canchaEncontrada = await this._canchaService.buscarTodos(parametrosCuerpo.cancha)
            console.error(canchaEncontrada)
        } catch (error) {
            canchaError = "&canchaError=Error en cancha"
        }
        try {
            console.error(parametrosCuerpo)
            const errores: ValidationError[] = await validate(reservacionValidada);
            const erroresReservaEquipo: ValidationError[] = await validate(reservaEquipoValidada)
            if (errores.length > 0 || erroresReservaEquipo.length > 0) {
                console.error("Errores", errores);
                for (const error of errores) {
                    if (error["property"] == "fechaHoraReservacion") {
                        fechaHoraReservacionError = "&fechaHoraReservacionError=Error en Fecha de Reservación"
                    } else if (error["property"] == "estado") {
                        estadoError = "&estadoError=Error en estado de reservación"
                    } else if (error["property"] == "tiempoReservacion") {
                        tiempoReservacionError = "&tiempoReservacionError=Error en tiempo de reservación"
                    }
                }
                for (const error of erroresReservaEquipo) {
                    cantidadEquipoError = "&cantidadEquipoError= Error en cantidad de Equipos" + error.toString()
                }
                fechaHoraReservacionConsulta = `&fechaHoraReservacion=${parametrosCuerpo.fechaHoraReservacion}`
                estadoConsulta = `&estado=${parametrosCuerpo.estado}`
                tiempoReservacionConsulta = `&tiempoReservacion=${parametrosCuerpo.tiempoReservacion}`
                cantidadEquipoConsulta = `&cantidadEquipo=${parametrosCuerpo.cantidadEquipo}`
                usuarioConsulta = `&usuario=${parametrosCuerpo.usuario}`
                equipoConsulta = `&equipo=${parametrosCuerpo.equipo}`
                canchaConsulta = `&cancha=${parametrosCuerpo.cancha}`
                return res.redirect("/reservaciones/crear?="
                    + fechaHoraReservacionError
                    + estadoError
                    + tiempoReservacionError
                    + cantidadEquipoError
                    + usuarioError
                    + fechaHoraReservacionConsulta
                    + estadoConsulta
                    + tiempoReservacionConsulta
                    + cantidadEquipoConsulta
                    + usuarioConsulta
                    + equipoConsulta
                    + canchaConsulta
                    + horaReservacionConsulta
                )
            } else {
                if (usuarioError == "" && equipoError == "" && canchaError == "") {
                    const reservacionCreada = {
                        fechaRegistro: new Date(),
                        fechaHoraReservacion: new Date(parametrosCuerpo.fechaHoraReservacion.toString() + " " + parametrosCuerpo.horaReservacion.toString()),
                        tiempoReservacion: parametrosCuerpo.tiempoReservacion,
                        estado: parametrosCuerpo.estado,
                        usuario: usuarioEncontrado[0].id,
                        cancha: canchaEncontrada[0].id
                    } as ReservacionEntity
                    let respuestaCreacionReservacion;
                    try {
                        respuestaCreacionReservacion = await this._reservacionService.crearUno(reservacionCreada)
                    } catch (error) {
                        console.error(error);
                        return res.redirect("/reservaciones?error=Error creando reservación")
                    }
                    if (parametrosCuerpo.cantidadEquipo > 0) {
                        const reservaEquipoCreada = {
                            cantidad: parametrosCuerpo.cantidadEquipo,
                            reservaciones: respuestaCreacionReservacion.id,
                            equipos: equipoEncontrado[0].id
                        } as ReservaEquipoEntity
                        let respuestaReservaEquipoCreada;
                        try {
                            respuestaReservaEquipoCreada = await this._reservaEquipoService.crearUno(reservaEquipoCreada)
                        } catch (error) {
                            console.error(error);
                            return res.redirect("/reservaciones?error=Error creando reservación de equipos")
                        }
                    } else {
                        console.error("Reservacion Equipos:" + parametrosCuerpo.cantidadEquipo);
                    }
                    console.error(parametrosCuerpo)
                    return res.redirect("/reservaciones")
                } else {
                    console.error(usuarioError + equipoError + canchaError)
                    return res.redirect("/reservaciones/crear?="
                        + usuarioError
                        + equipoError
                        + canchaError
                    )
                }
            }
        } catch (error) {
            console.error("Error", error);
            throw new BadRequestException("Error validando" + error)
        }

    }

    @Get("editar/:id")
    async vistaEditar(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ) {
        const id = Number(parametrosRuta.id)
        let canchasEncontradas, equiposEncontrados, reservacionEncontrada
        let busqueda = ""
        const existeBusqueda = typeof parametrosConsulta.busqueda != "undefined";
        if (existeBusqueda) {
            busqueda = parametrosConsulta.busqueda
        }
        try {
            canchasEncontradas = await this._canchaService.buscarTodos(busqueda)
            equiposEncontrados = await this._equipoService.buscarTodos(busqueda)
        } catch {
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
        try {
            reservacionEncontrada = await this._reservacionService.buscarUno(id)
        } catch (error) {
            console.log("Error del servidor" + error)
            return res.redirect("/reservaciones?error=Error buscando reservación")
        }
        let reservaEquipoEncontrada
        try {

            reservaEquipoEncontrada = await this._reservaEquipoService.buscarUno(reservacionEncontrada.reservacionEquipos[0].id)

        } catch (error) {
            console.log("Error del servidor" + error)
            return res.redirect("/reservaciones?error=Error buscando reservacion Equipos")
        }
        if (reservaEquipoEncontrada) {
            parametrosConsulta.equipo = reservaEquipoEncontrada.equipos.nombre
            parametrosConsulta.cantidadEquipo = reservaEquipoEncontrada.cantidad
        }
        if (reservacionEncontrada) {
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
                    reservacion: reservacionEncontrada,
                    canchasArray: canchasEncontradas,
                    equiposArray: equiposEncontrados,
                }
            )
        } else {
            return res.redirect("/reservaciones?error=Reservación no encontrada")
        }
    }
}