import { IsNotEmpty, IsString } from "class-validator"

export class CreateNoteDto {
    @IsNotEmpty()
    @IsString()
    rotulo:string

    @IsNotEmpty()
    @IsString()
    note:string 
}
