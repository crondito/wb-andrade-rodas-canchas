import {IsAlpha, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class CanchaCreateDTO{

    @IsNotEmpty()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;

    @IsAlpha()
    comentario: string;

    @IsAlpha()
    tipo: string;

}