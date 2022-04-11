import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  image = "../../assets/sound.png";
  derriere = "../../assets/orange.jpg";
  mot = "orange";
  isImage = true;
  nbTile = 18;

  constructor() { }

  ngOnInit(): void {
  }

  

}
