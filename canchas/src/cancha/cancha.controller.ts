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
import {CanchaService} from "./cancha.service";
import {validate, ValidationError} from "class-validator";
import {CanchaCreateDTO} from "./dto/cancha.create";
import {CanchaUpdateDTO} from "./dto/cancha.update";
import {CanchaEntity} from "./cancha.entity";

@Controller("canchas")
export class CanchaController {
    constructor(
        private readonly _canchaService: CanchaService
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
            resultadoEncontrado = await this._canchaService.buscarTodos(busqueda)
        } catch{
            throw new InternalServerErrorException("Error encontrando canchas")
        }
        if(resultadoEncontrado){
            res.render(
                "cancha/canchas",
                {
                    arregloCanchas: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                }
            )
        }else{
            throw new NotFoundException("No se encontraron canchas")
        }
    }

    @Get("crear")
    vistaCrear(
        @Query() parametrosConsulta,
        @Res() res
    ){
        res.render(
            "cancha/crear-cancha",
            {
                error: parametrosConsulta.error,
                nombreError: parametrosConsulta.nombreError,
                comentarioError: parametrosConsulta.comentarioError,
                tipoError: parametrosConsulta.tipoError,
                estadoError: parametrosConsulta.estadoError,
                nombre: parametrosConsulta.nombre,
                comentario: parametrosConsulta.comentario,
                tipo: parametrosConsulta.tipo,
                estado: parametrosConsulta.estado,
            }
        )
    }

    @Post("crearDesdeVista")
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ){
        const canchaValidada = new CanchaCreateDTO();
        canchaValidada.nombre = parametrosCuerpo.nombre;
        canchaValidada.comentario = parametrosCuerpo.comentario;
        canchaValidada.tipo = parametrosCuerpo.tipo;
        canchaValidada.estado = parametrosCuerpo.estado;

        let nombreConsulta;
        let comentarioConsulta;
        let tipoConsulta;
        let estadoConsulta;
        let nombreError="";
        let comentarioError="";
        let tipoError;
        let estadoError;
        try {
            const errores: ValidationError[] = await validate(canchaValidada);
            if(errores.length > 0){
                console.log("Errores", errores);
                for(const error of errores){
                    if(error["property"]=="nombre"){
                        nombreError = "nombreError=Error en nombre de cancha"
                    }else if(error["property"]=="comentario"){
                        comentarioError = "&comentarioError=Error en comentario de cancha"
                    }else if(error["property"]=="tipo"){
                        tipoError = "&tipoError=Error en tipo de cancha"
                    }else if(error["property"]=="estado"){
                        estadoError = "&estadoError=Error en estado de cancha"
                    }
                }
                nombreConsulta = `&nombre=${parametrosCuerpo.nombre}`
                comentarioConsulta = `&comentario=${parametrosCuerpo.comentario}`
                tipoConsulta = `&tipo=${parametrosCuerpo.tipo}`
                estadoConsulta = `&estado=${parametrosCuerpo.estado}`
                return res.redirect("/canchas/crear?="
                    +nombreError
                    +comentarioError
                    +tipoError
                    +estadoError
                    +nombreConsulta
                    +estadoConsulta
                    +tipoConsulta
                    +estadoConsulta
                )
            } else {
                let respuestaCreacionCancha;
                try {
                    respuestaCreacionCancha = this._canchaService
                        .crearUno(parametrosCuerpo)
                } catch (error){
                    const mensajeError = "Error creando Cancha"
                    return res.redirect("/canchas/crear?error="+mensajeError)
                }
                return res.redirect("/canchas")
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
        const canchaEditadaValidada = new CanchaUpdateDTO();
        canchaEditadaValidada.nombre = parametrosCuerpo.nombre;
        canchaEditadaValidada.comentario = parametrosCuerpo.comentario;
        canchaEditadaValidada.tipo = parametrosCuerpo.tipo;
        canchaEditadaValidada.estado = parametrosCuerpo.estado;

        let nombreConsulta;
        let comentarioConsulta;
        let tipoConsulta;
        let estadoConsulta;
        let nombreError="";
        let comentarioError="";
        let tipoError;
        let estadoError;
        try {
            const errores: ValidationError[] = await validate(canchaEditadaValidada);
            if(errores.length > 0){
                console.log("Errores", errores);
                for(const error of errores){
                    if(error["property"]=="nombre"){
                        nombreError = "nombreError=Error en nombre de cancha"
                    }else if(error["property"]=="comentario"){
                        comentarioError = "&comentarioError=Error en comentario de cancha"
                    }else if(error["property"]=="tipo"){
                        tipoError = "&tipoError=Error en ciontipo de cancha"
                    }else if(error["property"]=="estado"){
                        estadoError = "&estadoError=Error en estado de cancha"
                    }
                }
                nombreConsulta = `&nombre=${parametrosCuerpo.nombre}`
                comentarioConsulta = `&comentario=${parametrosCuerpo.comentario}`
                tipoConsulta = `&tipo=${parametrosCuerpo.tipo}`
                estadoConsulta = `&estado=${parametrosCuerpo.estado}`
                return res.redirect("/canchas/editar/"+parametrosRuta.id+"?="
                    +nombreError
                    +comentarioError
                    +tipoError
                    +estadoError
                    +nombreConsulta
                    +estadoConsulta
                    +tipoConsulta
                    +estadoConsulta
                )
            } else {
                const canchaEditada = {
                    id: Number(parametrosRuta.id),
                    nombre: parametrosCuerpo.nombre,
                    comentario: parametrosCuerpo.comentario,
                    tipo: parametrosCuerpo.tipo,
                    estado: parametrosCuerpo.estado
                } as CanchaEntity;
                let respuestaEdicionCancha;
                try{
                    respuestaEdicionCancha = await this._canchaService
                        .editarUno(canchaEditada)
                    return res.redirect("/canchas?mensaje=Cancha editada");
                } catch (error){
                    console.log(error);
                    return res.redirect("/canchas?error=Error editando cancha")
                }
                return res.redirect("/canchas")
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
        @Res() res
    ){
        const id = Number(parametrosRuta.id)
        let canchaEncontrado
        try{
            canchaEncontrado = await this._canchaService.buscarUno(id);
        }catch (error) {
            console.error("Error del servidor"+error)
            return res.redirect("/canchas?error=Error buscando cancha")
        }
        if(canchaEncontrado){
            return res.render(
                "cancha/crear-cancha",
                {
                    error: parametrosConsulta.error,
                    cancha: canchaEncontrado,
                }
            )
        }else{
            return res.redirect("/canchas?error=Cancha no encontrado")
        }
    }

    @Post("eliminarDesdeVista/:id")
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ){
        try{
            const id = Number(parametrosRuta.id);
            await this._canchaService.eliminarUno(id);
            return res.redirect("/canchas?mensaje=Cancha eliminado")
        } catch (error){
            console.log(error);
            return res.redirect("/canchas?error=Error eliminando cancha")
        }
    }
}