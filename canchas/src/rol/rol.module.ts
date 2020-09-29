import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolEntity} from "./rol.entity";
import {RolController} from "./rol.controller";

@Module({
    controllers: [RolController],
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