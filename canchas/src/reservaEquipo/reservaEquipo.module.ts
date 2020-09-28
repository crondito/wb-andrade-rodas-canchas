import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReservaEquipoEntity} from "./reservaEquipo.entity";

@Module({
    controllers: [],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    ReservaEquipoEntity
                ],
                "default"
            )
    ],
    providers: []
}) export class ReservaEquipoModule {

}