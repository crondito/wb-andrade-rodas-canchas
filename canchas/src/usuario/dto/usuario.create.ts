import {IsAlpha, IsDecimal, IsNotEmpty, IsNumber, IsNumberString, MaxLength, MinLength} from "class-validator";

export class UsuarioCreateDTO {
    @IsNumberString()
    numeroCedula: string;

    @IsNumberString()
    numeroPasaporte: string;

    @IsNumberString()
    numeroRuc: string;

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

    @IsNumberString()
    telefono: string;

    @IsAlpha()
    comentario: string;

    @IsAlpha()
    tipo: string;
}