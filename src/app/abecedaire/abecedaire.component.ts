import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../Image';
import { Progress } from '../Progress';
import { Abecedaire } from './Abecedaire';

@Component({
  selector: 'app-abecedaire',
  templateUrl: './abecedaire.component.html',
  styleUrls: ['./abecedaire.component.css']
})
export class AbecedaireComponent implements OnInit {

  @Input() game: Abecedaire | null;
  @Input() showTitle: boolean = true;

  rightLetter = '';
  errors = 0;
  images: Image[] = [
    new Image("Orange", "../../assets/orange.jpg"),
    new Image("Voiture", "../../assets/voiture.png"),
  ];
  nbEntries = 0;
  sound = true;
  afficherMot = "cursif";
  finish = false;

  constructor() {
    this.game = new Abecedaire(this.images, '#3bb8c9', 'white', 'blue', 'red', Progress.Blue, 'orange', 'black', true, "cursif");
    // this.game = null;
  }

  // Initialisation
  ngOnInit(): void {
    if(this.game!.images.length != 0) {
      this.rightLetter = this.game!.images[this.nbEntries].getNom()[0].toUpperCase();
      this.afficherMot = this.game!.typeEcriture;
      this.sound = this.game!.isVocaliser;
    }
  }

  nextImage() {
    if(this.nbEntries == this.game!.images.length) {
      var buttons = document.getElementsByClassName("button");
      for(var i = 0; i < buttons.length; i++) {
        (buttons.item(i) as HTMLButtonElement).style.backgroundColor = this.game!.button_bg_color;
      }
      this.finish = true;
    }
    else {
      this.rightLetter = this.game!.images[this.nbEntries].getNom()[0].toUpperCase();
      this.resetButton();
    }
  }

  addImage(mot: string, image: string) {
    this.game!.images.push(new Image(mot, image));
  }

  errorsPlus(): void {
    this.errors++;
  }

  resetErrors(): void {
    this.errors = 0;
  }

  // Logique du jeu
  click($event: MouseEvent,letter:string): void {
    ($event.target as HTMLButtonElement).disabled = true;
    if(letter == this.rightLetter) {
      ($event.target as HTMLButtonElement).style.backgroundColor = this.game!.good_answer_color;
      var buttons = document.getElementsByClassName("button");
      for(var i = 0; i < buttons.length; i++) {
        (buttons.item(i) as HTMLButtonElement).disabled = true;
      }
      setTimeout(() => {
        this.nbEntries++;
        document.getElementById('progressbar')!.style.width = ((this.nbEntries / (this.game!.images.length)) * 100).toString() + '%';
        this.nextImage();
      }, 1000);
    }
    else {
      this.errorsPlus();
      ($event.target as HTMLButtonElement).style.backgroundColor = this.game!.wrong_answer_color;
    }
  }

  resetButton() {
    var buttons = document.getElementsByClassName("button");
    for(var i = 0; i < buttons.length; i++) {
      (buttons.item(i) as HTMLButtonElement).style.backgroundColor = this.game!.button_bg_color;
      (buttons.item(i) as HTMLButtonElement).disabled = false;
    }
  }

}
