import { Controller, Get, Post, Body,  Param, Delete, UseGuards} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma} from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  async create(@Body() createCredentialDto: CreateCredentialDto, @User() user:UserPrisma) {
    return await this.credentialsService.create(createCredentialDto,user);
  }

  @Get()
  async findAll(@User() user:UserPrisma) {
    return await this.credentialsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@User() user:UserPrisma) {
    return await this.credentialsService.findOne(+id,user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@User() user:UserPrisma) {
    return await this.credentialsService.remove(+id,user.id);
  }
}
