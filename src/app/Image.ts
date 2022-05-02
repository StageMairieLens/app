export class Image {
  id : number;
  static number = 0;
  nom: string;
  src : string;

  constructor(nom: string, src : string) {
    this.id = Image.number;
    this.nom = nom;
    this.src = src;
    Image.number++;
  }

  getNom(): string { return this.nom };
  getSrc(): string { return this.src };
  change_nom(img:Image[],x:string,val:number) {
    img[val].nom=x;

  }
}
