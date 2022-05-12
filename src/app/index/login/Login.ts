export class Login {
    id: number;
    static number = 0;
    email: string;
    mdp: string;
    co:number=0;
    id2:number;
    constructor(id:number,email: string, mdp: string,co:number) {
        this.id = Login.number++;
        this.id2=id;
        this.email = email;
        this.mdp = mdp;
        this.co = co;
    }
}
