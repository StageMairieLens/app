
import { Game } from '../Game'
import { Users } from '../users/Users'

export class Session {
  id: number;
  static number = 0;
  nom: string;
  date: Date;
  jeu: Game;
  jeuId: number;
  joueur: Users[];
  isActive: boolean;

  constructor(nom: string, date: Date, jeu: Game, jeuId: number, isActive: boolean, joueur: Users[],) {
    this.id = Session.number++;
    this.nom = nom;
    this.date = date;
    this.jeu = jeu;
    this.jeuId = jeuId;
    this.isActive = isActive;
    this.joueur = joueur;
  }

}
