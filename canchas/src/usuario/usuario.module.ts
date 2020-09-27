import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Module({
    controllers: [],
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