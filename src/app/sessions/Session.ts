
import {Game } from '../Game'

export class Session {
  id : number;
  static number = 0;
  nom : string;
  date : Date;
  jeu : Game;
  joueur : string[];
  isActive : boolean;

  constructor(nom : string, date : Date, jeu : Game, isActive : boolean) {
    this.id = Session.number++;
    this.nom = nom;
    this.date = date;
    this.jeu = jeu;
    this.isActive = isActive;
    this.joueur = [];
  }

}
