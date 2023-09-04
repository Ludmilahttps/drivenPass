import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator"

export class CreateCredentialDto {

    @IsNotEmpty()
    @IsString()
    rotulo:string

    @IsUrl()
    @IsNotEmpty()
    url:string

    @IsString()
    @IsNotEmpty()
    username:string

    @IsString()
    @IsNotEmpty()
    senha:string
    
}
