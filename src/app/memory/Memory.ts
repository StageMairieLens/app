import { Image } from '../Image'
import { Progress } from '../Progress'

export class Memory {
  id: number;
  static nb: number = 0;

  images: Image[];
  derriere: Image | null;

  nbTile: number;
  setting: string[];

  bg_color: string;
  text_color: string;

  good_answer_color: string;
  wrong_answer_color: string;

  color_progress_bar: Progress;
  
  constructor(images: Image[], derriere: Image | null, nbTile: number, setting: string[], bg_color: string, text_color: string, good_answer_color: string, wrong_answer_color: string, color_progress_bar: Progress) {
    this.id = Memory.nb++;
    this.images = images;
    this.derriere = derriere;
    this.nbTile = nbTile;
    this.setting = setting;
    this.bg_color = bg_color;
    this.text_color = text_color;
    this.good_answer_color = good_answer_color;
    this.wrong_answer_color = wrong_answer_color;
    this.color_progress_bar = color_progress_bar;
  }

}
