export class Image {
  nom: string;
  src : string;

  constructor(nom: string, src : string) {
    this.nom = nom;
    this.src = src;
  }

  getNom(): string { return this.nom };
  getSrc(): string { return this.src };
}
