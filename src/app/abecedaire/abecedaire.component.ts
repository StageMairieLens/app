import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../Image';
import { ImagesComponent } from '../images/images.component';
import { Progress } from '../Progress';
import { SessionsComponent } from '../sessions/sessions.component';
import { Abecedaire } from './Abecedaire';

@Component({
  selector: 'app-abecedaire',
  templateUrl: './abecedaire.component.html',
  styleUrls: ['./abecedaire.component.css']
})
export class AbecedaireComponent implements OnInit {

  @Input() game: Abecedaire | null;
  @Input() showTitle: boolean = true;
  @Input() play: boolean = true;
  @Input() showList: boolean = false;
  @Input() create_game: boolean = false;
  @Input() edit: boolean = false;


  liste_image: Image[] = ImagesComponent.list_image;
  selectedImages: Image[] = [];
  progressValue: Progress[] = [
    Progress.Blue,
    Progress.Green,
    Progress.LightBlue,
    Progress.Orange,
    Progress.Red
  ];
  formStep: number = 0;


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

  abecedaire_list : Abecedaire[] = SessionsComponent.abecedaire_list;
  abecedaire_bg_color: string = "#3bb8c9";
  abecedaire_text_color: string = "#ffffff";
  abecedaire_good_answer_color: string = "#3498db";
  abecedaire_wrong_answer_color: string = "#e74c3c";
  abecedaire_progress: Progress = Progress.Blue;
  abecedaire_button_bg_color: string = "#f39c12";
  abecedaire_button_text_color: string = "#ffffff";
  abecedaire_type_ecriture: string = "script";
  abecedaire_isVocaliser: boolean = false;
  abecedaire_previsualiser: boolean = false;

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

  previewAbecedaire(a: Abecedaire): void {
    this.game = a;
    this.abecedaire_previsualiser = true;
  }

  quitPreviewAbecedaire(): void {
    this.abecedaire_previsualiser = false;
  }

  deleteGameAbecedaire(a: Abecedaire): void {
    let index = this.abecedaire_list.indexOf(a, 0);

    if (index > -1) {
      this.abecedaire_list.splice(index, 1);
    }
  }

  parseDate(date: Date): string {
    let month: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let index: number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  }

  redirectEditAbecedaire(a: Abecedaire): void {
    window.location.href = '/panel/Abecedaire/edit/' + a.id;
  }

  setPrevisualiserAbecedaire(prev: boolean): void {
    if (prev == true) {
      this.game = new Abecedaire(this.selectedImages, this.abecedaire_bg_color, this.abecedaire_text_color, this.abecedaire_good_answer_color, this.abecedaire_wrong_answer_color, this.abecedaire_progress, this.abecedaire_button_bg_color, this.abecedaire_button_text_color, this.abecedaire_isVocaliser, this.abecedaire_type_ecriture);
      this.abecedaire_previsualiser = true;
    }
    else {
      this.game = null;
      this.abecedaire_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
        this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      }, 0);
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

  setFormStep(step: number): void {
    this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
    this.formStep = step;
    this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(step)!.children.item(0));

  }
}
