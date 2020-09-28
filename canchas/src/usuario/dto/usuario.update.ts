import {IsAlpha, IsEmpty, IsNotEmpty, IsNumberString, MaxLength, MinLength} from "class-validator";

export class UsuarioUpdateDTO {
    @IsEmpty()
    numeroCedula: string

    @IsEmpty()
    numeroPasaporte: string

    @IsEmpty()
    numeroRuc: string

    @IsNotEmpty()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;

    @IsNotEmpty()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    apellido: string;

    @IsAlpha()
    comentario: string;

    @IsAlpha()
    tipo: string;
}