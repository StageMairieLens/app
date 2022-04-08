import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boy-girl-game',
  templateUrl: './boy-girl-game.component.html',
  styleUrls: ['./boy-girl-game.component.css']
})
export class BoyGirlGameComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  mots = ['boy','girl'];

  girl = [''];

  boy = [''];

  drop(event: CdkDragDrop<string[]>) {
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
}
