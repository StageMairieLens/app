import { Component, OnInit } from '@angular/core';
import { Session } from './Session';
import { Game } from '../Game'
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../users/Users'
import { Abecedaire } from '../abecedaire/Abecedaire';
import { Memory } from '../memory/Memory';
import { BoyGirl } from '../boy-girl-game/BoygGirl';
import { Puzzle } from '../puzzle/Puzzle';
import { Reconnaitre } from '../reconnaitre/Reconnaitre';
import { Recopier } from '../recopier-game/Recopier';
import { ImagesComponent } from '../images/images.component';
import { Progress } from '../Progress';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  session_id: number | null = null;
  join: boolean = false;
  connected: boolean = false;
  timer_redirect: number = 5;
  jeu: string = "";
  abecedaire: Abecedaire | null;
  memory: Memory | null;
  boyGirl: BoyGirl | null;
  puzzle: Puzzle | null;
  reconnaitre: Reconnaitre | null;
  recopier: Recopier | null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.abecedaire = null;
    this.memory = null;
    this.boyGirl = null;
    this.puzzle = null;
    this.reconnaitre = null;
    this.recopier = null;
  }

  ngOnInit(): void {
    this.timer_redirect = 5;
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.session_id = +this.route.snapshot.paramMap.get('id')!;
      if (this.session_id != null) {
        if (this.getSession() != null) {
          if (this.getSession()!.isActive) {
            this.join = true;
          }
          else {

            for(let i = 1 ; i <= this.timer_redirect + 1 ; i++) {
              if(i != this.timer_redirect + 1) {
                setTimeout(() => {
                  this.timer_redirect--
                }, 1000 * i);
              }else {
                setTimeout(() => {
                  this.router.navigate(['']);
                }, 1000 * i);
              }
            }
          }
        }
        else {

          for(let i = 1 ; i <= this.timer_redirect ; i++) {
            if(i != this.timer_redirect + 1) {
              setTimeout(() => {
                this.timer_redirect--
              }, 1000 * i);
            }else {
              setTimeout(() => {
                this.router.navigate(['']);
              }, 1000 * i);
            }
          }
        }
      }
    }
    else {
      this.router.navigate(['']);

    }
  }

  getSession(): Session | null {
    for (let s of SessionsComponent.data) {
      if (this.session_id != null) {
        if (s.id == this.session_id) {
          return s;
        }
      }
    }
    return null;
  }

  enterKey($event: KeyboardEvent): void {
    if ($event.key == 'Enter') {
      this.connect((<HTMLInputElement>$event.target)!.value);
    }
  }

  connect(name: string): void {
    this.addUser(name);
    var session = this.getSession();
    if(session == null) return;
    switch(session.jeu) {
      case Game.Abecedaire:
        this.jeu = "abecedaire";
        this.abecedaire = this.getAbecedaire(session.jeuId);
        break;
      case Game.FilleEtGarcon:
        this.jeu = "fillegarcon";
        this.boyGirl = this.getFilleGarcon(session.jeuId);
        break;
      case Game.Memory:
        this.jeu = "memory";
        this.memory = this.getMemory(session.jeuId);
        break;
      case Game.Puzzle:
        this.jeu = "puzzle";
        this.puzzle = this.getPuzzle(session.jeuId);
        break;
      case Game.Reconnaitre:
        this.jeu = "reconnaitre";
        this.reconnaitre = this.getReconnaitre(session.jeuId);
        break;
      case Game.Recopier:
        this.jeu = "recopier";
        this.recopier = this.getRecopier(session.jeuId);
        break;
    }
    this.connected = true;
  }

  getAbecedaire(n: number): Abecedaire | null {
    for(let jeu of SessionsComponent.abecedaire_list) {
      if(jeu.id == n) return jeu;
    }
    return null;
  }

  getMemory(n: number): Memory | null {
    for(let jeu of SessionsComponent.memory_list) {
      if(jeu.id == n) return jeu;
    }
    return null;
  }

  getFilleGarcon(n: number): BoyGirl | null {
    for(let jeu of SessionsComponent.boygirl_list) {
      if(jeu.id == n) return jeu;
    }
    return null;
  }

  getPuzzle(n: number): Puzzle | null {
    for(let jeu of SessionsComponent.puzzle_list) {
      if(jeu.id == n) return jeu;
    }
    return null;
  }

  getReconnaitre(n: number): Reconnaitre | null {
    for(let jeu of SessionsComponent.reconnaitre_list) {
      if(jeu.id == n) return jeu;
    }
    return null;
  }

  getRecopier(n: number): Recopier | null {
    for(let jeu of SessionsComponent.recopier_list) {
      if(jeu.id == n) return jeu;
    }
    return null;
  }

  addUser(name: string): void {
    this.getSession()!.joueur.push((new Users(name, Session.number, 0, 0)));
  }

  deleteUser(str: string): void {

  }

  static data: Session[] = [
    new Session('test', new Date(), Game.Recopier, 0, true, []),
    new Session('test2', new Date(), Game.Memory, 0, true, [
      new Users('test3', Session.number, 0, 50),
      new Users('Timmy', Session.number, 20, 10)
    ]),
    new Session('test3', new Date('1978-4-11'), Game.Abecedaire, 0, false, []),
    new Session('test4', new Date(), Game.Memory, 0, true, []),
    new Session('test5', new Date(), Game.Memory, 0, true, []),
    new Session('test6', new Date(), Game.Memory, 0, true, []),
  ];

  static recopier_list: Recopier[] = [
    new Recopier([
      ImagesComponent.list_image[0], ImagesComponent.list_image[1]
    ], '#777777', "#ffffff", "#000000", "#0dff00", "#ff0000", Progress.Blue, "#0f73b1", "#ffffff", "#ffffff", "#000000", "CURSIF", false)
  ];

  static reconnaitre_list: Reconnaitre[] = [
    new Reconnaitre([
      ImagesComponent.list_image[0]
    ], "#3bb8c9", "#ffffff", "#000000", "#0dff00", "#ff0000", Progress.Blue, "#0f73b1", "#ffffff", "SCRIPT", false)
  ];

  static boygirl_list: BoyGirl[] = [
    new BoyGirl(['girl', 'girl'], [], "#3bb8c9", "#ffc0cb", "#add9e6", "#fea500", "#ffc0cb", "#0f73b1", "#000000", "#000000", "#000000", "#000000", "#ffffff", "#ffffff", "#ffffff", "SCRIPT")
  ];

  static abecedaire_list: Abecedaire[] = [
    new Abecedaire([
      ImagesComponent.list_image[0], ImagesComponent.list_image[1]
    ], '#745154', "#ffffff", "#3498db", "#e74c3c", Progress.Blue, "#f39c12", "#ffffff", false, "script")
  ];

  static memory_list: Memory[] = [
    new Memory(ImagesComponent.list_image.slice(1), ImagesComponent.list_image[0], 18, ['image', 'image'], "#3bb8c9", "#ffffff", "#3498db", "#e74c3c", Progress.Blue, "5")
  ];

  static puzzle_list: Puzzle[] = [];

}
