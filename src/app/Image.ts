export class Image {
  id : number;
  static number = 0;
  nom: string;
  src : string;
  id_crea : number;
  constructor(nom: string,id:number,id_crea:number) {
    this.id = id;
    this.nom = nom.split('.')[0][0].toUpperCase() + nom.split('.')[0].slice(1);
    this.src ='http://92.154.61.105:8080/~nacer/vue_image.php?id_image='+this.id.toString();
    Image.number++;
    this.id_crea=id_crea;
  }

  getNom(): string { return this.nom };
  getSrc(): string { return this.src };
  change_nom(img:Image[],x:string,val:number) {
    img[val].nom=x;

  }
  
}
