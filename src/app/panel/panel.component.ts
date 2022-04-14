import { Component, OnInit } from '@angular/core';
import { Game } from './Game'
import { Option } from './Option'
import { Progress } from '../Progress'
import { Image } from '../Image'
import { Recopier } from './../recopier-game/Recopier'
import { Router } from '@angular/router';
import { ImagesComponent } from '../images/images.component';
import { Reconnaitre } from '../reconnaitre/Reconnaitre';
import { Puzzle } from '../puzzle/Puzzle';
import { ActivatedRoute } from '@angular/router'
import {BoyGirl } from '../boy-girl-game/BoygGirl'
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Abecedaire } from '../abecedaire/Abecedaire';


export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  jeu : string | null = "";

  constructor(private router: Router, private route : ActivatedRoute ) {
    // this.recopier = new Recopier(this.selectedImages, this.recopier_bg_color, this.recopier_title_color, this.recopier_text_color, this.recopier_good_answer_color, this.recopier_wrong_answer_color, this.recopier_progress, this.recopier_button_bg_color, this.recopier_button_text_color, this.recopier_input_bg_color, this.recopier_input_text_color, this.recopier_type_ecriture);
    this.recopier = null;
    this.reconnaitre = null;
    this.puzzle = null;
    this.boygirl = null;
    this.abecedaire = null;
  }

  liste_image: Image[] = ImagesComponent.list_image;
  selectedImages: Image[] = [];

  progressValue: Progress[] = [
    Progress.Blue,
    Progress.Green,
    Progress.LightBlue,
    Progress.Orange,
    Progress.Red
  ];

  previsualiser: boolean = false;

  optionGame: string[] = ['Recopier', 'Memory', 'Reconnaitre', 'Abecedaire', 'Fille&Garçon', 'Puzzle'];
  selectedGame: string | null = "";


  // VARIABLE JEU RECOPIER
  recopier: Recopier | null;
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
  recopier_isVocaliser : boolean = false;
  recopier_previsualiser : boolean = false;


  // VARIABLE JEU RECONNAITRE
  reconnaitre: Reconnaitre | null;
  reconnaitre_bg_color: string = "#3bb8c9";
  reconnaitre_title_color: string = "#ffffff";
  reconnaitre_text_color: string = "#000000";
  reconnaitre_good_answer_color: string = "#0dff00";
  reconnaitre_wrong_answer_color: string = "#ff0000";
  reconnaitre_button_bg_color: string = "#0f73b1";
  reconnaitre_button_text_color: string = "#ffffff";
  reconnaitre_progress: Progress = Progress.Blue;
  reconnaitre_type_ecriture = "SCRIPT";
  reconnaitre_previsualiser : boolean = false;

  // VARIABLE JEU PUZZLE
  puzzle : Puzzle | null;
  puzzle_bg_color: string = "#3bb8c9";
  puzzle_title_color: string = "#ffffff";
  puzzle_button_bg_color: string = "#0f73b1";
  puzzle_button_text_color: string = "#ffffff";
  puzzle_type_ecriture = "SCRIPT";
  puzzle_text_color: string = "#000000";

  // VARIABLE JEU BOY&GIRL
  boygirl : BoyGirl | null;
  boygirl_listMotsFille : string[] = [];
  boygirl_listMotsGarcon : string[] = [];
  boygirl_bg_color_container : string = "#3bb8c9";
  boygirl_bg_color_fille : string = "#ffc0cb";
  boygirl_bg_color_garcon : string = "#add9e6";
  boygirl_bg_color_mot : string = "#fea500";
  boygirl_word_color_fille : string = "#000000"
  boygirl_word_color_garcon : string = "#000000"
  boygirl_word_color_mot : string = "#000000"
  boygirl_title_color_fille : string = "#000000";
  boygirl_title_color_garcon : string = "#000000";
  boygirl_title_color_mot : string = "#000000";
  boygirl_text_color_fille : string = "#ffffff";
  boygirl_text_color_garcon : string = "#ffffff";
  boygirl_text_color_mot : string = "#ffffff";
  boygirl_previsualiser : boolean = false;

  // VARIABLE JEU ABECEDAIRE
  abecedaire : Abecedaire | null;
  abecedaire_bg_color : string = "#3bb8c9";
  abecedaire_text_color : string = "#ffffff";
  abecedaire_good_answer_color : string = "#3498db";
  abecedaire_wrong_answer_color : string = "#e74c3c";
  abecedaire_progress : Progress = Progress.Blue;
  abecedaire_button_bg_color : string = "#f39c12";
  abecedaire_button_text_color : string = "#ffffff";
  abecedaire_type_ecriture : string = "script";
  abecedaire_isVocaliser : boolean = false;
  abecedaire_previsualiser : boolean = false;


  // ETAPE D'AVANCEMENT FORMULAIRE
  formStep: number = 0;
  // r1 : Recopier = new Recopier([],'red','CAPITAL');
  // r2 : Recopier = new Recopier([],'blue','CAPITAL');

  ngOnInit(): void {
    this.jeu = this.route.snapshot.paramMap.get('jeu');

    if(this.jeu != null) {
      if(this.optionGame.includes(this.jeu)) {
        this.selectedGame = this.jeu;
      }else {
        this.router.navigate(['/panel']);
      }

    }
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  addMotsFille(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.boygirl_listMotsFille.push(value);
    }

    event.chipInput!.clear();
  }

  removeFille(str: string): void {
    const index = this.boygirl_listMotsFille.indexOf(str);

    if (index >= 0) {
      this.boygirl_listMotsFille.splice(index, 1);
    }
  }

  addMotsGarcon(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.boygirl_listMotsGarcon.push(value);
    }

    event.chipInput!.clear();
  }

  removeGarcon(str: string): void {
    const index = this.boygirl_listMotsGarcon.indexOf(str);

    if (index >= 0) {
      this.boygirl_listMotsGarcon.splice(index, 1);
    }
  }


  setSelected(element: HTMLOptionElement): void {
    element.selected = true;
  }

  setPrevisualiserRecopier(prev: boolean): void {
    if (prev == true) {
      this.recopier = new Recopier(this.selectedImages, this.recopier_bg_color, this.recopier_title_color, this.recopier_text_color, this.recopier_good_answer_color, this.recopier_wrong_answer_color, this.recopier_progress, this.recopier_button_bg_color, this.recopier_button_text_color, this.recopier_input_bg_color, this.recopier_input_text_color, this.recopier_type_ecriture, this.recopier_isVocaliser);
      this.recopier_previsualiser = true;
    }
    else {
      this.recopier = null;
      this.recopier_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
      this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      },0);
    }
  }

  setPrevisualiserBoyGirl(prev: boolean): void {
    if (prev == true) {
      this.boygirl = new BoyGirl(this.boygirl_listMotsFille,this.boygirl_listMotsGarcon,this.boygirl_bg_color_container,this.boygirl_bg_color_fille,this.boygirl_bg_color_garcon,this.boygirl_bg_color_mot,this.boygirl_word_color_fille,this.boygirl_word_color_garcon,this.boygirl_word_color_mot,this.boygirl_title_color_fille,this.boygirl_title_color_garcon,this.boygirl_title_color_mot,this.boygirl_text_color_fille,this.boygirl_text_color_garcon,this.boygirl_text_color_mot);
      this.boygirl_previsualiser = true;
    }
    else {
      this.boygirl = null;
      this.boygirl_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
      this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      },0);
    }
  }

  setPrevisualiserReconnaitre(prev: boolean): void {
    if (prev == true) {
      this.reconnaitre = new Reconnaitre(this.selectedImages, this.reconnaitre_bg_color,this.reconnaitre_title_color,this.reconnaitre_text_color,this.reconnaitre_good_answer_color,this.reconnaitre_wrong_answer_color,this.reconnaitre_progress,this.reconnaitre_button_bg_color,this.reconnaitre_button_text_color,this.reconnaitre_type_ecriture);
      this.reconnaitre_previsualiser = true;
    }
    else {
      this.reconnaitre = null;
      this.reconnaitre_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
      this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      },0);
    }
  }

  setPrevisualiserAbecedaire(prev: boolean): void {
    if (prev == true) {
      this.abecedaire = new Abecedaire(this.selectedImages,this.abecedaire_bg_color, this.abecedaire_text_color, this.abecedaire_good_answer_color, this.abecedaire_wrong_answer_color, this.abecedaire_progress, this.abecedaire_button_bg_color, this.abecedaire_button_text_color, this.abecedaire_isVocaliser, this.abecedaire_type_ecriture);
      this.abecedaire_previsualiser = true;
    }
    else {
      this.abecedaire = null;
      this.abecedaire_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
      this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      },0);
    }
  }

  isActive(button : HTMLButtonElement) : boolean {
    if(document.getElementsByClassName('breadcrumb-item').item(this.formStep)!.children.item(0) == button) {
      return true;
    } else {
      return false;
    }
  }

  changeProgressValue(jeu : string, element: HTMLSelectElement): void {

    if(jeu == 'Recopier') {
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
    } else if (jeu == 'Reconnaitre') {
      switch (element.value) {
        case 'blue':
          this.reconnaitre_progress = Progress.Blue;
          break;
        case 'green':
          this.reconnaitre_progress = Progress.Green;
          break;
        case 'lightblue':
          this.reconnaitre_progress = Progress.LightBlue;
          break;
        case 'orange':
          this.reconnaitre_progress = Progress.Orange;
          break;
        case 'red':
          this.reconnaitre_progress = Progress.Red;
          break;
      }
    } else if (jeu == 'Abecedaire') {
      switch (element.value) {
        case 'blue':
          this.abecedaire_progress = Progress.Blue;
          break;
        case 'green':
          this.abecedaire_progress = Progress.Green;
          break;
        case 'lightblue':
          this.abecedaire_progress = Progress.LightBlue;
          break;
        case 'orange':
          this.abecedaire_progress = Progress.Orange;
          break;
        case 'red':
          this.abecedaire_progress = Progress.Red;
          break;
      }
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

  setFormStep(step: number): void {
    this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
    this.formStep = step;
    this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(step)!.children.item(0));

  }

  previousStep(): void {
    let step = this.formStep;
    if (this.formStep > 0) {
      step--;
      this.setFormStep(step);
    }
  }

  redirect(str: string): void {
    if (str == 'Accueil') {
      this.router.navigate(['/']);
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

  create() : void {

  }

}
