import {Controller, Get, Res} from "@nestjs/common";

@Controller("equipos")
export class EquipoController {
    @Get()
    vistaHome(
        @Res() res
    ){
        res.render("equipo/equipos")
    }

    @Get("crear")
    vistaCrear(
        @Res() res
    ){
        res.render("equipo/crear-equipo")
    }
}