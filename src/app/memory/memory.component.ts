import { Component, OnInit, ViewChild } from '@angular/core';
import { TileComponent } from './tile/tile.component';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  derriere = "../../assets/lapin.webp";
  map = new Map();
  entries = this.map.entries();
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

  constructor() {}

  ngOnInit(): void {
    this.map.set("Orange", "../../assets/orange.jpg");
    this.map.set("Voiture", "../../assets/voiture.png");
    this.map.set("Chat", "../../assets/chat.jpg");
    this.map.set("Chien", "../../assets/chien.jpeg");
    this.map.set("Lion", "../../assets/lion.jpg");
    this.map.set("Souris", "../../assets/souris.jpg");
    this.map.set("Son", "../../assets/sound.png");
    this.map.set("Maison", "../../assets/house.svg");
    this.map.set("Panda", "../../assets/panda.png");
    this.start();
  }

  ngAfterViewInit() {
    this.tiles = [this.tile1, this.tile2, this.tile3, this.tile4, this.tile5, this.tile6, this.tile7, this.tile8, this.tile9, this.tile10, this.tile11, this.tile12, this.tile13, this.tile14, this.tile15, this.tile16, this.tile17, this.tile18];
  }

  start(): void {
    var entry = this.entries.next();
    var val;
    var i = 0;
    var a;
    while(!entry.done && i < this.nbTile/2) {
      val = entry.value;
      for(var x = 0; x < 2; x++) {
        a = this.random();
        this.sets[a] = i;
        switch(this.setting[x]) {
          case "image":
            this.affichage[a] = val[1];
            this.isImage[a] = true;
            this.sound[a] = false;
            break;
          case "mot":
            this.affichage[a] = val[0];
            this.isImage[a] = false;
            this.sound[a] = false;
            break;
          case "sound":
            this.affichage[a] = val[1];
            this.isImage[a] = true;
            this.sound[a] = true;
        }
      }
      i++
      entry = this.entries.next();
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
        this.retourner = "0";
        this.nbBon++;
        if(this.nbBon >= this.nbTile/2) {
          //victory
        }
      }
      else {
        this.disable();
        setTimeout(() => {
          console.log(id, this.retourner);
          this.tiles[Number(id)-1].cacher();
          this.tiles[Number(this.retourner)-1].cacher();
          this.retourner = "0";
          this.enable();
        }, 1500);
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
