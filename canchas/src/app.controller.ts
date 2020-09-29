import {Controller, Get, Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
      @Res() res,
  ){
    res.redirect('home')
  }

  @Get("home")
  vistaHome(
      @Res() res
  ){
    res.render("principal/home")
  }

}
