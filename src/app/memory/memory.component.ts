import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  derriere = "../../assets/lapin.webp";
  map = new Map();
  entries = this.map.entries();
  isImage = true;
  nbTile = 18;
  setting: string[] = ["image", "image"];
  true = true;
  false = false;

  constructor() { }

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

  start(): void {
    var entry = this.entries.next();
    var val;
    var i = 0;
    while(entry.done && i < this.nbTile) {
      val = entry.value;
      for(var x = 0; x < 2; x++) {
        switch(this.setting[x]) {
          case "image":

            break;
        }
      }
      i++;
      entry = this.entries.next();
    }
  }
}
