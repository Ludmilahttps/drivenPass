export class Note {
    private rotulo:string
    private note:string
    private userId:number

    constructor(rotulo:string,note:string,userId:number){
        this.rotulo=rotulo;
        this.note=note;
        this.userId=userId;
    }
}
