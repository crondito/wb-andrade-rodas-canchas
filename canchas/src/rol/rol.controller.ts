import {Controller, Get, Res} from "@nestjs/common";

@Controller("roles")
export class RolController{
    @Get()
    vistaHome(
        @Res() res
    ){
        res.render("rol/roles")
    }

    @Get("crear")
    vistaCrear(
        @Res() res
    ){
        res.render("rol/crear-rol")
    }
}