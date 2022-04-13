import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Reconnaitre } from './Reconnaitre'
import { Progress } from '../Progress'
import { Image } from '../Image'


@Component({
  selector: 'app-reconnaitre',
  templateUrl: './reconnaitre.component.html',
  styleUrls: ['./reconnaitre.component.css']
})
export class ReconnaitreComponent implements OnInit {

  constructor() {
    // this.r = null;
    this.r = new Reconnaitre([new Image('Fleur', '../../assets/fleur.jpg')], 'blue', 'white', 'black', 'green', 'red', Progress.Red, 'lightblue', 'white', 'CAPITAL',this.taille_to);
    //this.alea(this.liste_images);
    //this.alea2(this.liste_mot_boutton);
  }
  ngOnInit(): void {
    //Zthis.alea(this.liste_images);
    // console.log(this.liste_images);
    this.variable = this.images[this.prochaine_image].src;
    this.alea(this.images);
    this.alea2(this.liste_mot_boutton);


  }
  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Reconnaitre | null;
  @Input() showTitle: boolean = true;
  clicked = false; //Le boutton n'est pas désactiver
  //liste_images : String[] = ["../../assets/lion.jpg","../../assets/chat.jpg","../../assets/chien.jpeg","../../assets/souris.jpg"];
  images: Image[] = [
    new Image('Fleur', '../../assets/fleur.jpg'),
    new Image('Lion', '../../assets/lion.jpg'),
    new Image('Chat', '../../assets/chat.jpg'),
    new Image('Chien', '../../assets/chien.jpeg'),
    new Image('Elephant', '../../assets/elephant.jpg'),
    new Image('Voiture', '../../assets/voiture.png')
  ];
  //liste_images = [];
  prochaine_image = 0;
  taille_to=0;
  //Variable qui contient l'image a trouver
  //liste_mot: string[] = []; //Liste qui contient les noms des images
  liste_mot_boutton: string[] = [];
  compteur = 0; //Compte le nombre d'erreur
  variable: string = this.images[this.prochaine_image].nom;

  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
  alea(li:Image[]): void {
    for (var taile = 0; this.images[taile]; taile++) {
      this.taille_to++;
    }
    var name,src, i;

    // While there remain elements to shuffle
    while (this.taille_to) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * this.taille_to--);

      // And swap it with the current element.
      name = li[this.taille_to].nom;
      src = li[this.taille_to].src;
      li[this.taille_to] = li[i];
      li[i].nom= name;
      li[i].src=src;
      
    
    }
  }
  alea2(li: string[]): void {
    for (var taile = 0; this.images[taile]; taile++) {
      li.push(this.images[taile].nom);
    }
    var m = this.taille_to, t, i, t2;

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

  change($event: any, varia: string): Boolean {
    //this.variable=this.liste_images[this.prochaine_image];
    if (varia == this.images[this.prochaine_image].nom) { //Si reponse trouver alert un message et bloque tous les bouttons
      this.clicked = false;
      this.prochaine_image += 1;
      document.getElementById('result')!.innerHTML = '<p style="color : green">C\'est le bon mot</p>';

      setTimeout(() => {
        this.variable = this.images[this.prochaine_image].nom;
        document.getElementById('container')!.animate([{ opacity: 1 },
        { opacity: 0.1, offset: 0.7 },
        { opacity: 1 }],

          800);
      }, 1000);
      setTimeout(() => {
        document.getElementById('result')!.innerHTML = '';
        document.getElementById('progressbar')!.style.width = ((this.prochaine_image / this.taille_to) * 100).toString() + '%';

      },
        1600);
      if (this.prochaine_image < this.taille_to) {
        for (var i=0;i<this.taille_to;i++) {
          (<HTMLButtonElement>document.getElementById(this.images[i].nom)).disabled = false;

        }


        //($event.target as HTMLButtonElement).disabled = false;
      }
      else {
        this.clicked = true;
      }
      return true;
    }
    else { //Transforme le boutton et le désactive et incrémente le nombre d'erreurs
      //document.getElementById(varia)!.style.backgroundColor="red";
      ($event.target as HTMLButtonElement).disabled = true;
      this.compteur += 1;

      document.getElementById('result')!.innerHTML = '<p style="color : red">Ce n\'est pas le bon mot</p>';
      document.getElementById('container2')?.animate([
        { transform: 'translateX(0px)' },
        { transform: 'translateX(-50px)' },
        { transform: 'translateX(50px)' }
      ], { duration: 200 }
      );
      return false;
    }

  }




}
