
import { Game } from '../Game'
import { Users } from '../users/Users'
import { SessionsComponent } from './sessions.component'

export class Session {
  id: number;
  static number = 0;
  nom: string;
  date: string;
  jeuId: string;
  joueur: Users[];
  isActive: boolean;
  isSuivi : boolean

  constructor(id : number, nom: string, date: string, jeuId: string, isActive: boolean, joueur: Users[], isSuivi : boolean) {
    this.id = id;
    this.nom = nom;
    this.date = date;
    this.jeuId = jeuId;
    this.isActive = isActive;
    this.joueur = joueur;
    this.isSuivi = isSuivi;
  }

  randomId(): number {
    // return Math.floor(Math.random() * 6000000000);
    return Session.number++;



  }

}
