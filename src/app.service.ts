import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { EraseDto } from './dto/erase.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class AppService {

  constructor(private readonly prisma:PrismaService){}

  async erase(eraseDto:EraseDto,userId: number) {
    const user= await this.prisma.user.findUnique({
      where:{id:userId}
    })

    const valid=await bcrypt.compare(eraseDto.password,user.senha)
    if(!valid) throw new UnauthorizedException()

    await this.prisma.cards.deleteMany({
      where:{userId}
    })

    await this.prisma.notes.deleteMany({
      where:{userId}
    })

    await this.prisma.credential.deleteMany({
      where:{userId}
    })

    return await this.prisma.user.delete({
      where:{
        id:userId
      }
    })
  }
  getHello(): string {
    return "I'm okay!";
  }
}
