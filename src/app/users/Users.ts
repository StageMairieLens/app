import { Image } from '../Image'
import { Progress } from '../Progress'

export class Users {
    id:number;
    nom : string ;
    id_session : number;
    compteur_erreur : number;
    static nb: number = 0;
    progression : number;
    constructor(id : number,nom :string,id_session : number,compteur_erreur : number,progression : number){
        this.id=id;
        this.nom=nom;
        this.id_session=id_session;
        this.compteur_erreur=compteur_erreur;
        this.progression=progression;

    }
}
