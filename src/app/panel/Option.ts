export class Option {
  nom : string;
  type : string;
  value : string[];

  constructor(nom : string, type : string, value : string[]) {
    this.nom = nom;
    this.type = type;
    this.value = value;
  }
}
