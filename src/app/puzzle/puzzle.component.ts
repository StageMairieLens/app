import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Puzzle } from './Puzzle';
import { Image as ImageImport } from '../Image';
import { SessionsComponent } from '../sessions/sessions.component'
import { Progress } from '../Progress';
import { ImagesComponent } from '../images/images.component';
import { Router } from '@angular/router';


declare function restart(gridsize: number, imagess: any): any;
declare function rules(): any;
declare function lance(gridsize: number, imagess: any): any;
declare var images: any;


interface tuile {
  x: number;
  y: number;
}

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css'],

})

export class PuzzleComponent implements OnInit {


  constructor(private router: Router) {
    this.r = new Puzzle([this.liste_image[2], this.liste_image[1]], 'yellow', 'blue', 'black', 'green', 'red', 'SCRIPT', this.decoupe);
    // this.r = null;

  }


  liste_image: ImageImport[] = ImagesComponent.list_image;
  selectedImages: ImageImport[] = [];
  images = this.liste_image;


  ngOnInit(): void {

    this.decoupageImage();
    if (this.r != null && this.play && this.r!.liste_images.length != 0) {
      setTimeout(() => {
        lance(this.r!.decoupe, this.r!.liste_images);

      });
    }

    if (this.edit) {
      this.create_game = true;
      this.selectedImages = this.r!.liste_images;
      this.puzzle_title_color = this.r!.title_color;
      this.puzzle_bg_color = this.r!.bg_color;
      this.puzzle_button_bg_color = this.r!.button_bg_color;
      this.puzzle_button_text_color = this.r!.button_text_color;
      this.puzzle_type_ecriture = this.r!.typeEcriture;
      this.puzzle_text_color = this.r!.text_color;
      this.decoupe = this.r!.decoupe;
    }



  }

  puzzle_list: Puzzle[] = SessionsComponent.puzzle_list;
  puzzle_bg_color: string = "#3bb8c9";
  puzzle_title_color: string = "#ffffff";
  puzzle_button_bg_color: string = "#0f73b1";
  puzzle_button_text_color: string = "#ffffff";
  puzzle_type_ecriture = "SCRIPT";
  puzzle_text_color: string = "#000000";
  puzzle_previsualiser: boolean = false;
  decoupe: number = 2;
  formStep: number = 0;


  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Puzzle | null;
  @Input() showTitle: boolean = true;
  @Input() play: boolean = true;
  @Input() showList: boolean = false;
  @Input() create_game: boolean = false;
  @Input() edit: boolean = false;

  decoupage: tuile[] = [];

  decoupageImage(): void {
    let img = new Image();
    img.src = this.liste_image[0].src;
    for (let i = 0; i < this.decoupe * this.decoupe; i++) {
      this.decoupage.push(
        { x: ((100 / (this.decoupe - 1)) * (i % this.decoupe)), y: ((100 / (this.decoupe - 1)) * Math.floor(i / this.decoupe)) }
      )
    }
  }

  previewPuzzle(r: Puzzle): void {
    this.r = r;
    this.puzzle_previsualiser = true;
  }

  quitPreviewPuzzle(): void {
    this.puzzle_previsualiser = false;
  }

  deleteGamePuzzle(r: Puzzle): void {
    let index = this.puzzle_list.indexOf(r, 0);

    if (index > -1) {
      this.puzzle_list.splice(index, 1);
    }
  }


  liste_image_puzzle: any = [];
  imgPuzzle(li: ImageImport[]): any {
    for (var i = 0; i < li.length; i++) {
      this.liste_image_puzzle.push({ src: li[i].src, title: li[i].nom });
    }
    return this.liste_image_puzzle;
  }

  setPrevisualiserPuzzle(prev: boolean): void {
    if (prev == true) {
      this.puzzle_list = this.imgPuzzle(this.selectedImages);
      this.r = new Puzzle(this.liste_image_puzzle, this.puzzle_bg_color, this.puzzle_title_color, this.puzzle_text_color, this.puzzle_button_bg_color, this.puzzle_button_text_color, this.puzzle_type_ecriture, Number(this.decoupe));
      this.puzzle_previsualiser = true;
    }
    else {
      this.puzzle_previsualiser = false;
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

  save(): void {
    this.r!.liste_images = this.selectedImages;
    this.r!.bg_color = this.puzzle_bg_color;
    this.r!.title_color = this.puzzle_title_color;
    this.r!.text_color = this.puzzle_text_color;
    this.r!.button_bg_color = this.puzzle_button_bg_color;
    this.r!.button_text_color = this.puzzle_button_text_color;
    this.r!.typeEcriture = this.puzzle_type_ecriture;
    this.r!.decoupe = this.decoupe;
    this.router.navigate(['/panel/Puzzle']);
  }


  parseDate(date: Date): string {
    let month: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let index: number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  }

  redirectEditPuzzle(p: Puzzle): void {
    window.location.href = '/panel/Puzzle/edit/' + p.id;
  }

  create(): void {
    this.puzzle_list.push(
      new Puzzle(this.liste_image_puzzle, this.puzzle_bg_color, this.puzzle_title_color, this.puzzle_text_color, this.puzzle_button_bg_color, this.puzzle_button_text_color, this.puzzle_type_ecriture, Number(this.decoupe)));
    this.router.navigate(['/panel/Puzzle']);
  }

  addImage(img: ImageImport): void {
    if (this.selectedImages.indexOf(img) == -1) {
      this.selectedImages.push(img);
    }
  }

  deleteImage(i: ImageImport): void {
    let index = this.selectedImages.indexOf(i, 0);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    }
  }



}



