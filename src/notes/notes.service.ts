import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository:NotesRepository){}
  async create(createNoteDto: CreateNoteDto,userId:number) {
    const note=await this.notesRepository.findByRotulo(createNoteDto.rotulo,userId)
    if(note) throw new ConflictException()

    return await this.notesRepository.create(createNoteDto,userId);
  }

  async findAll(userId:number) {
    return await this.notesRepository.findAll(userId)
  }

  async findOne(id: number,userId:number) {
    const existNote=await this.notesRepository.findById(id)
    if(!existNote) throw new NotFoundException()

    const isUser=await this.notesRepository.findByIdAndUser(id,userId)
    if(!isUser) throw new ForbiddenException()

    return isUser
  }

  async remove(id: number,userId:number) {
    const existNote=await this.notesRepository.findById(id)
    if(!existNote) throw new NotFoundException()

    const isUser=await this.notesRepository.findByIdAndUser(id,userId)
    if(!isUser) throw new ForbiddenException()
    
    return await this.notesRepository.delete(id,userId)
  }
}
