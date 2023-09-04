import { PrismaService } from "../../src/prisma/prisma.service";
import * as bcrypt from "bcrypt"

export class UserFactory { 
  private email: string;
  private senha: string;
  private SALT=10

  constructor(private readonly prisma: PrismaService) { }
  
  withEmail(email: string) {
    this.email = email;
    return this;
  }

  withSenha(senha: string) {
    this.senha = senha;
    return this;
  }

  build() {
    return {
      email: this.email,
      senha: bcrypt.hashSync(this.senha,this.SALT)
    }
  }

  async persist() {
    const user = this.build();
    return await this.prisma.user.create({
      data: user
    })
  }

}