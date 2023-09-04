import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsService {

  constructor(private readonly cardsRepository:CardsRepository){}

  async create(createCardDto: CreateCardDto,userId:number) {
    return await this.cardsRepository.create(createCardDto,userId)
  }

  async findAll(userId:number) {
    return await this.cardsRepository.findAll(userId)
  }

  async findOne(id: number,userId:number) {
    return await this.cardsRepository.findByIdAndUser(id,userId)
  }

  async remove(id: number,userId:number) {
    return await this.cardsRepository.delete(id,userId)
  }
}
