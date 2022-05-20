
import { Game } from '../Game'
import { Users } from '../users/Users'
import { Guest, SessionsComponent } from './sessions.component'
import { Jeu } from './sessions.component'

export class Session {
  id: number;
  static number = 0;
  nom: string;
  date: string;
  jeuId: Jeu[];
  joueur: Guest[];
  isActive: boolean;
  isSuivi : boolean
  id_crea : number;

  constructor(id : number, nom: string, date: string, jeuId: Jeu[], isActive: boolean, joueur: Guest[], isSuivi : boolean, id_crea : number) {
    this.id = id;
    this.nom = nom;
    this.date = date;
    this.jeuId = jeuId;
    this.isActive = isActive;
    this.joueur = joueur;
    this.isSuivi = isSuivi;
    this.id_crea = id_crea;
  }

  randomId(): number {
    // return Math.floor(Math.random() * 6000000000);
    return Session.number++;



  }

}
