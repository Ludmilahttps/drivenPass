import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { User as UserPrisma} from '@prisma/client';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto,@User() user:UserPrisma) {
    return await this.notesService.create(createNoteDto,user.id);
  }

  @Get()
  async findAll(@User() user:UserPrisma) {
    return await this.notesService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@User() user:UserPrisma) {
    return await this.notesService.findOne(+id,user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@User() user:UserPrisma) {
    return await this.notesService.remove(+id,user.id);
  }
}
