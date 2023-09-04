export class Card {
  private cardNumber:string
  private cardName:string
  private cardCVC:string
  private cardExp: string
  private cardPassword:string
  private cardType: string 
  private virtual: boolean
  private userId:number 

  constructor(cardNumber:string,cardName:string,cardCVC:string,cardExp: string,
    cardPassword:string,cardType: string, virtual: boolean,userId:number ){
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
