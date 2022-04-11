import { Option } from './Option';
import { Image } from '../recopier-game/Image';

export class Game {
  nom : string;
  options : Option[];
  date : Date;
  images : Image[];

  constructor(nom : string, options : Option[], images : Image[]) {
    this.nom = nom;
    this.options = options;
    this.date = new Date();
    this.images = images;
  }
}
