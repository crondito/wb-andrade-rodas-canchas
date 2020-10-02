import {IsAlpha, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class CanchaCreateDTO {

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;

    @MinLength(3)
    comentario: string;

    @MinLength(3)
    tipo: string;

    @MinLength(3)
    estado: string;

}