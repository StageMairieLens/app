import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recopier-game',
  templateUrl: './recopier-game.component.html',
  styleUrls: ['./recopier-game.component.css']
})
export class RecopierGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sendAnswer(text: string): void {
    if (text === 'test') {
      document.getElementById('result')!.innerHTML = "Victory";
    } else {
      document.getElementById('result')!.innerHTML = "Defeat";

    }

  }

}
