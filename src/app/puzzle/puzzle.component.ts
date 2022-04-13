import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { Puzzle } from './Puzzle'
import { Progress } from '../Progress'
import { Image } from '../Image'
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
    //rules(); 
  }
  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Puzzle | null;
  @Input() showTitle : boolean = true;
  images: Image[] = [
    new Image('Fleur', '../../assets/fleur.jpg'),
    new Image('Lion', '../../assets/lion.jpg'),
    new Image('Chat', '../../assets/chat.jpg'),
    new Image('Chien', '../../assets/chien.jpeg'),
    new Image('Elephant', '../../assets/elephant.jpg'),
    new Image('Voiture', '../../assets/voiture.png')
  ];

}

 

 