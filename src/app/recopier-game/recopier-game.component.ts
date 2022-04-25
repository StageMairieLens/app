import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Image } from '../Image'
import { Recopier } from './Recopier'
import { Progress } from '../Progress'
import { ImagesComponent } from '../images/images.component'
import { Router } from '@angular/router';
import { SessionsComponent } from '../sessions/sessions.component'

@Component({
  selector: 'app-recopier-game',
  templateUrl: './recopier-game.component.html',
  styleUrls: ['./recopier-game.component.css']
})
export class RecopierGameComponent implements OnInit {

  constructor(private router: Router) {
    // this.r = new Recopier(this.images, '#3bb8c9', 'red', 'black', 'green', 'red', Progress.Red, 'blue', 'white', 'white', 'black', this.typeEcriture, false);
    // this.r = null;
    this.r = this.recopier_list[0];
  }


  liste_image: Image[] = ImagesComponent.list_image;
  selectedImages: Image[] = [];
  image: Image[] = [];
  showImageCpt: number = 0;
  typeEcriture: string = "CAPITAL"; // default
  waitToSend: boolean = false;
  @Input() r: Recopier | null;
  @Input() showTitle: boolean = true;
  @Input() play: boolean = true;
  @Input() showList: boolean = false;
  @Input() create_game: boolean = false;
  @Input() edit: boolean = false;


  // VARIABLE JEU RECOPIER
  recopier_bg_color: string = "#3bb8c9";
  recopier_text_color: string = "#000000";
  recopier_title_color: string = "#ffffff";
  recopier_good_answer_color: string = "#0dff00";
  recopier_wrong_answer_color: string = "#ff0000";
  recopier_button_bg_color: string = "#0f73b1";
  recopier_button_text_color: string = "#ffffff";
  recopier_input_bg_color: string = "#ffffff";
  recopier_input_text_color: string = "#000000";
  recopier_progress: Progress = Progress.Blue;
  recopier_type_ecriture = "CURSIF";
  recopier_isVocaliser: boolean = false;
  recopier_previsualiser: boolean = false;
  recopier_list: Recopier[] = SessionsComponent.recopier_list;

  formStep: number = 0;



  images: Image[] = [
    new Image('Fleur', '../../assets/fleur.jpg'),
    new Image('Lion', '../../assets/lion.jpg'),
    new Image('Chat', '../../assets/chat.jpg'),
    new Image('Chien', '../../assets/chien.jpeg'),
    new Image('Elephant', '../../assets/elephant.jpg'),
    new Image('Voiture', '../../assets/voiture.png')
  ];

