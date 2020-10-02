import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";

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
    providers: [
        UsuarioService
    ],
    exports: [
        UsuarioService
    ]
}) export class UsuarioModule {

}