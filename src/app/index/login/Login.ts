export class Login {
    id: number;
    static number = 0;
    email: string;
    mdp: string;

    constructor(email: string, mdp: string) {
        this.id = Login.number++;
        this.email = email;
        this.mdp = mdp;
    }
}
