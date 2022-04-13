import { Image } from '../Image'
import { Progress } from '../Progress'

export class Memory {
  id: number;
  static nb: number = 0;

  images: Image[];

  nbTile: number;
  setting: string[];

  bg_color: string;
  text_color: string;
  title_color: string;

  good_answer_color: string;
  wrong_answer_color: string;

  color_progress_bar: Progress;

  typeEcriture: string;

  constructor(images: Image[], nbTile: number, setting: string[], bg_color: string, text_color: string, title_color: string, good_answer_color: string, wrong_answer_color: string, color_progress_bar: Progress, typeEcriture: string) {
    this.id = Memory.nb++;
    this.images = images;
    this.nbTile = nbTile;
    this.setting = setting;
    this.bg_color = bg_color;
    this.text_color = text_color;
    this.title_color = title_color;
    this.good_answer_color = good_answer_color;
    this.wrong_answer_color = wrong_answer_color;
    this.color_progress_bar = color_progress_bar;
    this.typeEcriture = typeEcriture;
  }

}
