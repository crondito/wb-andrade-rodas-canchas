import {Controller, Get, Res} from "@nestjs/common";

@Controller("usuarios")
export class UsuarioController {
    @Get()
    vistaHome(
        @Res() res
    ){
        res.render("usuario/usuarios")
    }

    @Get("clientes")
    vistaClientes(
        @Res() res
    ){
        res.render("usuario/clientes")
    }

    @Get("crear")
    vistaCrear(
        @Res() res
    ){
        res.render("usuario/crear-usuario")
    }

    @Get("crear/cliente")
    vistaCrearCliente(
        @Res() res
    ){
        res.render("usuario/crear-cliente")
    }
}