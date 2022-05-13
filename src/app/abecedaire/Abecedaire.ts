import { Image } from '../Image'
import { Progress } from '../Progress'

export class Abecedaire {
    id: number;
    static nb: number = 0;

    images: Image[];
    date : string;
    bg_color: string;
    text_color: string;

    good_answer_color: string;
    wrong_answer_color: string;

    button_bg_color: string;
    button_text_color: string;

    isVocaliser: boolean;

    color_progress_bar: Progress;

    typeEcriture: string;
    id_crea:number;
    constructor(id : number , date : string,images: Image[], bg_color: string, text_color: string, good_answer_color: string, wrong_answer_color: string, color_progress_bar: Progress, button_bg_color: string, button_text_color: string, isVocaliser: boolean, typeEcriture: string,id_crea:number) {
      this.id = id;
      this.images = images;
      this.date = date;
      this.bg_color = bg_color;
      this.text_color = text_color;
      this.good_answer_color = good_answer_color;
      this.wrong_answer_color = wrong_answer_color;
      this.color_progress_bar = color_progress_bar;
      this.button_bg_color = button_bg_color;
      this.button_text_color = button_text_color;
      this.isVocaliser = isVocaliser;
      this.typeEcriture = typeEcriture;
      this.id_crea=id_crea;
    }

  }
