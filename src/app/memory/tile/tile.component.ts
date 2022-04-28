import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MemoryComponent } from '../memory.component';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() derriere = "";
  @Input() isImage = true;
  @Input() affichage = "";
  @Input() nom = "";
  @Input() sound = false;
  @Input() id = "0";
  @Output() _id = new EventEmitter<string>();
  @Input() disable = false;
  @Input() cursif = false;
  retourner = false;

  constructor() { }

  ngOnInit(): void {
  }

  click(): void {
    if(!this.disable) {
      this.retourner = true;
      if(this.sound) {
        MemoryComponent.synthesis!.cancel();
        var utterance = new SpeechSynthesisUtterance(this.nom);
        utterance.voice = MemoryComponent.voice;
        utterance.pitch = 1;
        utterance.rate = 0.7;
        MemoryComponent.synthesis!.speak(utterance);
      }
      this._id.emit(this.id);
    }
  }

  cacher(): void {
    this.retourner = false;
  }

}
