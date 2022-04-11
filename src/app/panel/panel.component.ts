import { Component, OnInit } from '@angular/core';
import { Game } from './Game'
import { Option} from './Option'
import { Image} from './../recopier-game/Image'
import { Recopier } from './../recopier-game/Recopier'
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(private router : Router) { }


  optionGame : string[] = ['Recopier','Memory','Reconnaitre','Abécédaire','Fille&Garçon','Puzzle'];
  selectedGame : string = "";
  // r1 : Recopier = new Recopier([],'red','CAPITAL');
  // r2 : Recopier = new Recopier([],'blue','CAPITAL');


  ngOnInit(): void {
  }

  redirect(str : string): void {
    if(str == 'Accueil') {
      this.router.navigate(['/']);
    }
  }

}
