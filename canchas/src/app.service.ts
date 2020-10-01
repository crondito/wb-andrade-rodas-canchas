import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Proyecto Web - Luis Andrade, Carlos Rodas';
  }
}
