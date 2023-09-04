import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator"

export class CreateCardDto {
    @IsNotEmpty()     
    @IsString()
    cardNumber:string

    @IsNotEmpty()  
    @IsString()
    cardName: string

    @IsNotEmpty()  
    @IsString()
    cardCVC:string

    @IsNotEmpty() 
    @IsString()
    cardExp:string

    @IsNotEmpty()  
    @IsNumberString()
    cardPassword:string

    @IsNotEmpty()  
    @IsString()
    cardType: string

    @IsNotEmpty()   
    @IsBoolean()
    virtual:boolean

    constructor(params?: Partial<CreateCardDto>) {
        Object.assign(this, params);
    }
}
