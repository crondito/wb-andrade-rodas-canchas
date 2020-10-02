import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EquipoEntity} from "./equipo.entity";
import {EquipoController} from "./equipo.controller";
import {EquipoService} from "./equipo.service";

@Module({
    controllers: [EquipoController],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    EquipoEntity
                ],
                "default"
            )
    ],
    providers: [
        EquipoService
    ],
    exports: [
        EquipoService
    ]
}) export class EquipoModule {

}