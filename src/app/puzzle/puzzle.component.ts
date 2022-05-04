import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Puzzle } from './Puzzle';
import { Image as ImageImport } from '../Image';
import { SessionsComponent } from '../sessions/sessions.component'
import { Progress } from '../Progress';
import { ImagesComponent } from '../images/images.component';
import { Router } from '@angular/router';
import { JeuxService } from '../jeux.service';

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


  constructor(private jeuxService: JeuxService,private router: Router) {
    this.r = new Puzzle([this.liste_image[5], this.liste_image[1]], 'yellow', 'blue', 'black', 'green', 'red', 'SCRIPT', 6);
    // this.r = null;

  }

  reponse = "";
  data = [];
  recup(donne:any){
    this.jeuxService.recup_puzzle(donne).subscribe(data =>{
      for(var i = 0;data[i]!= null;i++){
        donne.push(data[i]);
      }

      console.log(donne[0].bg_color);
      console.log(data[0]);
    })

  }
  onSend(list:any){

    const formData : FormData = new FormData();

    formData.append('puzzle',JSON.stringify(list));
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next:res=>{
        console.log(res.name);
        this.reponse = res;
      },

      error  :err =>{
        console.log(err);
      },

    });
  }onSend_delete(id:any){

    const formData : FormData = new FormData();
    /*for(var i = 0;i<id.lenght;i++){
      formData.append('id[]',id[i]);
    }*/
    formData.append('puzzle_delete',id);
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next:res=>{
        console.log(res);

      },

      error  :err =>{
        console.log(err);
      },

    });
  }
  onSend_update(list:any){

    const formData : FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('puzzle_update',JSON.stringify(list));
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next:res=>{
        console.log(res.name);
        this.reponse = res;
      },

      error  :err =>{
        console.log(err);
      },

    });
  }
  liste_image: ImageImport[] = ImagesComponent.list_image;
  selectedImages: ImageImport[] = [];
  images = this.liste_image;




  ngOnInit(): void {
    this.recup(this.data);
    if(this.r != null && this.play) {
      this.decoupageImage();


      for (let i = 0; i < this.r!.decoupe * this.r!.decoupe; i++) {
        this.nombre.push(i);
        this.plateau[i] = [];
        this.dragList.push(('plateau_list_' + i));
      }

      for (let i of this.nombre) {
        this.plateau[i].push(this.decoupage[i])
      }

      this.shuffle();
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
  decoupe: number = 4 ;
  formStep: number = 0;
  image:any=[];
  list:any = {image:this.image.toString(),id:1,bg_color:this.puzzle_bg_color,text_color:this.puzzle_text_color,title_color:this.puzzle_title_color,button_bg_color:this.puzzle_button_bg_color,button_text_color:this.puzzle_button_text_color,ecri:this.puzzle_type_ecriture,decoupe:this.decoupe};
  prochaine_image = 0;


  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Puzzle | null;
  @Input() showTitle: boolean = true;
  @Input() play: boolean = true;
  @Input() showList: boolean = false;
  @Input() create_game: boolean = false;
  @Input() edit: boolean = false;

  decoupage: tuile[] = [];
  nombre: number[] = [];
  plateau: [tuile[]] = [[]];
  dragList: string[] = [];
  selected_image : HTMLImageElement[] = [];
  showModel : boolean = false;


  checkPuzzle() : boolean{
    for (let i = 0 ; i< this.r!.decoupe * this.r!.decoupe; i++) {
      if(this.decoupage[i] != this.plateau[i][0]) {
        return false;
      }
    }
    return true;
  }

  shuffle() : void {
    var j, x, i;
    for (i = this.plateau.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this.plateau[i];
        this.plateau[i] = this.plateau[j];
        this.plateau[j] = x;
    }
  }

  decoupageImage(): void {
    this.decoupage = [];
    for (let i = 0; i < this.r!.decoupe * this.r!.decoupe; i++) {
      this.decoupage.push(
        { x: ((100 / (this.r!.decoupe - 1)) * (i % this.r!.decoupe)), y: ((100 / (this.r!.decoupe - 1)) * Math.floor(i / this.r!.decoupe)) }
      )
    }
  }

  // switch(t1: tuile[], t2: tuile[]): void {
  //   let tmp = t1[0];
  //   t1[0] = t2[0];
  //   t2[0] = tmp;
  // }

  drop(event: CdkDragDrop<tuile[]>) {

    if (event.container.data.length == 0) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
    else if (event.container.data.length == 1) {

      if (event.previousContainer.id != 'decoupage_list') {
        let i = +event.container.id.split('_')[2];
        let iprime = +event.previousContainer.id.split('_')[2];

        let el = event.container.data[0];

        this.plateau[i].splice(0);
        this.plateau[iprime].push(el);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );

      }
      else {
        let i = +event.container.id.split('_')[2];

        let el = event.container.data[0];
        this.plateau[i].splice(0);
        this.decoupage.push(el);

        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }


    }

    if(this.checkPuzzle()) {
      this.prochaine_image++;
      this.plateau = [[]];
      this.nombre = [];
      this.dragList = [];
      this.decoupageImage();


      for (let i = 0; i < this.r!.decoupe * this.r!.decoupe; i++) {
        this.nombre.push(i);
        this.plateau[i] = [];
        this.dragList.push(('plateau_list_' + i));
      }

      for (let i of this.nombre) {
        this.plateau[i].push(this.decoupage[i])
      }

      this.shuffle();

    }
    console.log(this.prochaine_image , this.r!.liste_images)

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
      this.r = new Puzzle(this.selectedImages, this.puzzle_bg_color, this.puzzle_title_color, this.puzzle_text_color, this.puzzle_button_bg_color, this.puzzle_button_text_color, this.puzzle_type_ecriture, Number(this.decoupe));
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
      this.image.push(img.id);
      this.list['image']=this.image.toString();
    }
  }

  deleteImage(i: ImageImport): void {
    let index = this.selectedImages.indexOf(i, 0);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
      this.image.splice(index,1);
      this.list['image']=this.image.toString();
    }
  }



}



