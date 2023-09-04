import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import Cryptr from 'cryptr';

@Injectable()
export class CredentialsRepository {
  private cryptr:Cryptr

  constructor(private readonly prisma:PrismaService){
    const Cryptr=require('cryptr')
    this.cryptr= new Cryptr('myTotallySecretKey')
  }

  create(createCredentialDto: CreateCredentialDto, user: User) {
    return this.prisma.credential.create({
      data:{
        rotulo:createCredentialDto.rotulo,
        senha:this.cryptr.encrypt(createCredentialDto.senha),
        url:createCredentialDto.url,
        username:createCredentialDto.username,
        userId:user.id
      }
    })
  }
  
  findByRotulo(rotulo:string, userId:number){
    return this.prisma.credential.findFirst({
      where:{
        userId,
        rotulo
      }
    })
  }

  delete(id: number, userId: number) {
    return this.prisma.credential.delete({
      where:{id,userId}
    })
  }

  async findByIdAndUser(id: number, userId: number) {
    const cred= await this.prisma.credential.findFirst({
      where:{id,userId}
    })

    return {
      ...cred,
      senha:this.cryptr.decrypt(cred.senha)
    }
  }

  findById(id:number){
    return this.prisma.credential.findFirst({
      where:{id}
    })
  }

  findByUserId(userId:number){
    return this.prisma.credential.findFirst({
      where:{userId}
    })
  }

  async findAll(userId: number) {
    const cred=await this.prisma.credential.findMany({
      where:{userId}
    })

    return cred.map(c=>(
      {
        ...c,
        senha:this.cryptr.decrypt(c.senha)
      }
    ))
  }
}