  progressValue: Progress[] = [
    Progress.Blue,
    Progress.Green,
    Progress.LightBlue,
    Progress.Orange,
    Progress.Red
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
    if (this.edit) {
      this.create_game = true;
      this.selectedImages = this.r!.images;
      this.recopier_bg_color = this.r!.bg_color;
      this.recopier_text_color = this.r!.text_color;
      this.recopier_title_color = this.r!.title_color;
      this.recopier_good_answer_color = this.r!.good_answer_color;
      this.recopier_wrong_answer_color = this.r!.wrong_answer_color;
      this.recopier_button_bg_color = this.r!.button_bg_color;
      this.recopier_button_text_color = this.r!.button_text_color;
      this.recopier_input_bg_color = this.r!.input_bg_color;
      this.recopier_input_text_color = this.r!.input_text_color;
      this.recopier_progress = this.r!.color_progress_bar;
      this.recopier_type_ecriture = this.r!.typeEcriture;
      this.recopier_isVocaliser = this.r!.isVocaliser;
    }
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
    if (!this.waitToSend) {
      this.waitToSend = true;

      if (this.r!.typeEcriture == 'CAPITAL') {
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
            this.waitToSend = false;

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
          this.waitToSend = false;

        }
      } else {
        if (text === img.getNom()) {
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
            this.waitToSend = false;

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
          this.waitToSend = false;

        }
      }

    }

  }


  parseDate(date: Date): string {
    let month: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let index: number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  }


  setPrevisualiserRecopier(prev: boolean): void {
    if (prev == true) {
      this.r = new Recopier(this.selectedImages, this.recopier_bg_color, this.recopier_title_color, this.recopier_text_color, this.recopier_good_answer_color, this.recopier_wrong_answer_color, this.recopier_progress, this.recopier_button_bg_color, this.recopier_button_text_color, this.recopier_input_bg_color, this.recopier_input_text_color, this.recopier_type_ecriture, this.recopier_isVocaliser);
      this.recopier_previsualiser = true;
    }
    else {
      this.r = null;
      this.recopier_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
        this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      }, 0);
    }
  }

  previewRecopier(r: Recopier): void {
    this.r = r;
    this.recopier_previsualiser = true;
  }

  quitPreviewRecopier(): void {
    this.recopier_previsualiser = false;
  }

  deleteGameRecopier(r: Recopier): void {
    let index = this.recopier_list.indexOf(r, 0);

    if (index > -1) {
      this.recopier_list.splice(index, 1);
    }
  }

  redirectEditRecopier(r: Recopier): void {
    window.location.href = '/panel/Recopier/edit/' + r.id;
  }



  nextStep(): void {
    let step = this.formStep;
    if (this.formStep < 2) {
      step++;
      this.setFormStep(step);
    }
  }

  previousStep(): void {
    let step = this.formStep;
    if (this.formStep > 0) {
      step--;
      this.setFormStep(step);
    }
  }

  setActive(element: Element | null): void {
    (<HTMLButtonElement>element!).style.background = 'white';
    (<HTMLButtonElement>element!).style.color = 'black';
  }

  setInactive(element: Element | null) {
    (<HTMLButtonElement>element!).style.background = '';
    (<HTMLButtonElement>element!).style.color = 'white';
  }

  setFormStep(step: number): void {
    this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
    this.formStep = step;
    this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(step)!.children.item(0));

  }

  changeProgressValue(jeu: string, element: HTMLSelectElement): void {

    switch (element.value) {
      case 'blue':
        this.recopier_progress = Progress.Blue;
        break;
      case 'green':
        this.recopier_progress = Progress.Green;
        break;
      case 'lightblue':
        this.recopier_progress = Progress.LightBlue;
        break;
      case 'orange':
        this.recopier_progress = Progress.Orange;
        break;
      case 'red':
        this.recopier_progress = Progress.Red;
        break;
    }
  }

  addImage(img: Image): void {
    if (this.selectedImages.indexOf(img) == -1) {
      this.selectedImages.push(img);
    }
  }

  deleteImage(i: Image): void {
    let index = this.selectedImages.indexOf(i, 0);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    }
  }

  create(jeu: string): void {
    this.recopier_list.push(
      new Recopier(this.selectedImages, this.recopier_bg_color, this.recopier_title_color, this.recopier_text_color, this.recopier_good_answer_color, this.recopier_wrong_answer_color, this.recopier_progress, this.recopier_button_bg_color, this.recopier_button_text_color, this.recopier_input_bg_color, this.recopier_input_text_color, this.recopier_type_ecriture, this.recopier_isVocaliser)
    );
    this.router.navigate(['/panel/Recopier']);
  }


save(): void {
  this.r!.images = this.selectedImages;
  this.r!.bg_color = this.recopier_bg_color;
  this.r!.text_color = this.recopier_text_color;
  this.r!.title_color = this.recopier_title_color;
  this.r!.good_answer_color = this.recopier_good_answer_color;
  this.r!.wrong_answer_color = this.recopier_wrong_answer_color;
  this.r!.button_bg_color = this.recopier_button_bg_color;
  this.r!.button_text_color = this.recopier_button_text_color;
  this.r!.input_bg_color = this.recopier_input_bg_color;
  this.r!.input_text_color = this.recopier_input_text_color;
  this.r!.color_progress_bar = this.recopier_progress;
  this.r!.typeEcriture = this.recopier_type_ecriture;
  this.r!.isVocaliser = this.recopier_isVocaliser;
  this.router.navigate(['/panel/Recopier']);
}
}
