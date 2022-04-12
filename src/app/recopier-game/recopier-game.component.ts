import { Component, OnInit, ViewChild } from '@angular/core';
import { Image } from '../Image'
import { Recopier } from './Recopier'
import { Progress } from '../Progress'

@Component({
  selector: 'app-recopier-game',
  templateUrl: './recopier-game.component.html',
  styleUrls: ['./recopier-game.component.css']
})
export class RecopierGameComponent implements OnInit {

  constructor() {
    this.r = new Recopier(this.images, '#3bb8c9', 'red', 'black', 'green', 'red', Progress.Red, 'blue', 'white', 'white', 'black', this.typeEcriture);
    // this.r = null;
  }

  image: Image[] = [];
  showImageCpt: number = 0;
  typeEcriture: string = "CAPITAL"; // default
  r: Recopier | null;

  images: Image[] = [
    new Image('Fleur', '../../assets/fleur.jpg'),
    new Image('Lion', '../../assets/lion.jpg'),
    new Image('Chat', '../../assets/chat.jpg'),
    new Image('Chien', '../../assets/chien.jpeg'),
    new Image('Elephant', '../../assets/elephant.jpg'),
    new Image('Voiture', '../../assets/voiture.png')
  ];


  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

  enterKey($event: KeyboardEvent): void {
    if ($event.key == 'Enter') {
      this.sendAnswer((<HTMLInputElement>$event.target).value, this.r!.images[this.showImageCpt]);
    }
  }

  ngOnInit(): void {

  }


  changeTypeEcritureToCapital(): void {
    if (this.typeEcriture != 'CAPITAL') {
      this.typeEcriture == 'CAPITAL';
    }
  }
  changeTypeEcritureToCursif(): void {
    if (this.typeEcriture != 'CURSIF') {
      this.typeEcriture == 'CURSIF';
    }
  }
  changeTypeEcritureToScript(): void {
    if (this.typeEcriture != 'SCRIPT') {
      this.typeEcriture == 'SCRIPT';
    }
  }

  sendAnswer(text: string, img: Image): void {
    if (text.toUpperCase() === img.getNom().toUpperCase()) {
      document.getElementById('result')!.innerHTML = '<p style="color :' + this.r!.good_answer_color + '">C\'est le bon mot</p>';

      setTimeout(() => {
        document.getElementById('card')!.animate([{ opacity: 1 },
        { opacity: 0.1, offset: 0.7 },
        { opacity: 1 }],
          800);
      }, 1000);

      setTimeout(() => {
        this.showImageCpt++;
        document.getElementById('result')!.innerHTML = '';
        (<HTMLInputElement>document.getElementById('input_recopier')).value = '';
        document.getElementById('progressbar')!.style.width = ((this.showImageCpt / this.r!.images.length) * 100).toString() + '%';

      },
        1600);
    } else {
      document.getElementById('result')!.innerHTML = '<p style="color :' + this.r!.wrong_answer_color + '">Ce n\'est pas le bon mot</p>';
      document.getElementById('card')?.animate([
        { transform: 'translateX(0px)' },
        { transform: 'translateX(-50px)' },
        { transform: 'translateX(50px)' }
      ], { duration: 200 }
      );
    }

  }


}
