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
        break;
      case Game.Memory:
        this.jeu = "memory";
        break;
      case Game.Puzzle:
        this.jeu = "puzzle";
        break;
      case Game.Reconnaitre:
        this.jeu = "reconnaitre";
        break;
      case Game.Recopier:
        this.jeu = "recopier";
        break;
    }
  }

  getAbecedaire(n: number): Abecedaire | null {
    return null;
  }

  addUser(name: string): void {
    this.getSession()!.joueur.push((new Users(name, Session.number, 0, 0)));
  }

  deleteUser(str: string): void {

  }

  static data: Session[] = [
    new Session('test', new Date(), Game.Recopier, 0, false, []),
    new Session('test2', new Date(), Game.Memory, 0, true, [
      new Users('test3', Session.number, 0, 50),
      new Users('Timmy', Session.number, 20, 10)
    ]),
    new Session('test3', new Date('1978-4-11'), Game.Abecedaire, 0, false, []),
    new Session('test4', new Date(), Game.Memory, 0, true, []),
    new Session('test5', new Date(), Game.Memory, 0, true, []),
    new Session('test6', new Date(), Game.Memory, 0, true, []),
  ];

}
