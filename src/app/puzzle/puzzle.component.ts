import { Component, OnInit,ViewChild,Input, ElementRef,AfterViewInit } from '@angular/core';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Puzzle } from './Puzzle';
import { Image } from '../Image';


declare function restart(gridsize:number,imagess:any):any;
declare function rules():any;
declare function lance(gridsize:number,imagess:any):any;
declare var images : any;
interface donnee{
  src:string;
  nr:string;
  a:string;
  b:string;
}
@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css'],

})

export class PuzzleComponent implements OnInit {


  constructor() {
    this.r = new Puzzle(images, 'yellow', 'blue', 'black', 'green', 'red','CAPITAL');
    //this.r = null;

  }

  imagess = [
    { src: '../../assets/fleur.jpg', title: 'London Bridge' },
    { src: '../../assets/lion.jpg', title: 'Lotus Temple' }


];

  decoupe : number = 3;

  ngOnInit(): void {

    lance(this.decoupe,this.imagess);


    this.decoupe;
    console.log(images[0].title);

  }
  restar(){
    restart(this.decoupe,this.imagess);
  }







  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Puzzle | null;
  @Input() showTitle : boolean = true;


  }



