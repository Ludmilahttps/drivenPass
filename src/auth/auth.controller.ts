import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/authuser.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post("/sign-in")
    async signIn(@Body() authDto:AuthDto){
        return await this.authService.signIn(authDto)
    }

    @Post("/sign-up")
    async signUp(@Body() authDto:AuthDto){
        return await this.authService.signUp(authDto)
    }
}
