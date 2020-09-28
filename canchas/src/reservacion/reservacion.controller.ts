import {Controller, Get, Res} from "@nestjs/common";

@Controller("reservacion")
export class ReservacionController {
    @Get("home")
    vistaHome(
        @Res() res
    ){
        res.render("principal/home")
    }
}