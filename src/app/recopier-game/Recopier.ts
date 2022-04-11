import { Image } from './Image'
import { Progress } from './Progress'

export class Recopier {
  id : number;
  static nb : number = 0;

  images : Image[];
  bg_color : string;
  text_color : string;
  title_color : string;

  good_answer_color : string;
  wrong_answer_color : string;

  color_progress_bar : Progress;

  typeEcriture : string;

  constructor(images : Image[], bg_color : string, title_color : string, text_color : string,good_answer_color : string, wrong_answer_color : string,color_progress_bar : Progress, typeEcriture : string) {
    this.id = Recopier.nb++;
    this.images = images;
    this.bg_color = bg_color;
    this.text_color = text_color;
    this.title_color = title_color;
    this.good_answer_color = good_answer_color;
    this.wrong_answer_color = wrong_answer_color;
    this.color_progress_bar = color_progress_bar;
    this.typeEcriture = typeEcriture;
  }

}
