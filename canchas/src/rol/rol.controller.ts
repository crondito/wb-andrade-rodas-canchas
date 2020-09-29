import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException, NotFoundException, Param,
    Post,
    Query,
    Res
} from "@nestjs/common";
import {RolCreateDTO} from "./dto/rol.create";
import {validate, ValidationError} from "class-validator";
import {RolService} from "./rol.service";
import {RolEntity} from "./rol.entity";

@Controller("roles")
export class RolController{
    constructor(
        private readonly _rolService: RolService
    ) {
    }
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
                    parametrosConsulta: parametrosConsulta
                }
            )
        }else{
            throw new NotFoundException("No se encontraron roles")
        }
    }

    @Get("crear")
    vistaCrear(
        @Query() parametrosConsulta,
        @Res() res
    ){
        res.render(
            "rol/crear-rol",
            {
                error: parametrosConsulta.error,
                nombreError: parametrosConsulta.nombreError,
                descripcionError: parametrosConsulta.descripcionError,
                nombre: parametrosConsulta.nombre,
                descripcion: parametrosConsulta.descripcion
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
        const rolEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            descripcion: parametrosCuerpo.descripcion
        } as RolEntity;
        try{
            await this._rolService.editarUno(rolEditado)
            return res.redirect("/roles?mensaje=Rol editado");
        } catch (error){
            console.log(error);
            return res.redirect("/roles?error=Error editando rol")
        }
    }

    @Get("editar/:id")
    async vistaEditar(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ){
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