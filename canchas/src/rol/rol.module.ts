import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolEntity} from "./rol.entity";

@Module({
    controllers: [],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    RolEntity
                ],
                "default"
            )
    ],
    providers: []
}) export class RolModule {

}