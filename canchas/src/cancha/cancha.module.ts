import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CanchaEntity} from "./cancha.entity";
import {CanchaController} from "./cancha.controller";
import {CanchaService} from "./cancha.service";

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
    providers: [
        CanchaService
    ],
    exports: [
        CanchaService
    ]
}) export class CanchaModule {

}