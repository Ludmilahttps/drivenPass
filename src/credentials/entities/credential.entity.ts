export class Credential {
    private rotulo:string
    private url:string
    private username:string
    private senha:string
    private userId:number

    constructor(rotulo:string,url:string,username:string,senha:string,userId:number){
        this.rotulo=rotulo;
        this.url=url;
        this.username=username;
        this.senha=senha;
        this.userId=userId;
    }
}
