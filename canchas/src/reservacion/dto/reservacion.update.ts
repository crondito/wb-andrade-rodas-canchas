import {IsAlpha, IsDate, IsNotEmpty, IsNumber, IsPositive, MaxLength, MinDate, MinLength} from "class-validator";
const todayDate = new Date()
export class ReservacionUpdateDTO {
    @IsNotEmpty()
    @IsDate()
    @MinDate(todayDate)
    fechaHoraReservacion: Date;

    @IsNotEmpty()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    estado: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    tiempoReservacion: number;
}