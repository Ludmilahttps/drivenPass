import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"
import { CreateUserDto } from "../../users/dto/create-user.dto";

export class AuthDto extends CreateUserDto{}
