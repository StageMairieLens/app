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



  finish : boolean = false;
  mots = ['boy','girl','girl','girl','boy','boy'];

  girl : string[] = [];
  girlFinish : string[] = ['girl'];

  boy : string[] = [];
  boyFinish : string[] = ['boy'];



  checkBoy() : boolean {
    let result : boolean = false;
    for(let b of this.boy) {
      if(this.boyFinish.includes(b)) {
        result = true;
      } else {
        return false;
      }
    }
    return true;
  }

  checkGirl() : boolean {
    let result : boolean = false;
    for(let g of this.girl) {
      if(this.girlFinish.includes(g)) {
        result = true;
      } else {
        return false;
      }
    }
    return true;
  }

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

    if((this.checkBoy() && this.checkGirl() ) && this.mots.length == 0  ) {
      this.finish = true;
      document.getElementById('content')!.style.display = 'none';
      document.getElementById('container')!.style.display = 'none';
    }

  }
}
