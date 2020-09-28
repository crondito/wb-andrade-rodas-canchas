import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CanchaModule} from "./cancha/cancha.module";
import {EquipoModule} from "./equipo/equipo.module";
import {ReservacionModule} from "./reservacion/reservacion.module";
import {RolModule} from "./rol/rol.module";
import {TelefonoModule} from "./telefono/telefono.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CanchaEntity} from "./cancha/cancha.entity";
import {EquipoEntity} from "./equipo/equipo.entity";
import {ReservacionEntity} from "./reservacion/reservacion.entity";
import {RolEntity} from "./rol/rol.entity";
import {TelefonoEntity} from "./telefono/telefono.entity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {ReservaEquipoModule} from "./reservaEquipo/reservaEquipo.module";
import {ReservaEquipoEntity} from "./reservaEquipo/reservaEquipo.entity";

// Many-to-Many relationships https://codeburst.io/typeorm-by-example-part-7-97025823adff

@Module({
  imports: [
      CanchaModule,
      EquipoModule,
      ReservacionModule,
      ReservaEquipoModule,
      RolModule,
      TelefonoModule,
      UsuarioModule,
      TypeOrmModule.forRoot({
        name:'default', // Nombre de conexión
        type: 'mysql', //Mysql o postgress
        host: 'localhost', //ip
        port: 3306, //puerto
        username: 'root', //usuario
        password: 'kakaroto', // password
        //password: 'test',
        database: 'PryAppsWeb', // Base de datos
        entities: [
            CanchaEntity,
            EquipoEntity,
            ReservacionEntity,
            ReservaEquipoEntity,
            RolEntity,
            TelefonoEntity,
            UsuarioEntity
        ],
        synchronize: true, // Actualizar el esquema de la base de datso
        dropSchema: true, //Eliminar Datos y el Esquema de base de datos //true para borrar  y volver a generar
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
