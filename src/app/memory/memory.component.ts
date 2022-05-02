import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { throttleTime } from 'rxjs';
import { Image } from '../Image';
import { Progress } from '../Progress';
import { Memory } from './Memory';
import { TileComponent } from './tile/tile.component';
import { SessionsComponent } from '../sessions/sessions.component';
import { ImagesComponent } from '../images/images.component';
import { Router } from '@angular/router';
import { JeuxService } from '../jeux.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  @Input() game: Memory | null;
  derriere: Image | null;
  images: Image[] = [
    new Image("Orange", "../../assets/orange.jpg"),
    new Image("Voiture", "../../assets/voiture.png"),
    new Image("Chat", "../../assets/chat.jpg"),
    new Image("Chien", "../../assets/chien.jpeg"),
    new Image("Lion", "../../assets/lion.jpg"),
    new Image("Souris", "../../assets/souris.jpg"),
    new Image("Son", "../../assets/sound.png"),
    new Image("Maison", "../../assets/house.svg"),
    new Image("Panda", "../../assets/panda.png")
  ]
  @Input() showTitle: boolean = true;
  @Input() play: boolean = true;
  @Input() showList: boolean = false;
  @Input() create_game: boolean = false;
  @Input() edit: boolean = false;


  memory_nbTile: number = 18;
  memory_settings: string[] = ['image', 'image'];
  memory_isVocaliser: boolean = false;
  memory_bg_color: string = "#3bb8c9";
  memory_text_color: string = "#ffffff";
  memory_good_answer_color: string = "#3498db";
  memory_wrong_answer_color: string = "#e74c3c";
  memory_progress: Progress = Progress.Blue;
  memory_previsualiser: boolean = false;
  sound: boolean = false;
  memory_tmp_affichage: string = "5";
  memory_list: Memory[] = []
  list: any = { bg_color: this.memory_bg_color, text_color: this.memory_text_color, gaw_color: this.memory_good_answer_color, waw_color: this.memory_wrong_answer_color, progress: 'blue', ecri1: this.memory_settings[0], ecri2: this.memory_settings[1], pair: this.memory_nbTile, tmps: this.memory_tmp_affichage, voca: 0 };

  liste_image: Image[] = ImagesComponent.list_image;
  selectedImages: Image[] = [];
  formStep: number = 0;

  progressValue: Progress[] = [
    Progress.Blue,
    Progress.Green,
    Progress.LightBlue,
    Progress.Orange,
    Progress.Red
  ];


  started = false;
  pressStart = false;
  nbTile = 18;
  setting: string[] = ["image", "image"];
  tmpAfficher: number = 5000;
  affichage: string[] = [];
  nom: string[] = [];
  isImage: boolean[] = [];

  cursif: boolean[] = [];
  sets: number[] = [];
  hash: number[] = [];
  retourner: string = "0";
  essaie: number = 0;
  nbBon: number = 0;
  finish: boolean = false;
  static synthesis: SpeechSynthesis | null = window.speechSynthesis;;
  static voice: SpeechSynthesisVoice | null = MemoryComponent.synthesis!.getVoices().filter(function (voice) {
    return voice.lang === 'fr';
  })[0];;
  @ViewChild("tile1") tile1!: TileComponent;
  @ViewChild("tile2") tile2!: TileComponent;
  @ViewChild("tile3") tile3!: TileComponent;
  @ViewChild("tile4") tile4!: TileComponent;
  @ViewChild("tile5") tile5!: TileComponent;
  @ViewChild("tile6") tile6!: TileComponent;
  @ViewChild("tile7") tile7!: TileComponent;
  @ViewChild("tile8") tile8!: TileComponent;
  @ViewChild("tile9") tile9!: TileComponent;
  @ViewChild("tile10") tile10!: TileComponent;
  @ViewChild("tile11") tile11!: TileComponent;
  @ViewChild("tile12") tile12!: TileComponent;
  @ViewChild("tile13") tile13!: TileComponent;
  @ViewChild("tile14") tile14!: TileComponent;
  @ViewChild("tile15") tile15!: TileComponent;
  @ViewChild("tile16") tile16!: TileComponent;
  @ViewChild("tile17") tile17!: TileComponent;
  @ViewChild("tile18") tile18!: TileComponent;
  tiles: TileComponent[] = [];

  constructor(private jeuxService: JeuxService, private router: Router) {
    // this.derriere = new Image("Lapin", "../../assets/lapin.webp");
    // this.game = new Memory(this.images, this.derriere, 18, this.setting, '#3bb8c9', 'white', 'blue', 'red', Progress.Blue, "5");
    this.game = null;
    this.derriere = null;
  }
  data : Memory[] = [];
  recup(donne: any) {
    this.jeuxService.recup_memory(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        donne.push(
          new Memory(data[i].id_memory, data[i].date_memory, this.getImage(data[i].id_image).slice(1), this.getImage(data[i].id_image)[0], data[i].isVoca, data[i].nb_pair, [data[i].sett0,data[i].sett1], data[i].bg_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].tmps)
        );
        }
    })

  }
  onSend_delete(id:any){

    const formData : FormData = new FormData();
    /*for(var i = 0;i<id.lenght;i++){
      formData.append('id[]',id[i]);
    }*/
    formData.append('memory_delete',id);
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
  reponse:any;
  onSend(list:any){

    const formData : FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('memory', JSON.stringify(list));
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        console.log(res.name);
        this.reponse = res;
      },

      error: err => {
        console.log(err);
      },

    });
  }

  getImage(s: string): Image[] {
    let res = [];
    let tab = s.split(',');
    for(let i of tab) {
      for(let j of ImagesComponent.list_image) {
        if(+i == j.id) {
          res.push(j);
          break;
        }
      }
    }
    return res;
   }


  // Initialisation
  ngOnInit(): void {
    this.recup(this.memory_list);
    console.log(this.memory_list);
    if (this.game == null || this.game.derriere == null) return;
    this.nbTile = this.game.nbTile;
    this.setting = this.game.setting;
    this.derriere = this.game.derriere;
    this.sound = this.game.isVocaliser;
    this.tmpAfficher = Number(this.game.tmpAffichage) * 1000;
    this.set();


    if (this.edit) {
      this.create_game = true
      this.selectedImages = [this.game!.derriere].concat(this.game!.images);
      this.memory_nbTile = this.game!.nbTile;
      this.memory_settings = this.game!.setting;
      this.memory_bg_color = this.game!.bg_color;
      this.memory_text_color = this.game!.text_color;
      this.memory_good_answer_color = this.game!.good_answer_color;
      this.memory_wrong_answer_color = this.game!.wrong_answer_color;
      this.memory_progress = this.game!.color_progress_bar;
      this.memory_tmp_affichage = this.game!.tmpAffichage;
    }

  }

  // Initialisation
  ngAfterViewInit(): void {
    if (this.game == null) return;
    this.tiles = [this.tile1, this.tile2, this.tile3, this.tile4, this.tile5, this.tile6, this.tile7, this.tile8, this.tile9, this.tile10, this.tile11, this.tile12, this.tile13, this.tile14, this.tile15, this.tile16, this.tile17, this.tile18];
    for (var i = 0; i < this.nbTile; i++) {
      this.tiles[i].isImage = this.isImage[i];
      this.tiles[i].sound = this.sound;
      this.tiles[i].id = (i + 1).toString();
      this.tiles[i].affichage = this.affichage[i];
      this.tiles[i].nom = this.nom[i];
      this.tiles[i].cursif = this.cursif[i];
    }
    this.disable();
  }

  // Création du memory
  set(): void {
    var val;
    var i = 0;
    var a;
    while (i < this.game!.images.length && i < this.nbTile / 2) {
      for (var x = 0; x < 2; x++) {
        a = this.random();
        this.sets[a] = i;
        switch (this.setting[x]) {
          case "image":
            this.affichage[a] = this.game!.images[i].getSrc();
            this.nom[a] = this.game!.images[i].getNom();
            this.isImage[a] = true;
            this.cursif[a] = false;
            break;
          case "cursif":
            this.affichage[a] = this.game!.images[i].getNom();
            this.nom[a] = this.game!.images[i].getNom();
            this.isImage[a] = false;
            this.cursif[a] = true;
            break;
          case "script":
            this.affichage[a] = this.game!.images[i].getNom();
            this.nom[a] = this.game!.images[i].getNom();
            this.isImage[a] = false;
            this.cursif[a] = false;
            break;
          case "capital":
            this.affichage[a] = this.game!.images[i].getNom().toUpperCase();
            this.nom[a] = this.game!.images[i].getNom();
            this.isImage[a] = false;
            this.cursif[a] = false;
            break;
          case "sound":
            this.affichage[a] = this.game!.images[i].getSrc();
            this.nom[a] = this.game!.images[i].getNom();
            this.isImage[a] = true;
            this.cursif[a] = false;
            break;
        }
      }
      i++
    }
  }

  // Renvoie un nombre aléatoire et jamais 2 fois le même
  random(): number {
    var a = Math.floor(Math.random() * this.nbTile);
    while (this.hash[a] == 1) {
      a++;
      if (a >= this.nbTile) a = 0;
    }
    this.hash[a] = 1;
    return a;
  }

  // Logique du jeu
  retourne(id: string): void {
    if (!this.started) return;
    if (this.retourner == "0") {
      this.retourner = id;
    }
    else {
      this.essaie++;
      if (this.sets[Number(id) - 1] == this.sets[Number(this.retourner) - 1]) {
        this.nbBon++;
        document.getElementById(id)!.style.border = "3px solid";
        document.getElementById(id)!.style.borderColor = this.game!.good_answer_color;
        document.getElementById(this.retourner)!.style.border = "3px solid";
        document.getElementById(this.retourner)!.style.borderColor = this.game!.good_answer_color;
        this.retourner = "0";
        document.getElementById('progressbar')!.style.width = ((this.nbBon / (this.game!.nbTile / 2)) * 100).toString() + '%';
        if (this.nbBon >= this.nbTile / 2) {
          setTimeout(() => {
            this.finish = true;
          }, 1000);
        }
      }
      else {
        this.disable();
        document.getElementById(id)!.style.border = "3px solid";
        document.getElementById(id)!.style.borderColor = this.game!.wrong_answer_color;
        document.getElementById(this.retourner)!.style.border = "3px solid";
        document.getElementById(this.retourner)!.style.borderColor = this.game!.wrong_answer_color;
        setTimeout(() => {
          this.tiles[Number(id) - 1].cacher();
          this.tiles[Number(this.retourner) - 1].cacher();
          document.getElementById(id)!.style.border = "none";
          document.getElementById(this.retourner)!.style.border = "none";
          this.retourner = "0";
          this.enable();
        }, 1000);
      }
    }
  }

  disable(): void {
    for (var i = 0; i < this.nbTile; i++) {
      this.tiles[i].disable = true;
    }
  }

  enable(): void {
    for (var i = 0; i < this.nbTile; i++) {
      this.tiles[i].disable = false;
    }
  }

  // Logique du bouton commencer
  start(): void {
    if (this.pressStart == true) return;
    if (this.tmpAfficher == 0) {
      this.pressStart = true;
      this.enable();
      this.started = true;
      return;
    }
    this.pressStart = true;
    for (var i = 0; i < this.nbTile; i++) {
      console.log(i);
      this.tiles[i].retourner = true;
    }
    setTimeout(() => {
      for (var i = 0; i < this.nbTile; i++) {
        this.tiles[i].cacher();
      }
      this.enable();
      this.started = true;
    }, this.tmpAfficher);
  }


  previewMemory(m: Memory): void {
    this.game = m;
    this.memory_previsualiser = true;
  }

  quitPreviewMemory(): void {
    this.memory_previsualiser = false;
  }

  deleteGameMemory(m: Memory): void {
    let index = this.memory_list.indexOf(m, 0);

    if (index > -1) {
      this.memory_list.splice(index, 1);
    }
  }

  parseDate(date: Date): string {
    let month: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let index: number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  }

  redirectEditMemory(m: Memory): void {
    window.location.href = '/panel/Memory/edit/' + m.id;
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
        this.memory_progress = Progress.Blue;
        break;
      case 'green':
        this.memory_progress = Progress.Green;
        break;
      case 'lightblue':
        this.memory_progress = Progress.LightBlue;
        break;
      case 'orange':
        this.memory_progress = Progress.Orange;
        break;
      case 'red':
        this.memory_progress = Progress.Red;
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


  setPrevisualiserMemory(prev: boolean): void {
    if (prev == true) {
      this.game = new Memory(0,"",this.selectedImages.slice(1), this.selectedImages[0], this.sound, this.memory_nbTile, this.memory_settings, this.memory_bg_color, this.memory_text_color, this.memory_good_answer_color, this.memory_wrong_answer_color, this.memory_progress, this.memory_tmp_affichage);
      this.memory_previsualiser = true;
    }
    else {
      this.memory_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
        this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      }, 0);
    }
  }

  getMemorySetting(n: number): string {
    return this.memory_settings[n];
  }

  changeMemorySetting(n: number, setting: string): void {
    this.memory_settings[n] = setting;
    console.log(this.memory_settings);
  }

  changeMemoryNbTile(n: number): void {
    this.memory_nbTile = n;
  }

  create(): void {
    this.memory_list.push(
      // new Memory(this.selectedImages.slice(1), this.selectedImages[0], this.sound, this.memory_nbTile, this.memory_settings, this.memory_bg_color, this.memory_text_color, this.memory_good_answer_color, this.memory_wrong_answer_color, this.memory_progress, this.memory_tmp_affichage)
    );
    this.router.navigate(['/panel/Memory']);
  }

  save(): void {
    this.game!.images = this.selectedImages;
    this.game!.nbTile = this.memory_nbTile;
    this.game!.setting = this.memory_settings;
    this.game!.isVocaliser = this.memory_isVocaliser;
    this.game!.bg_color = this.memory_bg_color;
    this.game!.text_color = this.memory_text_color;
    this.game!.good_answer_color = this.memory_good_answer_color;
    this.game!.wrong_answer_color = this.memory_wrong_answer_color;
    this.game!.color_progress_bar = this.memory_progress;
    this.game!.tmpAffichage = this.memory_tmp_affichage;
    this.router.navigate(['/panel/Memory']);
  }
}
