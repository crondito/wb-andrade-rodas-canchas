import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CanchaEntity} from "./cancha.entity";

@Module({
    controllers: [],
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