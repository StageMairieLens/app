import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Reconnaitre } from './Reconnaitre'
import { Progress } from '../Progress'
import { Image } from '../Image'
import { MatButton } from '@angular/material/button';

interface Erreur{
  src : string;
  erreur : number;
}

@Component({
  selector: 'app-reconnaitre',
  templateUrl: './reconnaitre.component.html',
  styleUrls: ['./reconnaitre.component.css']
})
export class ReconnaitreComponent implements OnInit {

  constructor() {
    // this.r = null;
    this.r = new Reconnaitre(this.images, 'blue', 'white', 'black', 'green', 'red', Progress.Red, 'lightblue', 'white', 'CAPITAL',false);
    this.alea(this.r!.images);
    this.alea2(this.liste_mot_boutton);
  }
  ngOnInit(): void {
    //Zthis.alea(this.liste_images);
    // console.log(this.liste_images);
    //this.variable = this.r!.images[this.prochaine_image].src;
    this.alea(this.r!.images);
    //this.alea2(this.liste_mot_boutton);


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
    //new Image('Chien', '../../assets/chien.jpeg'),
    //new Image('Elephant', '../../assets/elephant.jpg'),
    //new Image('Voiture', '../../assets/voiture.png')
  ];
  erreur_image : Erreur[]=[];
  //liste_images = [];
  prochaine_image = 0;
  taille_to = 0;
  //Variable qui contient l'image a trouver
  //liste_mot: string[] = []; //Liste qui contient les noms des images
  liste_mot_boutton: string[] = [];
  compteur = 0; //Compte le nombre d'erreur
  compteur_image = 0; //Compte erreur par image
  //variable: string = this.r!.images[this.prochaine_image].nom;

  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
  alea(li: Image[]): void {

    var m = li.length, name, src, i;

    // While there remain elements to shuffle
    while (this.taille_to) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      name = li[m].nom;
      src = li[m].src;
      li[m].nom = li[i].nom;
      li[m].src = li[i].src;
      li[i].nom = name;
      li[i].src = src;


    }
  }
  alea2(li: string[]): void {
    for (var taile = 0; this.r!.images[taile]; taile++) {
      li.push(this.r!.images[taile].nom);
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
    if (varia == this.r!.images[this.prochaine_image].nom) { //Si reponse trouver alert un message et bloque tous les bouttons
      this.clicked = false;
      document.getElementById('result')!.innerHTML = '<p style="color : green">C\'est le bon mot</p>';
      this.erreur_image.push({src:this.r!.images[this.prochaine_image].src,erreur:this.compteur_image});
      

      this.compteur_image=0;
      console.log(this.erreur_image);

      setTimeout(() => {
        //this.variable = this.r!.images[this.prochaine_image].nom;
        document.getElementById('container')!.animate([{ opacity: 1 },
        { opacity: 0.1, offset: 0.7 },
        { opacity: 1 }],

          800);
      }, 1000);
      setTimeout(() => {
        this.prochaine_image += 1;

      }, 1600);
      setTimeout(() => {
        document.getElementById('result')!.innerHTML = '';
        document.getElementById('progressbar')!.style.width = ((this.prochaine_image / this.r!.images.length) * 100).toString() + '%';

      },
        1600);
      if (this.prochaine_image < this.r!.images.length) {
        setTimeout(() => {
          for (var i = 0; i < this.r!.liste_button.length; i++) {
            document.getElementById(this.r!.images[i].nom)!.classList.remove("disabled")
            document.getElementById(this.r!.images[i].nom)!.style.backgroundColor = this.r!.button_bg_color;
            document.getElementById(this.r!.images[i].nom)!.style.border = '';
            document.getElementById(this.r!.images[i].nom)!.style.color = this.r!.button_text_color;


          }
        }, 1600);


        //($event.target as HTMLButtonElement).disabled = false;
      }
      else {
        this.clicked = true;
      }
      return true;
    }
    else { //Transforme le boutton et le désactive et incrémente le nombre d'erreurs
      if (!document.getElementById(varia)!.classList.contains('disabled')) {
        document.getElementById(varia)!.style.backgroundColor = "red";
        document.getElementById(varia)!.style.border = '1px solid #999999';
        document.getElementById(varia)!.style.color = '#999999';
        document.getElementById(varia)!.classList.add('disabled');
        this.compteur += 1;
        this.compteur_image +=1;

        document.getElementById('result')!.innerHTML = '<p style="color : red">Ce n\'est pas le bon mot</p>';

        document.getElementById('container')?.animate([
          { transform: 'translateX(0px)' },
          { transform: 'translateX(-50px)' },
          { transform: 'translateX(50px)' }
        ], { duration: 200 }
        );
      }
      return false;
    }

  }




}
