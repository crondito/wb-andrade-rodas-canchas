import {IsInt, IsPositive} from "class-validator";

export class ReservaEquipoUpdateDTO {
    @IsInt()
    @IsPositive()
    cantidad: number;
}