import {
    IsAlpha,
    IsDecimal,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsPhoneNumber,
    MaxLength,
    MinLength
} from "class-validator";

export class UsuarioCreateDTO {
    @IsNumberString()
    numeroCedula: string;

    // @IsNumberString()
    // numeroPasaporte: string;
    //
    // @IsNumberString()
    // numeroRuc: string;

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

    @IsPhoneNumber("null")
    telefono: string;

    // @IsAlpha()
    // comentario: string;

    @IsAlpha()
    tipo: string;
}