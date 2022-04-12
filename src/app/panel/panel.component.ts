import { Component, OnInit } from '@angular/core';
import { Game } from './Game'
import { Option } from './Option'
import { Progress } from '../Progress'
import { Image } from '../Image'
import { Recopier } from './../recopier-game/Recopier'
import { Router } from '@angular/router';
import { ImagesComponent } from '../images/images.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(private router: Router) {
    // this.recopier = new Recopier(this.selectedImages, this.recopier_bg_color, this.recopier_title_color, this.recopier_text_color, this.recopier_good_answer_color, this.recopier_wrong_answer_color, this.recopier_progress, this.recopier_button_bg_color, this.recopier_button_text_color, this.recopier_input_bg_color, this.recopier_input_text_color, this.recopier_type_ecriture);
    this.recopier = null;
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

  optionGame: string[] = ['Recopier', 'Memory', 'Reconnaitre', 'Abécédaire', 'Fille&Garçon', 'Puzzle'];
  selectedGame: string = "";


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
  recopier_progress: Progress = Progress.Orange;
  recopier_type_ecriture = "CURSIF";

  formStep: number = 0;
  // r1 : Recopier = new Recopier([],'red','CAPITAL');
  // r2 : Recopier = new Recopier([],'blue','CAPITAL');


  ngOnInit(): void {
  }

  test(): void {
    console.log(this.recopier_progress);
  }

  setSelected(element: HTMLOptionElement): void {
    element.selected = true;
  }

  setPrevisualiser(prev: boolean): void {
    if (prev == true) {
      this.recopier = new Recopier(this.selectedImages, this.recopier_bg_color, this.recopier_title_color, this.recopier_text_color, this.recopier_good_answer_color, this.recopier_wrong_answer_color, this.recopier_progress, this.recopier_button_bg_color, this.recopier_button_text_color, this.recopier_input_bg_color, this.recopier_input_text_color, this.recopier_type_ecriture);
      this.previsualiser = true;
    }
    else {
      this.recopier = null;
      this.previsualiser = false;
      this.setFormStep(this.formStep);
    }
  }

  changeProgressValue(element: HTMLSelectElement): void {

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

  setActive(element: Element | null): void {
    element!.classList.remove('btn-outline-primary');
    element!.classList.add('btn-primary');
  }

  setInactive(element: Element | null) {
    element!.classList.remove('btn-primary');
    element!.classList.add('btn-outline-primary');
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

}
