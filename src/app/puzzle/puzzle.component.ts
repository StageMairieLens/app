import { Component, OnInit } from '@angular/core';
declare function restart():any;
declare function rules():any;
declare function lance():any;
@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    lance();
    restart();
    rules(); 
  }
  
}
 