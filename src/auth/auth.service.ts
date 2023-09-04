import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/authuser.dto';
import * as bcrypt from "bcrypt"
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    private EXPIRATION_TIME="7 days"
    private ISSUER="Lorenzo"
    private AUDIENCE="users"

    constructor(
        private readonly usersService:UsersService,
        private readonly jwtService:JwtService){}
    
    async signUp(authDto: AuthDto) {
        const user=await this.usersService.create(authDto)
        return {
            id:user.id,
            email:user.email
        }
    }

    async signIn(authDto: AuthDto) {
        const user= await this.usersService.getUserByEmail(authDto.email)
        if(!user) throw new UnauthorizedException("Email or password not valid")
        const valid=await bcrypt.compare(authDto.senha,user.senha)
        if(!valid) throw new UnauthorizedException("Email or password not valid")


        return this.createToken(user)
    }
    
    createToken(user: User) {
        const {id,email}=user
        const token=this.jwtService.sign({email},{
            expiresIn:this.EXPIRATION_TIME,
            issuer:this.ISSUER,
            subject:String(id),
            audience:this.AUDIENCE
        })

        return {token}
    }

    checkToken(token:string){
        const data=this.jwtService.verify(token,{
            audience:this.AUDIENCE,
            issuer:this.ISSUER
        })
        
        return data
    }
    
}
