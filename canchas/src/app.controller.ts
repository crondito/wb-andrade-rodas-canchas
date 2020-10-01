import {Body, Controller, Get, Post, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import { CanchaService } from "./cancha/cancha.service";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly _canchaService: CanchaService
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
      @Session() session,
  ){
    let canchasEncontradas;
    const estaLogeado = session.usuario;
    try {
      canchasEncontradas = await this._canchaService.buscarCanchasDisponibles()
    }catch (error){
      canchasEncontradas = "0"
    }
    if (estaLogeado) {
      return res.render(
          'principal/home',
          {
            usuario: session.usuario,
            roles: session.roles
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

  @Get('login')
  login(
      @Res() response
  ) {
    return response.render('login/login')
  }

  @Post('login')
  loginPost(
      @Body() parametrosConsulta,
      @Res() response,
      @Session() session
  ) {
    // validamos datos
    const usuario = parametrosConsulta.usuario;
    const password = parametrosConsulta.password;
    if (usuario == 'admin' && password == 'admin') {
      session.usuario = usuario
      session.roles = ['Administrador']
      return response.redirect('home');
    } else {
          return response.redirect('login')
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
            roles: session.roles
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
    session.roles = undefined;
    request.session.destroy();
    return response.redirect('login')
  }

}
