import { Image } from '../Image'


export class Puzzle {
  id: number;
  static nb: number = 0;
  liste_images: any = [];
  bg_color: string;
  title_color: string;

  button_bg_color: string;
  button_text_color: string;

  text_color : string;
 
  typeEcriture: string;
  decoupe : number;
  constructor(liste_images: any,bg_color: string, title_color: string, text_color: string, button_bg_color: string, button_text_color: string, typeEcriture: string,decoupe:number) {
    this.id = Puzzle.nb++;
    this.liste_images = liste_images;
    this.bg_color = bg_color;
    this.title_color = title_color;
    
    this.button_bg_color = button_bg_color;
    this.button_text_color = button_text_color;
    this.text_color = text_color;
    this.typeEcriture = typeEcriture;
    this.decoupe=decoupe;
  }
  

}