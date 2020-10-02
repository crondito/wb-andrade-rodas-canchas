import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException, Param,
    Post,
    Query,
    Res, Session
} from "@nestjs/common";
import {EquipoService} from "./equipo.service";
import {EquipoCreateDTO} from "./dto/equipo.create";
import {validate, ValidationError} from "class-validator";
import {EquipoEntity} from "./equipo.entity";
import {EquipoUpdateDTO} from "./dto/equipo.update";

@Controller("equipos")
export class EquipoController {
    constructor(
        private readonly _equipoService: EquipoService
    ) {
    }
    @Get()
    async vistaHome(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ){
        const estaLogueado = session.usuario;
        const currentUserRol = session.rol;
        if(!estaLogueado){
            return res.redirect('login');
        }
        if(currentUserRol.toString() != "Administrador" && currentUserRol.toString() != "Empleado"){
            return res.redirect('home');
        }
        let resultadoEncontrado
        let busqueda = ""
        const existeBusqueda = typeof parametrosConsulta.busqueda!="undefined"
        if(existeBusqueda){
            busqueda = parametrosConsulta.busqueda
        }
        try{
            resultadoEncontrado = await this._equipoService.buscarTodos(busqueda)
        } catch {
            throw new InternalServerErrorException("Error encontrado roles")
        }
        if(resultadoEncontrado){
            res.render(
                "equipo/equipos",
                {
                    arregloEquipos: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta,
                    currentUserRol: currentUserRol
                }
            )
        }else{
            throw new NotFoundException("No se encontraron equipos")
        }
    }

    @Get("crear")
    vistaCrear(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ){
        const estaLogueado = session.usuario;
        const currentUserRol = session.rol;
        if(!estaLogueado){
            return res.redirect('login');
        }
        if(currentUserRol.toString() != "Administrador" && currentUserRol.toString() != "Empleado"){
            return res.redirect('home');
        }
        res.render(
            "equipo/crear-equipo",
            {
                error: parametrosConsulta.error,
                nombreError: parametrosConsulta.nombreError,
                descripcionError: parametrosConsulta.descripcionError,
                nombre: parametrosConsulta.nombre,
                descripcion: parametrosConsulta.descripcion,
                currentUserRol: currentUserRol
            }
        )
    }

    @Post("crearDesdeVista")
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ){
        const equipoValidado = new EquipoCreateDTO();
        equipoValidado.nombre = parametrosCuerpo.nombre;
        equipoValidado.descripcion = parametrosCuerpo.descripcion;

        let nombreConsulta, descripcionConsulta, nombreError="", descripcionError="";
        try {
            const errores: ValidationError[] = await validate(equipoValidado);
            if (errores.length > 0){
                console.log("Errores",errores);
                for(const error of errores){
                    if (error["property"]=="nombre"){
                        nombreError = "&nombreError=Error en nombre de rol"
                    } else if (error["property"]=="descripcion"){
                        descripcionError = "&descripcionError=Error en descripcion de rol"
                    }
                }
                nombreConsulta = `&nombre=${parametrosCuerpo.nombre}`
                descripcionConsulta = `&descripcion=${parametrosCuerpo.descripcion}`
                return res.redirect("/equipos/crear?"+nombreError+descripcionError+nombreConsulta+descripcionConsulta)
            }else {
                let respuestaCreacionEquipo;
                try{
                    respuestaCreacionEquipo = this._equipoService
                        .crearUno(parametrosCuerpo)
                }catch (error) {
                    const mensajeError = "Error creando Equipo"
                    return res.redirect("/equipos/crear?error="+mensajeError)
                }
                return res.redirect("/equipos")
            }
        } catch (error) {
            console.error("Error",error)
            throw new BadRequestException("Error validando")
        }
    }

    @Post("editarDesdeVista/:id")
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res
    ){
        const equipoEditadoValidado = new EquipoUpdateDTO();
        equipoEditadoValidado.nombre = parametrosCuerpo.nombre;
        equipoEditadoValidado.descripcion = parametrosCuerpo.descripcion;

        let nombreConsulta, descripcionConsulta, nombreError="", descripcionError="";
        try {
            const errores: ValidationError[] = await validate(equipoEditadoValidado)
            if(errores.length > 0){
                console.log("Errores",errores);
                for(const error of errores){
                    if(error["property"]=="nombre"){
                        nombreError = "&nombreError=Error en nombre de equipo"
                    } else if (error["property"]=="descripcion"){
                        descripcionError = "&descripcionError=Error en descripcion de equipo"
                    }
                }
                nombreConsulta = `&nombre=${parametrosCuerpo.nombre}`
                descripcionConsulta = `&descripcion=${parametrosCuerpo.descripcion}`
                return res.redirect("/equipos/editar/"+parametrosRuta.id+"?"
                    +nombreError
                    +descripcionError
                    +nombreConsulta
                    +descripcionConsulta)
            } else {
                const equipoEditado = {
                    id: Number(parametrosRuta.id),
                    nombre: parametrosCuerpo.nombre,
                    descripcion: parametrosCuerpo.descripcion
                } as EquipoEntity;
                let respuestaEdicionEquipo;
                try {
                    respuestaEdicionEquipo = await this._equipoService
                        .editarUno(equipoEditado)
                    return res.redirect("/equipos?mensaje=Equipo editado")
                }catch (error) {
                    console.log(error);
                    return res.redirect("/equipos?error=Error editanto equipo")
                }
                return res.redirect("/equipos")
            }
        } catch (e) {
            console.error("Error",e);
            throw new BadRequestException("Error validando")
        }
    }

    @Get("editar/:id")
    async vistaEditar(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
        @Session() session
    ){
        const estaLogueado = session.usuario;
        const currentUserRol = session.rol;
        if(!estaLogueado){
            return res.redirect('login');
        }
        if(currentUserRol.toString() != "Administrador" && currentUserRol.toString() != "Empleado"){
            return res.redirect('home');
        }
        const id = Number(parametrosRuta.id)
        let equipoEncontrado
        try {
            equipoEncontrado = await this._equipoService.buscarUno(id);
        } catch (error) {
            console.error("Error del servidor"+error)
            return res.redirect("/equipos?error=Error buscando equipo")
        }
        if (equipoEncontrado){
            return res.render(
                "equipo/crear-equipo",
                {
                    error: parametrosConsulta.error,
                    equipo: equipoEncontrado,
                    nombreError: parametrosConsulta.nombreError,
                    descripcionError: parametrosConsulta.descripcionError,
                    nombre: parametrosConsulta.nombre,
                    descripcion: parametrosConsulta.descripcion,
                    currentUserRol: currentUserRol
                }
            )
        }else{
            return res.redirect("/equipos?error=Equipo no encontrado")
        }
    }

    @Post("eliminarDesdeVista/:id")
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ){
        try {
            const id = Number(parametrosRuta.id);
            await this._equipoService.eliminarUno(id);
            return res.redirect("/equipos?mensaje=Equipo eliminado")
        }catch (error) {
            console.log(error);
            return res.redirect("/equipos?error=Error eliminando equipo")
        }
    }
}