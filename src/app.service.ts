import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { EraseDto } from './dto/erase.dto';
import * as bcrypt from "bcrypt"
import { UsersService } from './users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AppService {

  constructor(
    private readonly prisma:PrismaService,
    private readonly usersService:UsersService
    ){}

  async erase(eraseDto:EraseDto,user:User) {
    const users= await this.usersService.getUserByEmail(user.email)

    const valid=await bcrypt.compare(eraseDto.password,user.senha)
    if(!valid) throw new UnauthorizedException()

    await this.prisma.cards.deleteMany({
      where:{userId:user.id}
    })

    await this.prisma.notes.deleteMany({
      where:{userId:user.id}
    })

    await this.prisma.credential.deleteMany({
      where:{userId:user.id}
    })

    return await this.prisma.user.delete({
      where:{
        id:user.id
      }
    })
  }
  getHello(): string {
    return "I'm okay!";
  }
}
