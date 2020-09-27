import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TelefonoEntity} from "./telefono.entity";

@Module({
    controllers: [],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    TelefonoEntity
                ],
                "default"
            )
    ],
    providers: []
}) export class TelefonoModule {

}