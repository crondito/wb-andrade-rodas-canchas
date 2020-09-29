import {Controller, Get, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {CanchaService} from "./cancha/cancha.service";

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
    res.redirect('home')
  }

  @Get("home")
  async vistaHome(
      @Res() res
  ){
    let canchasEncontradas
    try {
      canchasEncontradas = await this._canchaService.buscarCanchasDisponibles()
    }catch (error){
      canchasEncontradas = "0"
    }
    res.render(
        "principal/home",
        {
          numeroCanchas: canchasEncontradas[1]
        }
    )
  }

}
