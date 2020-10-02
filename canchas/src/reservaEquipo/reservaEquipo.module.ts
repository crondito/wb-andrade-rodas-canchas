import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReservaEquipoEntity} from "./reservaEquipo.entity";
import {ReservaEquipoService} from "./reservaEquipo.service";

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
    providers: [ReservaEquipoService],
    exports: [ReservaEquipoService]
}) export class ReservaEquipoModule {

}