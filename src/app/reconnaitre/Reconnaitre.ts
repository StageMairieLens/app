import { Progress } from '../Progress'
import { Image } from '../Image'
import { text } from 'express';

export class Reconnaitre {
  id: number;
  static nb: number = 0;
  liste_images: Image[];
  bg_color: string;
  title_color: string;

  good_answer_color: string;
  wrong_answer_color: string;

  button_bg_color: string;
  button_text_color: string;

  text_color : string;

  color_progress_bar: Progress;

  typeEcriture: string;

  constructor(liste_images: Image[],bg_color: string, title_color: string, text_color: string, good_answer_color: string, wrong_answer_color: string, color_progress_bar: Progress, button_bg_color: string, button_text_color: string, input_bg_color: string, input_text_color: string, typeEcriture: string) {
    this.id = Reconnaitre.nb++;
    this.liste_images = liste_images;
    this.bg_color = bg_color;
    this.title_color = title_color;
    this.good_answer_color = good_answer_color;
    this.wrong_answer_color = wrong_answer_color;
    this.color_progress_bar = color_progress_bar;
    this.button_bg_color = button_bg_color;
    this.button_text_color = button_text_color;
    this.text_color = text_color;
    this.typeEcriture = typeEcriture;
  }
  

}