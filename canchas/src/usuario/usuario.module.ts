import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioController} from "./usuario.controller";

@Module({
    controllers: [UsuarioController],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    UsuarioEntity
                ],
                "default"
            )
    ],
    providers: []
}) export class UsuarioModule {

}