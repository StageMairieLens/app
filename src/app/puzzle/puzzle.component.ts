import { Component, OnInit,ViewChild,Input, ElementRef,AfterViewInit } from '@angular/core';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Puzzle } from './Puzzle'
import { Progress } from '../Progress'
import { table } from 'console';
import { title } from 'process';
import { B } from '@angular/cdk/keycodes';

declare function restart():any;
declare function rules():any;
declare function lance():any;
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
    this.r = null;
      
  }
  img = new Image();
  donnee :donnee[]=[
    {src:this.img.src,nr:"no-repeat",a:"left",b:"top"},
    {src:this.img.src,nr:"no-repeat",a:"center",b:"top"},
    {src:this.img.src,nr:"no-repeat",a:"right",b:"top"},
    {src:this.img.src,nr:"no-repeat",a:"left",b:"center"},
    {src:this.img.src,nr:"no-repeat",a:"center",b:"center"},
    {src:this.img.src,nr:"no-repeat",a:"right",b:"center"},
    {src:this.img.src,nr:"no-repeat",a:"left",b:"bottom"},
    {src:this.img.src,nr:"no-repeat",a:"center",b:"bottom"},
    {src:this.img.src,nr:"no-repeat",a:"right",b:"bottom"},
  ];
  //id:string[]=["i1","i2","i3","i4","i5","i6","i7","i8","i9"];
  //imgWidth: number
  //imgHeight: number
  ngOnInit(): void {
    lance();
    restart();
    this.img.src='../../assets/lion.jpg';
    this.img.height;
    this.img.width;
    console.log(this.img.height);
    this.test();
    this.alea(this.donnee);
  }
  
  test(){
    // var table =document.getElementById('table')!.style.height;
    // table=this.img.height;
    (<HTMLTableElement>document.getElementById('table'))!.setAttribute('height',this.img.height.toString());
    
    
  }
  alea(li: donnee[]): void {

    var m = li.length, name, src, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      name = li[m];
      li[m] = li[i];
      li[i] = name;
    }
  }
  
  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Puzzle | null;
  @Input() showTitle : boolean = true;
  
  
  
  }

 

 