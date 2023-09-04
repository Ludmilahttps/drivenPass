import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCardDto {
    @IsNotEmpty()     
    @IsNumber()
    cardNumber:number

    @IsNotEmpty()  
    @IsString()
    cardName: string

    @IsNotEmpty()  
    @IsString()
    cardCVC:string

    @IsNotEmpty() 
    @IsDateString() 
    cardExp:string

    @IsNotEmpty()  
    @IsString()
    cardPassword:string

    @IsNotEmpty()  
    @IsString()
    cardType: string

    @IsNotEmpty()   
    @IsBoolean()
    virtual:boolean

}
