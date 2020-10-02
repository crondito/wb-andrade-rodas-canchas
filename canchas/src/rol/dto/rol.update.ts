import {IsAlpha, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class RolUpdateDTO {
    @IsNotEmpty()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;

    @MinLength(3)
    descripcion: string;
}