import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsStrongPassword()
    @IsNotEmpty()
    senha:string
}
