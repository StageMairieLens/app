import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { Puzzle } from './Puzzle'
import { Progress } from '../Progress'

declare function restart():any;
declare function rules():any;
declare function lance():any;
@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {
  
  constructor() { 
    this.r = null;

  }
  ngOnInit(): void {
    lance();
    restart();
    //this.test();
    //rules(); 
  }
  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Puzzle | null;
  @Input() showTitle : boolean = true;
  
  test(){
    const canvas=<HTMLCanvasElement> document.getElementById("canvas");
    const ctx= canvas.getContext("2d");
    const cw=  canvas.width;
    const ch=  canvas.height;
    
    const rows=3;
    const cols=3;
    
    const img=new Image();
    img.onload=start;
    img.src='../../assets/chat.png';
    function start(){
    
      var iw=canvas.width=img.width;
      var ih=canvas.height=img.height;
      var pieceWidth=iw/cols;
      var pieceHeight=ih/rows;
    
      var pieces = [
        {col:0,row:0},
        {col:1,row:0},
        {col:2,row:0},
        {col:0,row:1},
        {col:1,row:1},
        {col:2,row:1},
        {col:0,row:2},
        {col:1,row:2},
        {col:2,row:2},
      ]
        //shuffle(pieces);
    
        var i=0;
        for(var y=0;y<rows;y++){
        for(var x=0;x<cols;x++){
        var p=pieces[i++];
      ctx!.drawImage(
        // from the original image
        img,
        // take the next x,y piece
        x*pieceWidth, y*pieceHeight, pieceWidth, pieceHeight,
        // draw it on canvas based on the shuffled pieces[] array
        p.col*pieceWidth, p.row*pieceHeight, pieceWidth, pieceHeight
      );
    }}
    
  }
  }

 
}
 