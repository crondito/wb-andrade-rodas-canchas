import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReservacionEntity} from "./reservacion.entity";
import {ReservacionController} from "./reservacion.controller";
import {ReservacionService} from "./reservacion.service";

@Module({
    controllers: [
        ReservacionController
    ],
    imports: [
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