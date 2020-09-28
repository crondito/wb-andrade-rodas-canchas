import {IsAlpha, IsDate, IsNotEmpty, IsNumber, IsPositive, MaxLength, MinDate, MinLength} from "class-validator";
const todayDate = new Date()
export class ReservacionCreateDTO {
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

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    tiempoReservacion: number;
}