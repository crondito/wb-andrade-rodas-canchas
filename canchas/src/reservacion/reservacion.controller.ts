import {Controller, Get, Res} from "@nestjs/common";

@Controller("reservaciones")
export class ReservacionController {
    @Get()
    vistaHome(
        @Res() res
    ){
        res.render("reservacion/reservaciones")
    }

    @Get("crear")
    vistaCrear(
        @Res() res
    ){
        res.render("reservacion/crear-reservacion")
    }
}