import { Image } from '../Image'
import { Progress } from '../Progress'

export class Recopier {
  id: number;
  static nb: number = 0;
  date : string;

  images: Image[];
  bg_color: string;
  text_color: string;
  title_color: string;

  good_answer_color: string;
  wrong_answer_color: string;

  button_bg_color: string;
  button_text_color: string;

  input_bg_color: string;
  input_text_color: string;

  color_progress_bar: Progress;

  typeEcriture: string;
  isVocaliser : boolean;
  id_crea:number;
  constructor(id : number, date : string, images: Image[], bg_color: string, title_color: string, text_color: string, good_answer_color: string, wrong_answer_color: string, color_progress_bar: Progress, button_bg_color: string, button_text_color: string, input_bg_color: string, input_text_color: string, typeEcriture: string, isVocaliser : boolean,id_crea:number) {
    this.id = id;
    this.date = date
    this.images = images;
    this.bg_color = bg_color;
    this.text_color = text_color;
    this.title_color = title_color;
    this.good_answer_color = good_answer_color;
    this.wrong_answer_color = wrong_answer_color;
    this.color_progress_bar = color_progress_bar;
    this.button_bg_color = button_bg_color;
    this.button_text_color = button_text_color;
    this.input_bg_color = input_bg_color;
    this.input_text_color = input_text_color;
    this.typeEcriture = typeEcriture;
    this.isVocaliser = isVocaliser;
    this.id_crea=id_crea;
  }

}
