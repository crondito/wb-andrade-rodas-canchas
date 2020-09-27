import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EquipoEntity} from "./equipo.entity";

@Module({
    controllers: [],
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