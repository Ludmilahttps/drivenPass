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
}
