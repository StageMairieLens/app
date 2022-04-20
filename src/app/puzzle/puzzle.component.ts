import { Component, OnInit,ViewChild,Input, ElementRef,AfterViewInit } from '@angular/core';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Puzzle } from './Puzzle'

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
  donnee_non_alea:donnee[]=[
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
  donnee1:donnee[]=[];
  donnee2:donnee[]=[];
  donnee3:donnee[]=[];
  donnee_vide:donnee[]=[];
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
    //this.test();
    //this.alea(this.donnee);
    //this.recup(this.donnee);
  }
  
  test(){
    // var table =document.getElementById('table')!.style.height;
    // table=this.img.height;
    //(<HTMLTableElement>document.getElementById('table'))!.setAttribute('height',this.img.height.toString());
    //(<HTMLTableElement>document.getElementById('table2'))!.setAttribute('height',this.img.height.toString());

    
    
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
  recup(li:donnee[]):void{
    for(var i =0;i<li.length;i++){
      if(i<3){
        this.donnee1.push(li[i]);
      }
      if(i>2 && i<6){
        this.donnee2.push(li[i]);
      }
      if(i>5){
        this.donnee3.push(li[i]);
      }
    }

  }
  /*drop(event: CdkDragDrop<donnee[]>) {
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
*/
  
  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Puzzle | null;
  @Input() showTitle : boolean = true;
  
  
  
  }

 

 