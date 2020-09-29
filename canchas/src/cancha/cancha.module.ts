import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CanchaEntity} from "./cancha.entity";
import {CanchaController} from "./cancha.controller";

@Module({
    controllers: [CanchaController],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    CanchaEntity
                ],
                "default"
            )
    ],
    providers: []
}) export class CanchaModule {

}