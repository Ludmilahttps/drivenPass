import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma} from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto,@User() user:UserPrisma) {
    return await this.cardsService.create(createCardDto,user.id);
  }

  @Get()
  async findAll(@User() user:UserPrisma) {
    return await this.cardsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@User() user:UserPrisma) {
    return await this.cardsService.findOne(+id,user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@User() user:UserPrisma) {
    return await this.cardsService.remove(+id,user.id);
  }
}
