import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesRepository {  
  constructor(private readonly prisma:PrismaService){}
  
  delete(id: number, userId: number) {
    return this.prisma.notes.delete({
      where:{id,userId}
    })
  }
  findByIdAndUser(id: number, userId: number) {
    return this.prisma.notes.findFirst({
      where:{id,userId}
    })
  }
  findAll(userId: number) {
    return this.prisma.notes.findMany({
      where:{userId}
    })
  }
  create(createNoteDto: CreateNoteDto, userId: number) {
    return this.prisma.notes.create({
      data:{
        ...createNoteDto,
        userId:userId
      }
    })
  }

  findByRotulo(rotulo:string,userId:number){
    return this.prisma.notes.findFirst({
      where:{rotulo,userId}
    })
  }

  findById(id:number){
    return this.prisma.notes.findUnique({
      where:{id}
    })
  }
}
