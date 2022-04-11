import { Image } from './Image'

export class Recopier {
  id : number;
  static nb : number = 0;

  images : Image[];
  bg_color : string;
  text_color : string;
  title_color : string;

  typeEcriture : string;

  constructor(images : Image[], bg_color : string, title_color : string, text_color : string, typeEcriture : string) {
    this.id = Recopier.nb++;
    this.images = images;
    this.bg_color = bg_color;
    this.text_color = text_color;
    this.title_color = title_color;
    this.typeEcriture = typeEcriture;
  }

}
