import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { BoyGirl} from './BoygGirl'
@Component({
  selector: 'app-boy-girl-game',
  templateUrl: './boy-girl-game.component.html',
  styleUrls: ['./boy-girl-game.component.css']
})
export class BoyGirlGameComponent implements OnInit {

  constructor() {
    // this.bg = null;
    this.bg = new BoyGirl(this.girl,this.boy,'#3bb8c9','pink','blue','orange','brown','lightblue','red','black','black','black','black','white','black');
  }
  ngOnInit(): void {
    this.boy = this.bg!.listMotsGarcon;
    this.girl = this.bg!.listMotsFille;

    this.girlFinish = this.girl;
    this.boyFinish = this.boy;

    this.mots = this.boy.concat(this.girl);
    this.boy = [];
    this.girl = [];
    this.shuffle();
  }


  @Input() bg : BoyGirl | null;
  @Input() showTitle : boolean = true;
  finish : boolean = false;
  mots : string[] = [];

  girl : string[] = [];
  girlFinish : string[] = this.girl;

  boy : string[] = [];
  boyFinish : string[] = this.boy;



  checkBoy() : boolean {

    if(this.boy.length == this.boyFinish.length) {
      let result = true;
      for(let i = 0; i < this.boy.length ; i++) {
        if(!this.boyFinish.includes(this.boy[i])) {
          return false;
        }
      }
      return result;
    }
    return false;
  }

  checkGirl() : boolean {
    if(this.girl.length == this.girlFinish.length) {
      let result = true;
      for(let i = 0; i < this.girl.length ; i++) {
        if(!this.girlFinish.includes(this.girl[i])) {
          return false;
        }
      }
      return result;
    }
    return false;

  }

  shuffle() : void {
    var m = this.mots.length, t, i, t2;

    while (m) {
      i = Math.floor(Math.random() * m--);

      t = this.mots[m];
      this.mots[m] = this.mots[i];
      this.mots[i] = t;
    }
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
    console.log(this.boyFinish);
    console.log(this.boy);
    if((this.checkBoy() && this.checkGirl() ) && this.mots.length == 0  ) {
      this.finish = true;
      document.getElementById('content')!.style.display = 'none';
      document.getElementById('container')!.style.display = 'none';
    }

  }
}
