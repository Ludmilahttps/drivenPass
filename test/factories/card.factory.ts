import Cryptr from "cryptr";
import { PrismaService } from "../../src/prisma/prisma.service";

export class CardFactory { 
  private cardNumber: string;
  private cardName: string;
  private userId: number;
  private cardCVC: string;
  private cardExp: string;
  private cardPassword:string
  private cardType:string
  private virtual:boolean
  private cryptr:Cryptr

  constructor(private readonly prisma: PrismaService) { 
    const Cryptr=require('cryptr')
    this.cryptr= new Cryptr('myTotallySecretKey')
  }
  
  withCardNumber(cardNumber: string) {
    this.cardNumber = cardNumber;
    return this;
  }

  withCardName(cardName: string) {
    this.cardName = cardName;
    return this;
  }

  withUserId(userId: number) {
    this.userId = userId;
    return this;
  }

  withCardCVC(cardCVC: string) {
    this.cardCVC = cardCVC;
    return this;
  }

  withCardExp(cardExp: string) {
    this.cardExp = cardExp;
    return this;
  }

  withCardPassword(cardPassword: string) {
    this.cardPassword = cardPassword;
    return this;
  }

  withCardType(cardType: string) {
    this.cardType = cardType;
    return this;
  }

  withVirtual(virtual: boolean) {
    this.virtual = virtual;
    return this;
  }

  build() {
    return {
      cardNumber: this.cardNumber,
      cardName: this.cardName,
      userId:this.userId,
      cardCVC:this.cryptr.encrypt(this.cardCVC),
      cardExp:this.cardExp,
      cardPassword:this.cryptr.encrypt(this.cardPassword),
      cardType:this.cardType,
      virtual:this.virtual,
    }
  }

  async persist() {
    const card = this.build();
    return await this.prisma.cards.create({
      data: card
    })
  }

}