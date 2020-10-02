import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException, NotFoundException, Param,
    Post,
    Query,
    Res, Session
} from "@nestjs/common";
import {RolCreateDTO} from "./dto/rol.create";
import {validate, ValidationError} from "class-validator";
import {RolService} from "./rol.service";
import {RolEntity} from "./rol.entity";
import {RolUpdateDTO} from "./dto/rol.update";

@Controller("roles")
export class RolController{
    constructor(
        private readonly _rolService: RolService
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
        let resultadoEncontrado
        let busqueda = ""
        const existeBusqueda = typeof parametrosConsulta.busqueda!="undefined";
        if (existeBusqueda){
            busqueda = parametrosConsulta.busqueda
        }
        try{
            resultadoEncontrado = await this._rolService.buscarTodos(busqueda)
        } catch{
            throw new InternalServerErrorException("Error encontrando roles")
        }
        if(resultadoEncontrado){
            res.render(
                "rol/roles",
                {
                    arregloRoles: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta,
                    currentUserRol: currentUserRol
                }
            )
        }else{
            throw new NotFoundException("No se encontraron roles")
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
        res.render(
            "rol/crear-rol",
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
        const rolValidado = new RolCreateDTO();
        rolValidado.nombre = parametrosCuerpo.nombre;
        rolValidado.descripcion = parametrosCuerpo.descripcion;

        let nombreConsulta, descripcionConsulta, nombreError="", descripcionError="";
        try {
            const errores: ValidationError[] = await validate(rolValidado);
            if(errores.length > 0){
                console.log("Errores", errores);
                for(const error of errores){
                    if(error["property"]=="nombre"){
                        nombreError = "nombreError=Error en nombre de rol"
                    }else if(error["property"]=="descripcion"){
                        descripcionError = "&descripcionError=Error en descripcion de rol"
                    }
                }
                nombreConsulta = `&nombre=${parametrosCuerpo.nombre}`
                descripcionConsulta = `&descripcion=${parametrosCuerpo.descripcion}`
                return res.redirect("/roles/crear?="+nombreError+descripcionError+nombreConsulta+descripcionConsulta)
            } else {
                let respuestaCreacionRol;
                try {
                    respuestaCreacionRol = this._rolService
                        .crearUno(parametrosCuerpo)
                } catch (error){
                    const mensajeError = "Error creando Rol"
                    return res.redirect("/roles/crear?error="+mensajeError)
                }
                return res.redirect("/roles")
            }
        } catch (e) {
            console.error("Error", e);
            throw new BadRequestException("Error validando")
        }
    }

    @Post("editarDesdeVista/:id")
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res
    ){
        const rolEditadoValidado = new RolUpdateDTO();
        rolEditadoValidado.nombre = parametrosCuerpo.nombre;
        rolEditadoValidado.descripcion = parametrosCuerpo.descripcion;

        let nombreConsulta, descripcionConsulta, nombreError="", descripcionError="";
        try {
            const errores: ValidationError[] = await validate(rolEditadoValidado)
            if(errores.length > 0) {
                console.log("Errores", errores);
                for (const error of errores) {
                    if (error["property"] == "nombre") {
                        nombreError = "nombreError=Error en nombre de equipo"
                    } else if (error["property"] == "descripcion") {
                        descripcionError = "&descripcionError=Error en descripcion de equipo"
                    }
                }
                nombreConsulta = `&nombre=${parametrosCuerpo.nombre}`
                descripcionConsulta = `&descripcion=${parametrosCuerpo.descripcion}`
                return res.redirect("/roles/editar/" + parametrosRuta.id + "?=" + nombreError + descripcionError + nombreConsulta + descripcionConsulta)
            } else {
                const rolEditado = {
                    id: Number(parametrosRuta.id),
                    nombre: parametrosCuerpo.nombre,
                    descripcion: parametrosCuerpo.descripcion
                } as RolEntity;
                let respuestaEdicionRol;
                try{
                    respuestaEdicionRol = await this._rolService
                        .editarUno(rolEditado)
                    return res.redirect("/roles?mensaje=Rol editado");
                } catch (error){
                    console.log(error);
                    return res.redirect("/roles?error=Error editando rol")
                }
                return res.redirect("/roles")
            }
        }catch (e) {
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
        const id = Number(parametrosRuta.id)
        let rolEncontrado
        try{
            rolEncontrado = await this._rolService.buscarUno(id);
        }catch (error) {
            console.error("Error del servidor"+error)
            return res.redirect("/roles?error=Error buscando rol")
        }
        if(rolEncontrado){
            return res.render(
                "rol/crear-rol",
                {
                    error: parametrosConsulta.error,
                    rol: rolEncontrado,
                    currentUserRol: currentUserRol
                }
            )
        }else{
            return res.redirect("/roles?error=Rol no encontrado")
        }
    }

    @Post("eliminarDesdeVista/:id")
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ){
        try{
            const id = Number(parametrosRuta.id);
            await this._rolService.eliminarUno(id);
            return res.redirect("/roles?mensaje=Rol eliminado")
        } catch (error){
            console.log(error);
            return res.redirect("/roles?error=Error eliminando rol")
        }
    }
}