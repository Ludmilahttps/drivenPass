export class Card {
  private cardNumber:number
  private cardName:string
  private cardCVC:number
  private cardExp: string
  private cardPassword:number
  private cardType: string 
  private virtual: boolean
  private userId:number 

  constructor(cardNumber:number,cardName:string,cardCVC:number,cardExp: string,
    cardPassword:number,cardType: string, virtual: boolean,userId:number ){
        this.cardNumber=cardNumber;
        this.cardName=cardName;
        this.cardCVC=cardCVC;
        this.cardExp=cardExp;
        this.cardPassword=cardPassword;
        this.cardType=cardType;
        this.virtual=virtual;
        this.userId=userId;
    }
}
