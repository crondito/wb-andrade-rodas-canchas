import {IsPhoneNumber, IsString} from "class-validator";

export class TelefonoUpdateDTO {
    @IsString()
    @IsPhoneNumber(null)
    telefono: string;
}