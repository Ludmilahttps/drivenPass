import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { User } from '@prisma/client';
import { CredentialsRepository } from './credentials.repository';

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialsRepository:CredentialsRepository){}

  async create(createCredentialDto: CreateCredentialDto,user:User) {
    const credential=await this.credentialsRepository.findByRotulo(createCredentialDto.rotulo,user.id)
    if(credential) throw new ConflictException()
    return await this.credentialsRepository.create(createCredentialDto,user);
  }

  async findAll(userId:number) {
    return await this.credentialsRepository.findAll(userId)
  }

  async findOne(id: number,userId:number) {
    const existsCred=await this.credentialsRepository.findById(id)
    if(!existsCred) throw new NotFoundException()

    const isUser=await this.credentialsRepository.findByIdAndUser(id,userId)
    if(!isUser) throw new ForbiddenException()

    return isUser
  }

  async remove(id: number,userId:number) {
    const existsCred=await this.credentialsRepository.findById(id)
    if(!existsCred) throw new NotFoundException()

    const isUser=await this.credentialsRepository.findByIdAndUser(id,userId)
    if(!isUser) throw new ForbiddenException()
    
    return await this.credentialsRepository.delete(id,userId)
  }
}
