import {IsAlpha, IsDate, IsNotEmpty, MaxLength, MinDate, MinLength} from "class-validator";
const todayDate = new Date()
export class ReservacionUpdateDTO {
    @IsNotEmpty()
    @IsDate()
    @MinDate(todayDate)
    fechaRegistro: Date;

    @IsNotEmpty()
    @IsDate()
    @MinDate(todayDate)
    fechaHoraReserva: Date;

    @IsNotEmpty()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    estado: string;
}