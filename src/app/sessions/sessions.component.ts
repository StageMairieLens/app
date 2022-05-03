import { Component, Input, OnInit } from '@angular/core';
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

  @Input() play : boolean = true;
  @Input() showList : boolean = false;
  @Input() create_session : boolean = false;
  @Input() preview : boolean = false;
  @Input() edit : boolean = false;
  @Input() view : boolean = false;

  displayedColumns: string[] = ['Active', 'Id', 'Nom', 'Date', 'Jeu', 'Nombre de joueurs', 'Actions'];
  static sessionActive: Session[] = [];
  @Input() showActive: boolean = false;



  @Input() selected_session: Session | null;
  id_game: number | null = null;
  jeuSession: string = "";
  jeuId: number = -1;

  sortById: boolean = true;
  sortByDate: boolean = false;
  sortByNbJoueur: boolean = false;


  session_nom : string = "";


  constructor(private router: Router, private route: ActivatedRoute) {
    this.abecedaire = null;
    this.memory = null;
    this.boyGirl = null;
    this.puzzle = null;
    this.reconnaitre = null;
    this.recopier = null;
    this.selected_session = null;
  }

  ngOnInit(): void {

    if(this.play) {
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

    if(this.edit) {
      this.create_session = true;
      this.session_nom = this.selected_session!.nom;
      this.jeuSession = this.selected_session!.jeu;
      this.jeuId = this.selected_session!.jeuId;

    }
  }

  getSessionsActive() : Session[] {
    return SessionsComponent.sessionActive;
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

  getData() : Session[] {
    return SessionsComponent.data;
  }

  parseDate(date: Date): string {
    let month: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let index: number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

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

  static recopier_list: Recopier[] = [];

  getRecopierList() : Recopier[] { return SessionsComponent.recopier_list}

  static reconnaitre_list: Reconnaitre[] = [];

  getReconnaitreList() : Reconnaitre[] { return SessionsComponent.reconnaitre_list}

  static boygirl_list: BoyGirl[] = [
    new BoyGirl(['girl', 'girl'], [], "#3bb8c9", "#ffc0cb", "#add9e6", "#fea500", "#ffc0cb", "#0f73b1", "#000000", "#000000", "#000000", "#000000", "#ffffff", "#ffffff", "#ffffff", "SCRIPT")
  ];

  getBoyGirlList() : BoyGirl[] { return SessionsComponent.boygirl_list}


  static abecedaire_list: Abecedaire[] = [
    new Abecedaire([
      ImagesComponent.list_image[0], ImagesComponent.list_image[1]
    ], '#745154', "#ffffff", "#3498db", "#e74c3c", Progress.Blue, "#f39c12", "#ffffff", false, "script")
  ];

  getAbecedaireList() : Abecedaire[] { return SessionsComponent.abecedaire_list}


  static memory_list: Memory[] = [
    // new Memory(ImagesComponent.list_image.slice(1), ImagesComponent.list_image[0], true, 18, ['image', 'image'], "#3bb8c9", "#ffffff", "#3498db", "#e74c3c", Progress.Blue, "5")
  ];

  getMemoryList() : Memory[] { return SessionsComponent.memory_list}


  static puzzle_list: Puzzle[] = [
    new Puzzle([ImagesComponent.list_image[0], ImagesComponent.list_image[1]], "#3bb8c9", "#ffffff", "#000000", "#0dff00", "#ff0000" , 'CAPITAL' , 3)
  ];

  getPuzzleList() : Puzzle[] { return SessionsComponent.puzzle_list}



  previsualiserGame(element: Session): void {
    this.preview = true;
    this.showList = false;
    this.selected_session = element;
  }

  editSession(session: Session): void {
    this.router.navigate(['/panel/sessions/edit', session.id]);
  }

  deleteSession(session: Session): void {
    let index = this.getData().indexOf(session, 0);
    if (index > -1) {
      this.getData().splice(index, 1);
    }
    index = this.getSessionsActive().indexOf(session, 0);
    if (index > -1) {
      this.getSessionsActive().splice(index, 1);
    }
  }

  joinSession(s: Session): void {
    this.selected_session = s;
    this.view = true;
    this.showList = false;
  }

  setSessionActive(s: Session): void {
    s.isActive = true;
    this.getSessionsActive().push(s);
  }

  setSessionInactive(s: Session): void {
    s.isActive = false;
    let index = this.getSessionsActive().indexOf(s, 0);
    if (index > -1) {
      this.getSessionsActive().splice(index, 1);
    }
  }

  sortSessionId(): void {
    if (!this.sortById) {
      this.sortById = true;
      this.sortByDate = false;
      this.sortByNbJoueur = false;

      this.getData().sort((s1: Session, s2: Session) => {
        if (s1.id > s2.id) return 1;
        if (s1.id < s2.id) return -1;
        return 0;
      })

      this.getSessionsActive().sort((s1: Session, s2: Session) => {
        if (s1.id > s2.id) return 1;
        if (s1.id < s2.id) return -1;
        return 0;
      })
    }
    else {
      this.sortById = false;

      this.getData().sort((s1: Session, s2: Session) => {
        if (s1.id > s2.id) return -1;
        if (s1.id < s2.id) return 1;
        return 0;
      })

      this.getSessionsActive().sort((s1: Session, s2: Session) => {
        if (s1.id > s2.id) return -1;
        if (s1.id < s2.id) return 1;
        return 0;
      })
    }
  }

  sortSessionDate(): void {
    if (!this.sortByDate) {
      this.sortByDate = true;
      this.sortById = false;
      this.sortByNbJoueur = false;

      this.getData().sort((s1: Session, s2: Session) => {
        if (s1.date > s2.date) return -1;
        if (s1.date < s2.date) return 1;
        return 0;
      })

      this.getSessionsActive().sort((s1: Session, s2: Session) => {
        if (s1.date > s2.date) return -1;
        if (s1.date < s2.date) return 1;
        return 0;
      })
    }
    else {
      this.sortByDate = false;

      this.getData().sort((s1: Session, s2: Session) => {
        if (s1.date > s2.date) return 1;
        if (s1.date < s2.date) return -1;
        return 0;
      })

      this.getSessionsActive().sort((s1: Session, s2: Session) => {
        if (s1.date > s2.date) return 1;
        if (s1.date < s2.date) return -1;
        return 0;
      })
    }
  }

  sortSessionNbJoueur(): void {
    if (!this.sortByNbJoueur) {
      this.sortByDate = false;
      this.sortById = false;
      this.sortByNbJoueur = true;

      this.getData().sort((s1: Session, s2: Session) => {
        if (s1.joueur.length > s2.joueur.length) return -1;
        if (s1.joueur.length < s2.joueur.length) return 1;
        return 0;
      })

      this.getSessionsActive().sort((s1: Session, s2: Session) => {
        if (s1.joueur.length > s2.joueur.length) return -1;
        if (s1.joueur.length < s2.joueur.length) return 1;
        return 0;
      })
    }
    else {
      this.sortByNbJoueur = false;

      this.getData().sort((s1: Session, s2: Session) => {
        if (s1.joueur.length > s2.joueur.length) return 1;
        if (s1.joueur.length < s2.joueur.length) return -1;
        return 0;
      })

      this.getSessionsActive().sort((s1: Session, s2: Session) => {
        if (s1.joueur.length > s2.joueur.length) return 1;
        if (s1.joueur.length < s2.joueur.length) return -1;
        return 0;
      })
    }
  }

  createSession(jeu: string, nom: string): void {
    if (jeu != "" && nom != "" && this.jeuId != -1) {
      // new Session(nom, new Date(), (<any>Game)[jeu], false, []);
      this.showList = true;
      this.jeuSession = "";
      this.router.navigate(['/panel/sessions']);
    }
  }

  save() : void {
    this.selected_session!.nom = this.session_nom;
    this.selected_session!.jeu = (<any>Game)[this.jeuSession]
    this.selected_session!.jeuId = this.jeuId;
    this.router.navigate(['/panel/sessions']);
  }

  changeJeuSession(jeu: string) {
    this.jeuSession = jeu;
    this.jeuId = -1;
  }

  changeJeuId(id: number) {
    this.jeuId = id;
  }

  showSessionActive(): void {
    this.showActive = true;
  }

  showSessionInactive(): void {
    this.showActive = false;
  }



  getSessionRecopier(s: Session): Recopier | null {
    this.id_game = s.jeuId;
    return this.getRecopier(s.id);
  }



  getSessionMemory(s: Session): Memory | null {
    this.id_game = s.jeuId;
    return this.getMemory(s.id);
  }


  getSessionReconnaitre(s: Session): Reconnaitre | null {
    this.id_game = s.jeuId;
    return this.getReconnaitre(s.id);
  }


  getSessionAbecedaire(s: Session): Abecedaire | null {
    this.id_game = s.jeuId;
    return this.getAbecedaire(s.id);
  }


  getSessionBoyGirl(s: Session): BoyGirl | null {
    this.id_game = s.jeuId;
    return this.getFilleGarcon(s.id);
  }

  getSessionPuzzle(s: Session): Puzzle | null {
    this.id_game = s.jeuId;
    return this.getPuzzle(s.id);
  }

}
