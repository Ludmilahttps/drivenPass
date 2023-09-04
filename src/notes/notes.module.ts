import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NotesRepository } from './notes.repository';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService,NotesRepository],
  imports:[UsersModule,PrismaModule]
})
export class NotesModule {}
