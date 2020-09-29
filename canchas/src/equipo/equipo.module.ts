import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EquipoEntity} from "./equipo.entity";
import {EquipoController} from "./equipo.controller";

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
    providers: []
}) export class EquipoModule {

}