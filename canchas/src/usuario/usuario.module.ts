import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {RolModule} from "../rol/rol.module";

@Module({
    controllers: [UsuarioController],
    imports: [
        RolModule,
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