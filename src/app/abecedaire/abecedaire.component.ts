import { Component, OnInit, Input } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-abecedaire',
  templateUrl: './abecedaire.component.html',
  styleUrls: ['./abecedaire.component.css']
})
export class AbecedaireComponent implements OnInit {

  rightLetter = '';
  errors = 0;
  image = "";
  mot = "";
  map = new Map();
  entries = this.map.entries();
  nbEntries = 0;
  sound = true;
  afficherMot = "cursif";

  constructor() { }

  ngOnInit(): void {
    this.map.set("Orange", "../../assets/orange.jpg");
    this.map.set("Voiture", "../../assets/voiture.png");
    let entry = this.entries.next().value;
    this.image = entry[1];
    this.mot = entry[0];
    this.rightLetter = entry[0][0].toUpperCase();
  }

  nextImage() {
    if(this.nbEntries == this.map.size) {
      this.mot = "Félicitation!"
      var buttons = document.getElementsByClassName("button");
      for(var i = 0; i < buttons.length; i++) {
        (buttons.item(i) as HTMLButtonElement).className = "button";
      }
    }
    else {
      let entry = this.entries.next().value;
      this.image = entry[1];
      this.mot = entry[0];
      this.rightLetter = entry[0][0].toUpperCase();
      this.resetButton();
    }
  }

  addImage(mot: string, image: string) {
    this.map.set(mot, image);
  }

  errorsPlus(): void {
    this.errors++;
  }

  resetErrors(): void {
    this.errors = 0;
  }

  click($event: MouseEvent,letter:string): void {
    ($event.target as HTMLButtonElement).disabled = true;
    if(letter == this.rightLetter) {
      ($event.target as HTMLButtonElement).className += " right";
      var buttons = document.getElementsByClassName("button");
      for(var i = 0; i < buttons.length; i++) {
        (buttons.item(i) as HTMLButtonElement).disabled = true;
      }
      setTimeout(() => {
        this.nbEntries++;
        document.getElementById('progressbar')!.style.width = ((this.nbEntries / this.map.size) * 100).toString() + '%';
        this.nextImage();
      }, 1000);
    }
    else {
      this.errorsPlus();
      ($event.target as HTMLButtonElement).className += " wrong";
    }
  }

  resetButton() {
    var buttons = document.getElementsByClassName("button");
    for(var i = 0; i < buttons.length; i++) {
      (buttons.item(i) as HTMLButtonElement).className = "button";
      (buttons.item(i) as HTMLButtonElement).disabled = false;
    }
  }

}
