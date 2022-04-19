import { Component, OnInit } from '@angular/core';
import { Session } from './Session';
import { Game } from '../Game'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  session_id: number | null = null;
  join: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.session_id = +this.route.snapshot.paramMap.get('id')!;
      if (this.session_id != null) {
        if (this.getSession() != null) {
          if (this.getSession()!.isActive) {
            this.join = true;
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
      this.getSession()!.joueur.push((<HTMLInputElement>$event.target!).value);
    }
  }

  deleteUser(str : string): void {

  }

  static data: Session[] = [
    new Session('test', new Date(), Game.Recopier, false,[]),
    new Session('test2', new Date(), Game.Memory, true,['test','test2']),
    new Session('test3', new Date('1978-4-11'), Game.Abecedaire, false,[]),
    new Session('test4', new Date(), Game.Memory, true,[]),
    new Session('test5', new Date(), Game.Memory, true,[]),
    new Session('test6', new Date(), Game.Memory, true,[]),
  ];

}
