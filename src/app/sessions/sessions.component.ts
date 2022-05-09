import { Component, Input, OnInit } from '@angular/core';
import { Session } from './Session';
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
import { JeuxService } from '../jeux.service';
import { PanelComponent } from '../panel/panel.component';
import { Image } from '../Image'

export interface Jeu {
  type: string;
  id_jeu: number;
}

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  list_image: Image[] = [];

  recupRecopier(tab: any) {
    this.jeuxService.recup_recopier(tab).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        tab.push(
          new Recopier(data[i].id_recopier, data[i].date_recopier, this.getImage(data[i].id_image), data[i].bg_color, data[i].text_color, data[i].title_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_bo, data[i].bu_text_co, data[i].i_bg_co, data[i].i_text_co, data[i].type_ecri, data[i].isVoca)
        );
      }

    })
  }

  recupMemory(donne: any) {
    this.jeuxService.recup_memory(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        donne.push(
          new Memory(data[i].id_memory, data[i].date_memory, this.getImage(data[i].id_image).slice(1), this.getImage(data[i].id_image)[0], data[i].isVoca, data[i].nb_pair, [data[i].sett0, data[i].sett1], data[i].bg_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].tmps)
        );
      }
    })

  }

  recupReconnaitre(donne: any) {
    this.jeuxService.recup_reconnaitre(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        console.log(data[i].id_images)

        donne.push(
          new Reconnaitre(data[i].id_reco, data[i].date_reco, this.getImage(data[i].id_images), data[i].bg_color, data[i].title_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_co, data[i].bu_txt_co, data[i].type_ecri, data[i].isVoca)
        );
      }
    })

  }

  recupAbecedaire(donne: any) {
    this.jeuxService.recup_abcd(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        donne.push(
          new Abecedaire(data[i].id_abcdr, data[i].date_abcdr, this.getImage(data[i].id_image), data[i].bg_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_co, data[i].bu_txt_co, data[i].isVoca, data[i].type_ecri)
        );
      }
    })

  }

  recupBoyGirl(donne: any) {
    this.jeuxService.recup_bg(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        donne.push(
          new BoyGirl(data[i].id_gb, data[i].date_gb, this.getMots(data[i].l_m_f), this.getMots(data[i].l_m_b), data[i].bg_color, data[i].bg_color_f, data[i].bg_color_b, data[i].bg_color_m, data[i].word_f, data[i].word_b, data[i].word_m, data[i].title_f, data[i].title_b, data[i].title_m, data[i].text_f, data[i].text_b, data[i].text_m, data[i].type_ecri)
        );
      }
    })
  }

  recupPuzzle(donne: any) {
    this.jeuxService.recup_puzzle(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        donne.push(
          new Puzzle(data[i].id_puzzle, data[i].date_puzzle, this.getImage(data[i].id_images), data[i].bg_color, data[i].title_color, data[i].text_color, data[i].bu_bg_co, data[i].bu_txt_co, data[i].type_ecri, data[i].decoupe)
        );
      }

    })

  }
  getMots(s: string): string[] {
    if (s.length != 0) {
      let tab = s.split(',');
      let res: string[] = []
      for (let mot of tab) {
        res.push(mot)
      }
      return res;
    }
    else {
      return []
    }
  }

  getImage(s: string): Image[] {
    let res = [];
    let tab = s.split(',');
    if (s.length != 0) {
      for (let i of tab) {
        for (let j of this.list_image) {
          if (+i == j.id) {
            res.push(j);
            break;
          }
        }
      }
    }
    return res;
  }

  session_id: number | null = null;
  join: boolean = false;
  isSuivi: boolean = false;
  connected: boolean = false;
  timer_redirect: number = 5;
  jeu: string = "";
  abecedaire: Abecedaire | null;
  memory: Memory | null;
  boyGirl: BoyGirl | null;
  puzzle: Puzzle | null;
  reconnaitre: Reconnaitre | null;
  recopier: Recopier | null;

  @Input() play: boolean = true;
  @Input() showList: boolean = false;
  @Input() create_session: boolean = false;
  @Input() preview: boolean = false;
  @Input() edit: boolean = false;
  @Input() view: boolean = false;

  displayedColumns: string[] = ['Active', 'Id', 'Nom', 'Date', 'Jeu', 'Nombre de joueurs', 'Actions'];
  static sessionActive: Session[] = [];
  @Input() showActive: boolean = false;



  @Input() selected_session: Session | null;
  id_game: number | null = null;
  jeuSession: string = "";
  jeuId: Jeu[] = [];
  liste_j: string[] = [];
  sortById: boolean = true;
  sortByDate: boolean = false;
  sortByNbJoueur: boolean = false;
  jeux_id: string[] = [];



  session_nom: string = "";
  list: any = { id_crea: 1, nom: this.session_nom, isSuivi: this.isSuivi, join: this.join, id: this.session_id, jeux_id: "", liste_j: this.liste_j };

  constructor(private router: Router, private route: ActivatedRoute, private jeuxService: JeuxService) {
    this.abecedaire = null;
    this.memory = null;
    this.boyGirl = null;
    this.puzzle = null;
    this.reconnaitre = null;
    this.recopier = null;
    this.selected_session = null;
    SessionsComponent.sessionActive = [];
    PanelComponent.sessionActive = [];

    this.recup(this.data)

    setTimeout(() => {
      for (let s of this.data) {
        if (s.isActive) {
          SessionsComponent.sessionActive.push(s);
          PanelComponent.sessionActive.push(s);
        }
      }
    }, 100)
  }
  data: Session[] = [];

  recupImage(donne: any) {
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        donne.push(new Image(data[i].nom, data[i].id_image));
      }
    })
  }
  recup(donne: any) {
    this.jeuxService.recup_session(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        let isJ = false;
        let isS = false;
        if (data[i].isJoinable == 1) {
          isJ = true;
        }
        if (data[i].isSuivi == 1) {
          isS = true;
        }
        donne.push(
          new Session(data[i].Id, data[i].nom, data[i].date, this.getJeuSession(data[i].Jeux_id), isJ, this.getJoueurs(data[i].liste_j, data[i].Id), isS)
        );
      }
    })

  }

  getJeuSession(s: string): Jeu[] {
    let res: Jeu[] = [];
    if (s.length > 0) {
      let tab = s.split(';');
      for (let i of tab) {
        if (i != "") {
          res.push({ type: i.split(',')[0], id_jeu: +i.split(',')[1] })
        }
      }
    }
    return res;
  }

  getJoueurs(s: string, id_session: number): Users[] {
    let tab = s.split(';');
    let res = []
    for (let i of tab) {
      if (i.length != 0) {
        res.push(
          new Users(i.split(',')[0], id_session, +i.split(',')[2], +i.split(',')[3])
        );
      }
    }
    return res;
  }

  setJoueurs(s: Session): string {
    let res = "";

    for (let j of s.joueur) {
      res += j.nom + ',' + s.id + ',' + j.compteur_erreur + ',' + j.progression + ';'
    }

    return res;
  }

  onSend(list: any) {

    const formData: FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('session', JSON.stringify(list));
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        console.log(res.name);
      },

      error: err => {
        console.log(err);
      },

    });
  }
  onSend_delete(id: any) {

    const formData: FormData = new FormData();
    /*for(var i = 0;i<id.lenght;i++){
      formData.append('id[]',id[i]);
    }*/
    formData.append('session_delete', id);
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        console.log(res);

      },

      error: err => {
        console.log(err);
      },

    });
  }
  onSend_update(list: any) {

    const formData: FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('session_update', JSON.stringify(list));
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        console.log(res.name);
      },

      error: err => {
        console.log(err);
      },

    });
  }
  ngOnInit(): void {

    this.recupImage(this.list_image);
    this.recupRecopier(this.recopier_list);
    this.recupMemory(this.memory_list);
    this.recupReconnaitre(this.reconnaitre_list);
    this.recupAbecedaire(this.abecedaire_list);
    this.recupBoyGirl(this.boygirl_list);
    this.recupPuzzle(this.puzzle_list);

    console.log(this.data)
    setTimeout(() => {
      if (this.play) {
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

      if (this.edit) {

        this.create_session = true;
        this.session_nom = this.selected_session!.nom;
        this.jeuId = this.selected_session!.jeuId;

      }
    }, 200)

  }

  getSessionsActive(): Session[] {
    return SessionsComponent.sessionActive;
  }

  getSession(): Session | null {
    for (let s of this.data) {
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
    this.list = { nom: this.getSession()!.nom, isSuivi: +this.getSession()!.isSuivi, join: +this.getSession()!.isActive, id: this.getSession()!.id, jeux_id: this.setJeuSession(this.getSession()!), liste_j: this.setJoueurs(this.getSession()!) };
    this.onSend_update(this.list);

  }



  addUser(name: string): void {
    this.getSession()!.joueur.push((new Users(name, Session.number, 0, 0)));

  }

  deleteUser(str: string): void {

  }

  getData(): Session[] {
    return SessionsComponent.data;
  }

  parseDate(date: Date): string {
    let month: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let index: number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  }

  static data: Session[] = [];

  recopier_list: Recopier[] = [];

  reconnaitre_list: Reconnaitre[] = [];

  boygirl_list: BoyGirl[] = [];

  abecedaire_list: Abecedaire[] = []

  memory_list: Memory[] = [];

  puzzle_list: Puzzle[] = [];


  addJeu(type: string, id: number): void {

  }

  previsualiserGame(element: Session): void {
    this.preview = true;
    this.showList = false;
    this.selected_session = element;
  }

  editSession(session: Session): void {
    this.router.navigate(['/panel/sessions/edit', session.id]);
  }

  deleteSession(session: Session): void {
    this.onSend_delete(session.id);

    setTimeout(() => {
      this.data = [];
      this.recup(this.data);
    }, 200)

    SessionsComponent.sessionActive = []
    PanelComponent.sessionActive = []
    setTimeout(() => {

      for (let s of this.data) {
        if (s.isActive) {
          SessionsComponent.sessionActive.push(s);
          PanelComponent.sessionActive.push(s);
        }
      }
    }, 200)
  }


  setJeuSession(s: Session): string {
    let res = "";
    for (let g of s.jeuId) {
      console.log(g)
      res += g.type + ',' + g.id_jeu + ';'
    }
    return res;
  }

  joinSession(s: Session): void {
    this.selected_session = s;
    this.view = true;
    this.showList = false;

    setInterval(() => {
      this.data = []
      this.recup(this.data)
    }, 2000)

    setInterval(() => {
      this.session_id = s.id;
      s = this.getSession()!;
      console.log(s);
      this.selected_session = s;
    }, 5000)
  }

  quitView() : void {
    window.location.href = '/panel/sessions'
  }


  setSessionActive(s: Session): void {
    s.isActive = true;
    this.list = { nom: s.nom, isSuivi: +s.isSuivi, join: 1, id: +s.id, jeux_id: this.setJeuSession(s), liste_j: this.setJoueurs(s) };
    this.onSend_update(this.list);

    setTimeout(() => {
      this.data = [];
      this.recup(this.data);
    }, 200)

    SessionsComponent.sessionActive = []
    PanelComponent.sessionActive = []
    setTimeout(() => {

      for (let s of this.data) {
        if (s.isActive) {
          SessionsComponent.sessionActive.push(s);
          PanelComponent.sessionActive.push(s);
        }
      }
    }, 400)



  }

  setSessionInactive(s: Session): void {
    s.isActive = false;
    this.list = { nom: s.nom, isSuivi: +s.isSuivi, join: 0, id: +s.id, jeux_id: this.setJeuSession(s), liste_j: this.setJoueurs(s) };
    console.log(this.list)

    this.onSend_update(this.list);

    setTimeout(() => {
      this.data = [];
      this.recup(this.data);
    }, 200)

    SessionsComponent.sessionActive = []
    PanelComponent.sessionActive = []
    setTimeout(() => {

      for (let s of this.data) {
        if (s.isActive) {
          SessionsComponent.sessionActive.push(s);
          PanelComponent.sessionActive.push(s);
        }
      }
    }, 400)
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
    if (jeu != "" && nom != "") {
      // new Session(nom, new Date(), (<any>Game)[jeu], false, []);
      this.showList = true;
      this.jeuSession = "";
      this.router.navigate(['/panel/sessions']);
    }
  }

  save(): void {
    this.selected_session!.nom = this.session_nom;
    this.selected_session!.jeuId = this.jeuId;
    this.router.navigate(['/panel/sessions']);
  }

  changeJeuSession(jeu: string) {
    this.jeuSession = jeu;
    // this.jeuId = -1;
  }

  changeJeuId(id: number) {
    // this.jeuId = id;
  }

  showSessionActive(): void {
    this.showActive = true;
  }

  showSessionInactive(): void {
    this.showActive = false;
  }



  //   getSessionRecopier(s: Session): Recopier | null {
  //     this.id_game = s.jeuId;
  //     return this.getRecopier(s.id);
  //   }



  //   getSessionMemory(s: Session): Memory | null {
  //     this.id_game = s.jeuId;
  //     return this.getMemory(s.id);
  //   }


  //   getSessionReconnaitre(s: Session): Reconnaitre | null {
  //     this.id_game = s.jeuId;
  //     return this.getReconnaitre(s.id);
  //   }


  //   getSessionAbecedaire(s: Session): Abecedaire | null {
  //     this.id_game = s.jeuId;
  //     return this.getAbecedaire(s.id);
  //   }


  //   getSessionBoyGirl(s: Session): BoyGirl | null {
  //     this.id_game = s.jeuId;
  //     return this.getFilleGarcon(s.id);
  //   }

  //   getSessionPuzzle(s: Session): Puzzle | null {
  //     this.id_game = s.jeuId;
  //     return this.getPuzzle(s.id);
  //   }

}
