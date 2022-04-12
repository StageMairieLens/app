import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() derriere = "";
  @Input() isImage = true;
  @Input() affichage = "";
  @Input() sound = false;
  @Input() set = "0";
  @Output() _set = new EventEmitter<string>();
  @Input() disable = false;
  retourner = false;

  constructor() { }

  ngOnInit(): void {
  }

  click(): void {
    if(!this.disable) {
      this.retourner = true;
      if(this.sound) {
        //TO DO
      }
      this._set.emit(this.set);
    }
  }

  cacher(): void {
    this.retourner = false;
  }

}
