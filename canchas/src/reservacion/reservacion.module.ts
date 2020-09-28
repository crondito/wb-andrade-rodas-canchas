import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReservacionEntity} from "./reservacion.entity";
import {ReservacionController} from "./reservacion.controller";

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
    providers: []
}) export class ReservacionModule {

}