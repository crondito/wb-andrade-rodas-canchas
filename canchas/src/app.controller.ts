import {Body, Controller, Get, Post, Query, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import { CanchaService } from "./cancha/cancha.service";
import {UsuarioService} from "./usuario/usuario.service";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly _canchaService: CanchaService,
      private readonly _usuarioService: UsuarioService
  ) {
  }

  @Get()
  getHello(
      @Res() res,
  ){
    res.redirect('/login')
  }

  @Get('home')
  async vistaHome(
      @Res() res,
      @Session() session
  ){
    const estaLogueado = session.usuario;
    const currentUserRol = session.rol;
    if(!estaLogueado){
      return res.redirect('login');
    }
    let canchasEncontradas;
    try {
      canchasEncontradas = await this._canchaService.buscarCanchasDisponibles()
      canchasEncontradas = canchasEncontradas[1]
    }catch (error){
      canchasEncontradas = "0"
    }
    if (estaLogueado) {
      return res.render(
          'principal/home',
          {
            usuario: session.usuario,
            rol: session.rol,
            currentUserRol: currentUserRol,
            numeroCanchas: canchasEncontradas
          }
      )
    } else {
      return res.redirect('/login')
    }
    // res.render(
    //     "principal/home",
    //     {
    //       numeroCanchas: canchasEncontradas[1]
    //     }
    // )
  }

  @Post("home")
  buscarDesdeHome(
      @Body() parametrosCuerpo,
      @Res() res
  ){
    const vista = parametrosCuerpo.tipo.toString().toLowerCase();
    res.redirect("/"+vista+"?busqueda="+parametrosCuerpo.busqueda)
  }

  @Get('login')
  login(
      @Query() parametrosConsulta,
      @Res() response,
      @Session() session
  ) {
    const estaLogueado = session.usuario;
    if(estaLogueado){
      return response.redirect('home');
    }
    return response.render(
        'login/login',
        {
          parametrosConsulta: parametrosConsulta
        }
    )
  }

  @Post('login')
  async loginPost(
      @Body() parametrosConsulta,
      @Res() response,
      @Session() session
  ) {
    // validamos datos
    const usuario = parametrosConsulta.usuario;
    const password = parametrosConsulta.password;
    if (usuario == 'admin' && password == 'admin') {
      session.usuario = usuario
      session.rol = 'Administrador'
      return response.redirect('home');
    } else {
        let usuarioEncontrado
        try {
          usuarioEncontrado = await this._usuarioService.buscarTodos(usuario)
          session.usuario = usuarioEncontrado[0].numeroCedula
          session.rol = usuarioEncontrado[0].tipo
          return response.redirect('home');
        } catch (error){
          return response.redirect("/login?error=Error consultando usuario");
        }
        return response.redirect("/login?error=Error en username o password");
      }
    }

  @Get('protegido')
  protegido(
      @Res() response,
      @Session() session,
  ) {
    const estaLogeado = session.usuario;
    if (estaLogeado) {
      return response.render(
          'login/protegido',
          {
            usuario: session.usuario,
            rol: session.rol
          }
      )
    } else {
      return response.redirect('/login')
    }
  }

  @Get('logout')
  logout(
      @Session() session,
      @Res() response,
      @Req() request
  ) {
    session.username = undefined;
    session.rol = undefined;
    request.session.destroy();
    return response.redirect('login')
  }

}
