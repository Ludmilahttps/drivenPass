import { PrismaService } from "../../src/prisma/prisma.service";

export class NoteFactory { 
  private rotulo: string;
  private note: string;
  private userId: number;

  constructor(private readonly prisma: PrismaService) { }
  
  withRotulo(rotulo: string) {
    this.rotulo = rotulo;
    return this;
  }

  withNote(note: string) {
    this.note = note;
    return this;
  }

  withUserId(userId: number) {
    this.userId = userId;
    return this;
  }

  build() {
    return {
      rotulo: this.rotulo,
      note: this.note,
      userId:this.userId
    }
  }

  async persist() {
    const note = this.build();
    return await this.prisma.notes.create({
      data: note
    })
  }

}