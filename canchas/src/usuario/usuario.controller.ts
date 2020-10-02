import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Query,
    Res, Session
} from "@nestjs/common";
import {UsuarioCreateDTO} from "./dto/usuario.create";
import {validate, ValidationError} from "class-validator";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioUpdateDTO} from "./dto/usuario.update";
import {RolService} from "../rol/rol.service";

@Controller("usuarios")
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _rolService: RolService
    ) {
    }

    // @Get()
    // vistaHome(
    //     @Res() res
    // ){
    //     res.render("usuario/usuarios")
    // }

    @Get()
    async vistaUsuario(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ){
        const estaLogueado = session.usuario;
        const currentUserRol = session.rol;
        if(!estaLogueado){
            return res.redirect('login');
        }
        if(currentUserRol.toString() != "Administrador"){
            return res.redirect('home');
        }
        let resultadoEncontrado
        let busqueda = ""
        const existeBusqueda = typeof parametrosConsulta.busqueda!="undefined";
        if (existeBusqueda){
            busqueda = parametrosConsulta.busqueda
        }
        try{
            resultadoEncontrado = await this._usuarioService.buscarTodos(busqueda)
        } catch{
            throw new InternalServerErrorException("Error encontrando usuarios")
        }
        if(resultadoEncontrado){
            res.render(
                "usuario/usuarios",
                {
                    arregloUsuarios: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta,
                    currentUserRol: currentUserRol
                }
            )
        }else{
            throw new NotFoundException("No se encontraron usuarios")
        }
    }

    // @Get("clientes")
    // vistaClientes(
    //     @Res() res
    // ){
    //     res.render("usuario/clientes")
    // }

    // @Get("crear")
    // vistaCrear(
    //     @Res() res
    // ){
    //     res.render("usuario/crear-usuario")
    // }

    @Get("crear")
    async vistaCrear(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ){
        const estaLogueado = session.usuario;
        const currentUserRol = session.rol;
        if(!estaLogueado){
            return res.redirect('login');
        }
        if(currentUserRol.toString() != "Administrador"){
            return res.redirect('home');
        }
        let rolesEncontrados;
        try{
            rolesEncontrados = await this._rolService.buscarTodos("")
        }catch (error){
            rolesEncontrados = []
        }
        res.render(
            "usuario/crear-usuario",
            {
                error: parametrosConsulta.error,
                nombreError: parametrosConsulta.nombreError,
                apellidoError: parametrosConsulta.apellidoError,
                numeroCedulaError: parametrosConsulta.numeroCedulaError,
                telefonoError: parametrosConsulta.telefonoError,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                numeroCedula: parametrosConsulta.numeroCedula,
                // numeroPasaporte: parametrosConsulta.numeroPasaporte,
                // numeroRuc: parametrosConsulta.numeroRuc,
                telefono: parametrosConsulta.telefono,
                tipo: parametrosConsulta.tipo,
                arregloRoles: rolesEncontrados,
                currentUserRol: currentUserRol
            }
        )
    }

    @Post("crearDesdeVista")
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ){
        const usuarioValidado = new UsuarioCreateDTO();
        usuarioValidado.nombre = parametrosCuerpo.nombre;
        usuarioValidado.apellido = parametrosCuerpo.apellido;
        usuarioValidado.numeroCedula = parametrosCuerpo.numeroCedula;
        // usuarioValidado.numeroPasaporte = parametrosCuerpo.numeroPasaporte;
        // usuarioValidado.numeroRuc = parametrosCuerpo.numeroRuc;
        usuarioValidado.telefono = parametrosCuerpo.telefono;
        usuarioValidado.tipo = parametrosCuerpo.tipo;

        parametrosCuerpo.numeroPasaporte = parametrosCuerpo.numeroCedula;
        parametrosCuerpo.numeroRuc = parametrosCuerpo.numeroCedula;

        let nombreConsulta, apellidoConsulta, numeroCedulaConsulta, telefonoConsulta, tipoConsulta, nombreError="", apellidoError="";
        try {
            const errores: ValidationError[] = await validate(usuarioValidado);
            if(errores.length > 0){
                console.log("Errores", errores);
                for(const error of errores){
                    if(error["property"]=="nombre"){
                        nombreError = "nombreError=Error en nombre de Usuario"
                    }else if(error["property"]=="apellido") {
                        apellidoError = "&apellidoError=Error en apellido de Usuario"
                    }
                }
                nombreConsulta = `&nombre=${parametrosCuerpo.nombre}`
                apellidoConsulta = `&apellido=${parametrosCuerpo.apellido}`
                numeroCedulaConsulta = `&numeroCedula=${parametrosCuerpo.numeroCedula}`
                telefonoConsulta = `&telefono=${parametrosCuerpo.telefono}`
                tipoConsulta = `&tipo=${parametrosCuerpo.tipo}`
                return res.redirect("/usuarios/crear?="+nombreError+apellidoError+nombreConsulta+apellidoConsulta+numeroCedulaConsulta+telefonoConsulta+tipoConsulta)
            } else {
                let respuestaCreacionUsuario;
                try {
                    respuestaCreacionUsuario = this._usuarioService
                        .crearUno(parametrosCuerpo)
                } catch (error){
                    const mensajeError = "Error creando Usuario"
                    return res.redirect("/usuarios/crear?error="+mensajeError)
                }
                return res.redirect("/usuarios")
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
        const UsuarioEditadoValidado = new UsuarioUpdateDTO();
        UsuarioEditadoValidado.nombre = parametrosCuerpo.nombre;
        UsuarioEditadoValidado.apellido = parametrosCuerpo.apellido;
        UsuarioEditadoValidado.numeroCedula = parametrosCuerpo.numeroCedula;
        // UsuarioEditadoValidado.numeroPasaporte = parametrosCuerpo.numeroPasaporte;
        // UsuarioEditadoValidado.numeroRuc = parametrosCuerpo.numeroRuc;
        UsuarioEditadoValidado.telefono = parametrosCuerpo.telefono;
        UsuarioEditadoValidado.tipo = parametrosCuerpo.tipo;

        let nombreConsulta, apellidoConsulta, nombreError="", apellidoError="";
        try {
            const errores: ValidationError[] = await validate(UsuarioEditadoValidado)
            if(errores.length > 0) {
                console.log(parametrosCuerpo.tipo+"Errores", errores);
                for (const error of errores) {
                    if (error["property"] == "nombre") {
                        nombreError = "nombreError=Error en nombre"
                    } else if (error["property"] == "apellido") {
                        apellidoError = "&apellidoError=Error en descripción"
                    }
                }
                nombreConsulta = `&nombre=${parametrosCuerpo.nombre}`
                apellidoConsulta = `&apellido=${parametrosCuerpo.apellido}`
                return res.redirect("/usuarios/editar/" + parametrosRuta.id + "?=" + nombreError + apellidoError + nombreConsulta + apellidoConsulta)
            } else {
                const usuarioEditado = {
                    id: Number(parametrosRuta.id),
                    nombre: parametrosCuerpo.nombre,
                    apellido: parametrosCuerpo.apellido,
                    numeroCedula: parametrosCuerpo.numeroCedula,
                    numeroPasaporte: parametrosCuerpo.numeroCedula,
                    numeroRuc: parametrosCuerpo.numeroCedula,
                    telefono: parametrosCuerpo.telefono,
                    tipo: parametrosCuerpo.tipo,
                } as UsuarioEntity;
                let respuestaEdicionUsuario;
                try{
                    respuestaEdicionUsuario = await this._usuarioService
                        .editarUno(usuarioEditado)
                    return res.redirect("/usuarios?mensaje=Usuario editado");
                } catch (error){
                    console.log(error);
                    return res.redirect("/usuarios?error=Error editando usuario")
                }
                return res.redirect("/usuarios")
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
        if(currentUserRol.toString() != "Administrador"){
            return res.redirect('home');
        }
        const id = Number(parametrosRuta.id)
        let usuarioEncontrado
        try{
            usuarioEncontrado = await this._usuarioService.buscarUno(id);
        }catch (error) {
            console.error("Error del servidor"+error)
            return res.redirect("/usuarios?error=Error buscando Usuario")
        }
        let rolesEncontrados
        try{
            rolesEncontrados = await this._rolService.buscarTodos("")
        }catch (error){
            rolesEncontrados = []
        }
        if(usuarioEncontrado){
            return res.render(
                "usuario/crear-usuario",
                {
                    error: parametrosConsulta.error,
                    usuario: usuarioEncontrado,
                    arregloRoles: rolesEncontrados,
                    currentUserRol: currentUserRol
                }
            )
        }else{
            return res.redirect("/usuarios?error=Usuario no encontrado")
        }
    }

    @Post("eliminarDesdeVista/:id")
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ){
        try{
            const id = Number(parametrosRuta.id);
            await this._usuarioService.eliminarUno(id);
            return res.redirect("/usuarios?mensaje=Usuario eliminado")
        } catch (error){
            console.log(error);
            return res.redirect("/usuarios?error=Error eliminando Usuario")
        }
    }
    
    // @Get("crear/cliente")
    // vistaCrearCliente(
    //     @Res() res
    // ){
    //     res.render("usuario/crear-cliente")
    // }
}