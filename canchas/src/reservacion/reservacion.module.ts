import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReservacionEntity} from "./reservacion.entity";
import {ReservacionController} from "./reservacion.controller";
import {ReservacionService} from "./reservacion.service";
import {CanchaService} from "../cancha/cancha.service";
import {CanchaModule} from "../cancha/cancha.module";
import {EquipoModule} from "../equipo/equipo.module";

@Module({
    controllers: [
        ReservacionController
    ],
    imports: [
        CanchaModule,
        EquipoModule,
        TypeOrmModule
            .forFeature(
                [
                    ReservacionEntity
                ],
                "default"
            )
    ],
    providers: [
        ReservacionService
    ]
}) export class ReservacionModule {

}