import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReservacionEntity} from "./reservacion.entity";

@Module({
    controllers: [],
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