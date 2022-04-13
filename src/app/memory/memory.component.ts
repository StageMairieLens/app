import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Image } from '../Image';
import { Progress } from '../Progress';
import { Memory } from './Memory';
import { TileComponent } from './tile/tile.component';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  @Input() game: Memory | null;
  derriere = "../../assets/lapin.webp";
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
  showTitle: boolean = true;
  nbTile = 18;
  setting: string[] = ["image", "image"];
  affichage: string[] = [];
  isImage: boolean[] = [];
  sound: boolean[] = [];
  sets: number[] = [];
  hash: number[] = [];
  retourner: string = "0";
  essaie: number = 0;
  nbBon: number = 0;
  finish: boolean = false;
  typeEcriture: string = "cursif";
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

  constructor() {
    this.game = new Memory(this.images, 18, this.setting, '#3bb8c9', 'white', 'white', 'blue', 'red', Progress.Blue, 'cursif');
    // this.game = null;
  }

  ngOnInit(): void {
    if(this.game == null) return;
    this.nbTile = this.game!.nbTile;
    this.setting = this.game!.setting;
    this.typeEcriture = this.game!.typeEcriture;
    this.start();
  }

  ngAfterViewInit(): void {
    if(this.game == null) return;
    this.tiles = [this.tile1, this.tile2, this.tile3, this.tile4, this.tile5, this.tile6, this.tile7, this.tile8, this.tile9, this.tile10, this.tile11, this.tile12, this.tile13, this.tile14, this.tile15, this.tile16, this.tile17, this.tile18];
    for(var i = 0; i < this.nbTile; i++) {
      this.tiles[i].isImage = this.isImage[i];
      this.tiles[i].sound = this.sound[i];
      this.tiles[i].id = (i+1).toString();
      this.tiles[i].affichage = this.affichage[i];
    }
  }

  start(): void {
    var val;
    var i = 0;
    var a;
    while(i < this.game!.images.length && i < this.nbTile/2) {
      for(var x = 0; x < 2; x++) {
        a = this.random();
        this.sets[a] = i;
        switch(this.setting[x]) {
          case "image":
            this.affichage[a] = this.game!.images[i].getSrc();
            this.isImage[a] = true;
            this.sound[a] = false;
            break;
          case "mot":
            this.affichage[a] = this.game!.images[i].getNom();
            this.isImage[a] = false;
            this.sound[a] = false;
            break;
          case "sound":
            this.affichage[a] = this.game!.images[i].getSrc();
            this.isImage[a] = true;
            this.sound[a] = true;
        }
      }
      i++
    }
  }

  random(): number {
    var a = Math.floor(Math.random()*this.nbTile);
    while(this.hash[a] == 1) {
      a++;
      if(a >= this.nbTile) a = 0;
    }
    this.hash[a] = 1;
    return a;
  }

  retourne(id: string): void {
    if(this.retourner == "0") {
      this.retourner = id;
    }
    else {
      this.essaie++;
      if(this.sets[Number(id)-1] == this.sets[Number(this.retourner)-1]) {
        this.nbBon++;
        document.getElementById(id)!.style.border = "3px solid";
        document.getElementById(id)!.style.borderColor = this.game!.good_answer_color;
        document.getElementById(this.retourner)!.style.border = "3px solid";
        document.getElementById(this.retourner)!.style.borderColor = this.game!.good_answer_color;
        this.retourner = "0";
        document.getElementById('progressbar')!.style.width = ((this.nbBon / (this.game!.nbTile/2)) * 100).toString() + '%';
        if(this.nbBon >= this.nbTile/2) {
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
          this.tiles[Number(id)-1].cacher();
          this.tiles[Number(this.retourner)-1].cacher();
          document.getElementById(id)!.style.border = "none";
          document.getElementById(this.retourner)!.style.border = "none";
          this.retourner = "0";
          this.enable();
        }, 1000);
      }
    }
  }

  disable(): void {
    for(var i = 0; i < this.nbTile; i++) {
      this.tiles[i].disable = true;
    }
  }

  enable(): void {
    for(var i = 0; i < this.nbTile; i++) {
      this.tiles[i].disable = false;
    }
  }
}
