import {Controller, Get, Res} from "@nestjs/common";

@Controller("usuarios")
export class UsuarioController {
    @Get()
    vistaHome(
        @Res() res
    ){
        res.render("usuario/usuarios")
    }
}