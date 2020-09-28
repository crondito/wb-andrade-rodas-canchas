import {IsAlpha, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class RolCreateDTO {
    @IsNotEmpty()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;

    @IsAlpha()
    descripcion: string;
}