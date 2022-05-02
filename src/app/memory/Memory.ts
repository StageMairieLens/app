import { Image } from '../Image'
import { Progress } from '../Progress'

export class Memory {
  id: number;
  static nb: number = 0;
  date : string;

  images: Image[];
  derriere: Image | null;
  isVocaliser: boolean;

  tmpAffichage: string;

  nbTile: number;
  setting: string[];

  bg_color: string;
  text_color: string;

  good_answer_color: string;
  wrong_answer_color: string;

  color_progress_bar: Progress;

  constructor(id : number , date : string,images: Image[], derriere: Image | null, isVocaliser: boolean, nbTile: number, setting: string[], bg_color: string, text_color: string, good_answer_color: string, wrong_answer_color: string, color_progress_bar: Progress, tmpAffichage: string) {
    this.id = id;
    this.date = date;
    this.images = images;
    this.derriere = derriere;
    this.isVocaliser = isVocaliser;
    this.nbTile = nbTile;
    this.setting = setting;
    this.bg_color = bg_color;
    this.text_color = text_color;
    this.good_answer_color = good_answer_color;
    this.wrong_answer_color = wrong_answer_color;
    this.color_progress_bar = color_progress_bar;
    this.tmpAffichage = tmpAffichage;
  }

}
