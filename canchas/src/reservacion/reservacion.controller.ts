import {Controller, Get, Res} from "@nestjs/common";

@Controller("reservaciones")
export class ReservacionController {
    @Get()
    vistaHome(
        @Res() res
    ){
        res.render("reservacion/reservaciones")
    }
}