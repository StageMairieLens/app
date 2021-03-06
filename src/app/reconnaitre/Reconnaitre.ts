import { Progress } from '../Progress'
import { Image } from '../Image'
import { text } from 'express';
//Permet de crée le jeu
export class Reconnaitre {
  //Toutes les variables du jeu Reconnaitre
  id: number;
  static nb: number = 0;
  images: Image[];
  date : string;
  bg_color: string;
  title_color: string;
  good_answer_color: string;
  wrong_answer_color: string;

  button_bg_color: string;
  button_text_color: string;

  text_color : string;

  color_progress_bar: Progress;
  liste_button:string[]=[];
  typeEcriture: string;
  isVocaliser : boolean;

  taille = 0;
  id_crea:number;
  liste:any=[];
  constructor(id : number, date : string, liste_images: Image[],bg_color: string, title_color: string, text_color: string, good_answer_color: string, wrong_answer_color: string, color_progress_bar: Progress, button_bg_color: string, button_text_color: string, typeEcriture: string, isVocaliser : boolean,id_crea:number) {
    this.id = id;
    this.images = liste_images;
    this.date = date;
    this.bg_color = bg_color;
    this.title_color = title_color;
    this.good_answer_color = good_answer_color;
    this.wrong_answer_color = wrong_answer_color;
    this.color_progress_bar = color_progress_bar;
    this.button_bg_color = button_bg_color;
    this.button_text_color = button_text_color;
    this.text_color = text_color;
    this.typeEcriture = typeEcriture;
    this.isVocaliser = isVocaliser;
   /*  this.alea(this.images);
    this.alea2(this.liste_button); */
    this.liste.push(this.images,this.bg_color,this.title_color,this.good_answer_color,this.wrong_answer_color,this.color_progress_bar,
    this.button_bg_color,this.button_text_color,this.text_color,this.typeEcriture,this.isVocaliser);
    this.id_crea=id_crea;

  }


  alea(li:Image[]){
    var m=li.length,name,src, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      name = li[m].nom;
      src = li[m].src;
      li[m].nom = li[i].nom;
      li[m].src=li[i].src;
      li[i].nom= name;
      li[i].src=src;


    }
  }

  alea2(li: string[]): void {
    for (var taile = 0; this.images[taile]; taile++) {
      li.push(this.images[taile].nom);
    }
    var m = this.images.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = li[m];
      li[m] = li[i];
      li[i] = t;
    }
  }


}
