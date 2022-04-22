import { Component, OnInit,ViewChild,Input, ElementRef,AfterViewInit } from '@angular/core';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Puzzle } from './Puzzle';
import { Image } from '../Image';


declare function restart(gridsize:number,imagess:any):any;
declare function rules():any;
declare function lance(gridsize:number,imagess:any):any;
declare var images : any;

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css'],

})

export class PuzzleComponent implements OnInit {
  
  
  constructor() { 
    this.r = new Puzzle(images, 'yellow', 'blue', 'black', 'green', 'red','CAPITAL',this.decoupe);
    //this.r = null;
    
  }
  
  imagess = [
    { src: '../../assets/fleur.jpg', title: 'London Bridge' },
    { src: '../../assets/lion.jpg', title: 'Lotus Temple' }
  
    
];
  taille_w:any=[];
  taille_h:any=[];
  decoupe : number = 2;
  
  ngOnInit(): void {
  
    lance(this.r!.decoupe,this.r!.liste_images);
    
    
    this.decoupe;
    console.log(images[0].title);
   
  }
  restar(){
    restart(this.r!.decoupe,this.r!.liste_images);
  }

  
  
  


  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Puzzle | null;
  @Input() showTitle : boolean = true;


  }


  
