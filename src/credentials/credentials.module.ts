import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService],
  imports:[PrismaModule,UsersModule]
})
export class CredentialsModule {}
