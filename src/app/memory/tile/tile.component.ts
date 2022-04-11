import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() derriere = "";
  @Input() isImage = true;
  @Input() affichage = "";
  @Input() set = 0;
  @Input() sound = false;
  retourner = false;

  constructor() { }

  ngOnInit(): void {
  }

  setDerriere(image: string) {
    this.derriere = image;
  }

  click(): void {
    this.retourner = true;
  }

  cacher(): void {
    this.retourner = false;
  }

}
