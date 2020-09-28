import {IsAlpha, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength} from "class-validator";

export class TelefonoCreateDTO {
    @IsString()
    @IsPhoneNumber(null)
    telefono: string;
}