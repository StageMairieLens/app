import { Image } from './Image'

export class Recopier {
  id : number;
  static nb : number = 0;

  images : Image[];
  bg_color : string;
  typeEcriture : string;

  constructor(images : Image[], bg_color : string, typeEcriture : string) {
    this.id = Recopier.nb++;
    this.images = images;
    this.bg_color = bg_color;
    this.typeEcriture = typeEcriture;
  }

}
