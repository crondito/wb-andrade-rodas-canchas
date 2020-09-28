import {IsInt, IsPositive} from "class-validator";

export class ReservaEquipoCreateDTO {
    @IsInt()
    @IsPositive()
    cantidad: number;
}