import {Controller, Get, Res} from "@nestjs/common";

@Controller("canchas")
export class CanchaController {
    @Get()
    vistaHome(
        @Res() res
    ){
        res.render("cancha/canchas")
    }

    @Get("crear")
    vistaCrear(
        @Res() res
    ){
        res.render("cancha/crear-cancha")
    }

}