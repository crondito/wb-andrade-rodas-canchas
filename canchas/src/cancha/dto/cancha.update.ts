import {IsAlpha, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class CanchaUpdateDTO{

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
