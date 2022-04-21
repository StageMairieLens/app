export class BoyGirl {
  id : number;
  static nb : number = 0;

  listMotsFille : string[] = [];
  listMotsGarcon : string[] = [];
  date : Date;

  bg_color_fille : string;
  bg_color_garcon: string;
  bg_color_mot: string;

  bg_color_container : string;

  word_color_fille : string;
  word_color_garcon : string;
  word_color_mot : string;

  title_color_fille : string;
  text_color_fille : string;

  title_color_garcon : string;
  text_color_garcon : string;

  title_color_mot : string;
  text_color_mot : string;

  type_ecriture : string;

  constructor(listMotsFille : string[], listMotsGarcon : string[],bg_color_container : string,bg_color_fille : string,bg_color_garcon : string,bg_color_mot : string, word_color_fille : string, word_color_garcon : string, word_color_mot : string,title_color_fille : string,title_color_garcon : string,title_color_mot : string,text_color_fille : string,text_color_garcon : string,text_color_mot : string,type_ecriture : string) {
    this.id = BoyGirl.nb++;
    this.date = new Date();
    this.listMotsFille = listMotsFille;
    this.listMotsGarcon = listMotsGarcon;
    this.bg_color_container = bg_color_container;
    this.bg_color_fille = bg_color_fille;
    this.bg_color_garcon = bg_color_garcon;
    this.bg_color_mot = bg_color_mot;
    this.word_color_fille = word_color_fille;
    this.word_color_garcon = word_color_garcon;
    this.word_color_mot = word_color_mot;
    this.title_color_fille = title_color_fille;
    this.text_color_fille = text_color_fille;
    this.title_color_garcon = title_color_garcon;
    this.text_color_garcon = text_color_garcon;
    this.title_color_mot = title_color_mot;
    this.text_color_mot = text_color_mot;
    this.type_ecriture = type_ecriture;
  }
}
