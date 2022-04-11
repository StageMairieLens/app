import { Component, OnInit } from '@angular/core';
import { Game } from './Game'
import { Option} from './Option'
import { Image} from '../Image'
import { Recopier } from './../recopier-game/Recopier'
import { Router } from '@angular/router';
import { ImagesComponent } from '../images/images.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(private router : Router) { }

  liste_image : Image[] = ImagesComponent.list_image;
  selectedImages : Image[] = [];

  optionGame : string[] = ['Recopier','Memory','Reconnaitre','Abécédaire','Fille&Garçon','Puzzle'];
  selectedGame : string = "";

  formStep : number = 0;
  // r1 : Recopier = new Recopier([],'red','CAPITAL');
  // r2 : Recopier = new Recopier([],'blue','CAPITAL');


  ngOnInit(): void {
  }

  setActive(element : Element | null) : void {
    element!.classList.add('active');
  }

  setInactive(element : Element | null) {
    element!.classList.remove('active');
  }

  nextStep() : void {
    if(this.formStep < 2 ) {
      this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep));
      this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep++));
    }

  }

  previousStep() : void {
    if(this.formStep > 0 ) {
      this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep));
      this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep--));
    }
  }

  redirect(str : string): void {
    if(str == 'Accueil') {
      this.router.navigate(['/']);
    }
  }

  addImage(img : Image): void {
    if(this.selectedImages.indexOf(img) == -1) {
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
