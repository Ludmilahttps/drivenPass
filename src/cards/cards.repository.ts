import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from '../prisma/prisma.service';
import Cryptr from 'cryptr';

@Injectable()
export class CardsRepository {
  
  private cryptr:Cryptr
  
  constructor(private readonly prisma:PrismaService){
    const Cryptr=require('cryptr')
    this.cryptr= new Cryptr('myTotallySecretKey')
  }
  
  delete(id: number, userId: number) {
    return this.prisma.cards.delete({
      where:{id,userId}
    })
  }

  async findByIdAndUser(id: number, userId: number) {
    const card= await this.prisma.cards.findFirst({
      where:{id,userId}
    })

    return {
      ...card,
      cardCVC:this.cryptr.decrypt(card.cardCVC),
      cardPassword:this.cryptr.decrypt(card.cardPassword)
    }
  }

  async findAll(userId: number) {
    const card=await this.prisma.cards.findMany({
      where:{userId}
    })

    return card.map(c=>(
      {
        ...c,
        cardCVC:this.cryptr.decrypt(c.cardCVC),
        cardPassword:this.cryptr.decrypt(c.cardPassword)
      }
    ))
  }

  create(createCardDto: CreateCardDto, userId: number) {
    return this.prisma.cards.create({
      data:{
        ...createCardDto,
        cardCVC:this.cryptr.encrypt(createCardDto.cardCVC),
        cardPassword:this.cryptr.encrypt(createCardDto.cardPassword),
        userId
      }
    })
  }

  findById(id:number){
    return this.prisma.cards.findFirst({
      where:{id}
    })
  }

  findByUserId(userId:number){
    return this.prisma.cards.findFirst({
      where:{userId}
    })
  }
}
