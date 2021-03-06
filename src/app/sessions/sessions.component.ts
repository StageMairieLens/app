import { Component, Input, OnInit } from '@angular/core';
import { Session } from './Session';
import { ActivatedRoute, Router } from '@angular/router';
import { Abecedaire } from '../abecedaire/Abecedaire';
import { Memory } from '../memory/Memory';
import { BoyGirl } from '../boy-girl-game/BoygGirl';
import { Puzzle } from '../puzzle/Puzzle';
import { Reconnaitre } from '../reconnaitre/Reconnaitre';
import { Recopier } from '../recopier-game/Recopier';
import { JeuxService } from '../jeux.service';
import { PanelComponent } from '../panel/panel.component';
import { Image } from '../Image'
import { ThemeComponent } from '../theme/theme.component';
import { RecopierGameComponent } from '../recopier-game/recopier-game.component';
import { MemoryComponent } from '../memory/memory.component';
import { ReconnaitreComponent } from '../reconnaitre/reconnaitre.component';
import { AbecedaireComponent } from '../abecedaire/abecedaire.component';
import { PuzzleComponent } from '../puzzle/puzzle.component';

export interface Jeu {
  type: string;
  id_jeu: number;
}

export interface Guest {
  id: number;
  nom: string;
  progress_jeu: Progression[];
}

export interface Progression {
  id_jeu: number;
  cpt_erreur: number;
  progress: number;
}

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  static onSend_update(list: { nom: string; isSuivi: number; join: number; id: number; jeux_id: string; liste_j: string; }) {
    throw new Error('Method not implemented.');
  }
  list_image: Image[] = [];
  pseudo_prof:string=localStorage.getItem('id_pseudo')!;
  recupRecopier(tab: any) {
    this.jeuxService.recup_recopier(tab).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          tab.push(
            new Recopier(data[i].id_recopier, data[i].date_recopier, this.getImage(data[i].id_image), data[i].bg_color, data[i].text_color, data[i].title_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_bo, data[i].bu_text_co, data[i].i_bg_co, data[i].i_text_co, data[i].type_ecri, data[i].isVoca, data[i].id_crea)
          );
        }
      }

    })
  }

  recupMemory(donne: any) {
    this.jeuxService.recup_memory(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          donne.push(
            new Memory(data[i].id_memory, data[i].date_memory, this.getImage(data[i].id_image).slice(1), this.getImage(data[i].id_image)[0], data[i].isVoca, data[i].nb_pair, [data[i].sett0, data[i].sett1], data[i].bg_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].tmps, data[i].id_crea)
          );
        }
      }
    })

  }

  recupReconnaitre(donne: any) {
    this.jeuxService.recup_reconnaitre(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          donne.push(
            new Reconnaitre(data[i].id_reco, data[i].date_reco, this.getImage(data[i].id_images), data[i].bg_color, data[i].title_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_co, data[i].bu_txt_co, data[i].type_ecri, data[i].isVoca, data[i].id_crea)
          );
        }
      }
    })

  }

  recupAbecedaire(donne: any) {
    this.jeuxService.recup_abcd(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          donne.push(
            new Abecedaire(data[i].id_abcdr, data[i].date_abcdr, this.getImage(data[i].id_image), data[i].bg_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_co, data[i].bu_txt_co, data[i].isVoca, data[i].type_ecri, data[i].id_crea)
          );
        }
      }
    })

  }

  recupBoyGirl(donne: any) {
    this.jeuxService.recup_bg(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          donne.push(
            new BoyGirl(data[i].id_gb, data[i].date_gb, this.getMots(data[i].l_m_f), this.getMots(data[i].l_m_b), data[i].bg_color, data[i].bg_color_f, data[i].bg_color_b, data[i].bg_color_m, data[i].word_f, data[i].word_b, data[i].word_m, data[i].title_f, data[i].title_b, data[i].title_m, data[i].text_f, data[i].text_b, data[i].text_m, data[i].type_ecri, data[i].id_crea)
          );
        }
      }
    })
  }

  recupPuzzle(donne: any) {
    this.jeuxService.recup_puzzle(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          donne.push(
            new Puzzle(data[i].id_puzzle, data[i].date_puzzle, this.getImage(data[i].id_images), data[i].bg_color, data[i].title_color, data[i].text_color, data[i].bu_bg_co, data[i].bu_txt_co, data[i].type_ecri, data[i].decoupe, data[i].id_crea)
          );
        }
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
  isSuivi: boolean = true;
  connected: boolean = false;
  previsualiserJeuSession: boolean = false;
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
  @Input() inPlay: boolean = false;

  displayedColumns: string[] = ['Active', 'Id', 'Nom', 'Date', 'Jeu', 'Nombre de joueurs', 'Actions'];
  static sessionActive: Session[] = [];
  @Input() showActive: boolean = false;

  isJoinable = true;



  @Input() selected_session: Session | null;
  id_game: number | null = null;
  jeuSession: string = "";
  liste_j: string[] = [];
  jeuId: Jeu[] = [];
  sortById: boolean = true;
  sortByDate: boolean = false;
  sortByNbJoueur: boolean = false;
  jeux_id: string[] = [];

  jeuSelected: string = "";
  jeuSelected_id: number | null = null;

  session_nom: string = "";
  list: any = { table: "Session", id_crea: +localStorage.getItem('id_crea')!, nom: this.session_nom, isSuivi: +this.isSuivi, join: +this.isJoinable, id: this.session_id, jeux_id: "", liste_j: "" };

  constructor(private router: Router, private route: ActivatedRoute, private jeuxService: JeuxService) {
    this.abecedaire = null;
    this.memory = null;
    this.boyGirl = null;
    this.puzzle = null;
    this.reconnaitre = null;
    this.recopier = null;
    this.selected_session = null;
    SessionsComponent.sessionActive = [];
  }

  data: Session[] = [];

  recupImage(donne: any) {//R??cupere les images
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        donne.push(new Image(data[i].nom, data[i].id_image, data[i].id_crea));
      }
    })
  }
  recup(donne: any) {//R??cupere les sessions cr??e par l'utilisateur
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
        if(localStorage.getItem('id_crea') == null) {
          donne.push(
            new Session(data[i].Id, data[i].nom, data[i].date, this.getJeuSession(data[i].Jeux_id), isJ, this.getJoueurs(data[i].liste_j, data[i].Id), isS, +data[i].id_crea)
          );
        }else {
          if(data[i].id_crea == +localStorage.getItem('id_crea')!) {
            donne.push(
              new Session(data[i].Id, data[i].nom, data[i].date, this.getJeuSession(data[i].Jeux_id), isJ, this.getJoueurs(data[i].liste_j, data[i].Id), isS, +data[i].id_crea)
            );
          }
        }
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

  getJoueurs(s: string, id_session: number): Guest[] {
    let tab = s.split(';');
    let res = []
    for (let i of tab) {
      let progression: Progression[] = []
      if (i.length != 0) {
        for (let p of i.split(',[')) {
          for (let p2 of p.split(']')) {
            if (p2 != "" && p2.split(',').length == 3) {
              progression.push(
                { id_jeu: +p2.split(',')[0], cpt_erreur: +p2.split(',')[1], progress: +p2.split(',')[2] }
              )
            }
          }
        }
        res.push(
          { id: +i.split(',')[0], nom: i.split(',')[1], progress_jeu: progression }
        );
      }
    }
    return res;
  }

  setJoueurs(s: Session): string {
    let res = "";

    for (let j of s.joueur) {
      res += j.id + ',' + j.nom;
      for (let p of j.progress_jeu) {
        res += ',[' + p.id_jeu + ',' + p.cpt_erreur + ',' + p.progress + ']'
      }
      res += ';'
    }

    return res;
  }

  onSend(list: any) {//Ajoute la session

    const formData: FormData = new FormData();
    formData.append('send', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }
  onSend_delete(id: any) {//Delete la session

    const formData: FormData = new FormData();
    var list={table:'Session',id:id,id_table:'Id'};//Ajoute le nom de la table,le nom de l'id de la table et le numero de l'id
    formData.append('delete', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }
  onSend_update(list: any) {//Update la session

    const formData: FormData = new FormData();
    
    formData.append('session_update', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }
  ngOnInit(): void {


    this.recupImage(this.list_image);


    setTimeout(() => {
      this.recupRecopier(this.recopier_list);
      this.recupMemory(this.memory_list);
      this.recupReconnaitre(this.reconnaitre_list);
      this.recupAbecedaire(this.abecedaire_list);
      this.recupBoyGirl(this.boygirl_list);
      this.recupPuzzle(this.puzzle_list);
      this.recup(this.data)
    }, 200)


    setTimeout(() => {
      for (let s of this.data) {
        if (s.isActive) {
          SessionsComponent.sessionActive.push(s);
        }
      }
    }, 400)

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
        this.isSuivi = this.selected_session!.isSuivi;
        this.list = { table: "Session", nom: this.selected_session!.nom, isSuivi: +this.isSuivi, join: +this.selected_session!.isActive, id: +this.selected_session!.id, jeux_id: this.setJeuSession(this.selected_session!.jeuId), liste_j: this.setJoueurs(this.selected_session!) };
      }
    }, 800)

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

  getConnected(): boolean {
    if (localStorage.getItem('id_user') != null) {
      for (let j of this.getSession()!.joueur) {
        if (j.id == +localStorage.getItem('id_user')!) {
          return true;
        }
      }
    }
    localStorage.removeItem('id_user')
    return false;
  }

  connect(name: string): void {
    this.data = [];
    this.recup(this.data);

    setTimeout(() => {
      this.addUser(name);
      this.list = { table: "Session", nom: this.getSession()!.nom, isSuivi: +this.getSession()!.isSuivi, join: +this.getSession()!.isActive, id: this.getSession()!.id, jeux_id: this.setJeuSession(this.getSession()!.jeuId), liste_j: this.setJoueurs(this.getSession()!) };
      this.onSend_update(this.list);
    }, 200)

  }


  addUser(name: string): void {
    let id = this.getSession()!.joueur.length;

    for (let j of this.getSession()!.joueur) {
      if (j.id == id) {
        id++;
      }
    }

    let progress: Progression[] = []

    for (let i = 0; i < this.getSession()!.jeuId.length; i++) {
      progress.push(
        { id_jeu: i, cpt_erreur: 0, progress: 0 }
      )
    }

    this.getSession()!.joueur.push(
      { id: id, nom: name, progress_jeu: progress }
    );

    localStorage.setItem('id_user', id.toString());
  }

  getData(): Session[] {
    return SessionsComponent.data;
  }

  static data: Session[] = [];

  recopier_list: Recopier[] = [];

  reconnaitre_list: Reconnaitre[] = [];

  boygirl_list: BoyGirl[] = [];

  abecedaire_list: Abecedaire[] = []

  memory_list: Memory[] = [];

  puzzle_list: Puzzle[] = [];


  addJeu(type: string, id: number): void {

    switch (type) {
      case 'Recopier':
        if (this.containRecopier(this.getRecopier(id)!)) {
          this.deleteRecopier(this.getRecopier(id)!);
        } else {
          this.addRecopier(this.getRecopier(id)!)
        }
        break;
      case 'Reconnaitre':
        if (this.containReconnaitre(this.getReconnaitre(id)!)) {
          this.deleteReconnaitre(this.getReconnaitre(id)!)
        } else {
          this.addReconaitre(this.getReconnaitre(id)!)
        }
        break;
      case 'Memory':
        if (this.containMemory(this.getMemory(id)!)) {
          this.deleteMemory(this.getMemory(id)!)
        } else {
          this.addMemory(this.getMemory(id)!)
        }
        break;
      case 'Abecedaire':
        if (this.containAbecedaire(this.getAbecedaire(id)!)) {
          this.deleteAbecedaire(this.getAbecedaire(id)!)
        } else {
          this.addAbecedaire(this.getAbecedaire(id)!)
        }
        break;
      case 'Fille&Gar??on':
        if (this.containBoyGirl(this.getBoyGirl(id)!)) {
          this.deleteBoyGirl(this.getBoyGirl(id)!)
        } else {
          this.addBoyGirl(this.getBoyGirl(id)!)
        }
        break;
      case 'Puzzle':
        if (this.containPuzzle(this.getPuzzle(id)!)) {
          this.deletePuzzle(this.getPuzzle(id)!)
        } else {
          this.addPuzzle(this.getPuzzle(id)!)
        }
        break
    }
  }

  deleteJeu(type: string, id: number): void {
    switch (type) {
      case ('Recopier'):
        this.deleteRecopier(this.getRecopier(id)!)
        break;
      case ('Reconnaitre'):
        this.deleteReconnaitre(this.getReconnaitre(id)!)
        break;
      case ('Memory'):
        this.deleteMemory(this.getMemory(id)!)
        break;
      case ('Abecedaire'):
        this.deleteAbecedaire(this.getAbecedaire(id)!)
        break;
      case ('Fille&Gar??on'):
        this.deleteBoyGirl(this.getBoyGirl(id)!)
        break;
      case ('Puzzle'):
        this.deletePuzzle(this.getPuzzle(id)!)
        break;
    }
  }

  getUser(): Guest | null {
    for (let u of this.getSession()!.joueur) {
      if (u.id == +localStorage.getItem('id_user')!) {
        return u;
      }
    }
    return null;
  }

  getProgressionJeu(type: string, id: number): number {
    return this.getUser()!.progress_jeu[this.getJeuById(type, id)].progress;
  }

  previsualiserGame(element: Session): void {
    this.preview = true;
    this.showList = false;
    this.session_id = element.id;
    this.selected_session = element;
  }

  editSession(session: Session): void {
    this.router.navigate(['/panel/sessions/edit', session.id]);
  }


  deleteSession(session: Session): void {
    this.onSend_delete(session.id);

    let theme: ThemeComponent = new ThemeComponent(this.route, this.jeuxService, this.router);
    theme.recup2(theme.data);

    setTimeout(() => {
      for (let t of theme.test) {
        if (t.id_session == session.id) {
          theme.onSend_delete(t.id_theme);
          for(let j of theme.getTheme(t.id_theme).id_jeux.split(';')) {
            if(j.split(',')[0] == 'Recopier') {
              let rc : RecopierGameComponent = new RecopierGameComponent(this.route, this.jeuxService,this.router);
              rc.onSend_delete(j.split(',')[1])
            }
            if(j.split(',')[0] == 'Memory') {
              let mc : MemoryComponent = new MemoryComponent(this.route, this.jeuxService,this.router);
              mc.onSend_delete(j.split(',')[1])
            }
            if(j.split(',')[0] == 'Reconnaitre') {
              let rc : ReconnaitreComponent = new ReconnaitreComponent(this.route, this.jeuxService,this.router);
              rc.onSend_delete(j.split(',')[1])
            }
            if(j.split(',')[0] == 'Abecedaire') {
              let abc : AbecedaireComponent = new AbecedaireComponent(this.route, this.jeuxService,this.router);
              abc.onSend_delete(j.split(',')[1])
            }
            if(j.split(',')[0] == 'Puzzle') {
              let pc : PuzzleComponent = new PuzzleComponent(this.route, this.jeuxService,this.router);
              pc.onSend_delete(j.split(',')[1])
            }
          }
        }
      }
    }, 200)

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


  setJeuSession(tab: Jeu[]): string {
    let res = "";
    for (let g of tab) {
      res += g.type + ',' + g.id_jeu + ';'
    }
    return res;
  }

  joinSession(s: Session): void {
    let n = 0
    this.selected_session = s;
    this.view = true;
    this.showList = false;

    setInterval(() => {
      n++;
      setTimeout(() => {
        this.data = []
        this.recup(this.data)
      }, 2000)
      this.session_id = s.id;
      s = this.getSession()!;
      this.selected_session = s;

    }, 3000)
  }

  quitView(): void {
    window.location.href = '/panel/sessions'
  }


  setSessionActive(s: Session): void {
    s.isActive = true;
    this.list = { nom: s.nom, isSuivi: +s.isSuivi, join: 1, id: +s.id, jeux_id: this.setJeuSession(s.jeuId), liste_j: this.setJoueurs(s) };
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
    this.list = { nom: s.nom, isSuivi: +s.isSuivi, join: 0, id: +s.id, jeux_id: this.setJeuSession(s.jeuId), liste_j: this.setJoueurs(s) };

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
      this.list = { table: "Session", id_crea: +localStorage.getItem('id_crea')!, nom: this.session_nom, isSuivi: +this.isSuivi, join: 0, id: 0, jeux_id: this.setJeuSession(this.jeuId), liste_j: "" };
      this.onSend(this.list);
      this.router.navigate(['/panel/sessions']);
    }
  }

  save(): void {
    this.list = { nom: this.session_nom, isSuivi: +this.isSuivi, join: +this.selected_session!.isActive, id: +this.selected_session!.id, jeux_id: this.setJeuSession(this.jeuId), liste_j: this.setJoueurs(this.selected_session!) };
    this.onSend_update(this.list)
    this.router.navigate(['/panel/sessions']);
  }

  changeJeuSession(jeu: string) {
    this.jeuSession = jeu;
  }

  // RECOPIER LISTE CREATION SESSION
  addRecopier(r: Recopier): void {
    this.jeuId.push(
      { type: "Recopier", id_jeu: r.id }
    )
  }

  deleteRecopier(r: Recopier): void {
    let index = -1;
    for (let g of this.jeuId) {
      if (g.type == 'Recopier' && g.id_jeu == r.id) {
        index = this.jeuId.indexOf(g, 0);
      }
    }

    if (index > -1) {
      this.jeuId.splice(index, 1);
    }
  }

  containRecopier(r: Recopier): boolean {
    for (let g of this.jeuId) {
      if (g.type == 'Recopier' && g.id_jeu == r.id) {
        return true;
      }
    }
    return false;
  }


  // MEMORY LISTE CREATION SESSION
  addMemory(m: Memory): void {
    this.jeuId.push(
      { type: "Memory", id_jeu: m.id }
    )
  }

  deleteMemory(m: Memory): void {
    let index = -1;
    for (let g of this.jeuId) {
      if (g.type == 'Memory' && g.id_jeu == m.id) {
        index = this.jeuId.indexOf(g, 0);
      }
    }

    if (index > -1) {
      this.jeuId.splice(index, 1);
    }
  }

  containMemory(m: Memory): boolean {
    for (let g of this.jeuId) {
      if (g.type == 'Memory' && g.id_jeu == m.id) {
        return true;
      }
    }
    return false;
  }

  // RECONNAITRE LISTE CREATION SESSION
  addReconaitre(r: Reconnaitre): void {
    this.jeuId.push(
      { type: "Reconnaitre", id_jeu: r.id }
    )
  }

  deleteReconnaitre(r: Reconnaitre): void {
    let index = -1;
    for (let g of this.jeuId) {
      if (g.type == 'Reconnaitre' && g.id_jeu == r.id) {
        index = this.jeuId.indexOf(g, 0);
      }
    }

    if (index > -1) {
      this.jeuId.splice(index, 1);
    }
  }

  containReconnaitre(r: Reconnaitre): boolean {
    for (let g of this.jeuId) {
      if (g.type == 'Reconnaitre' && g.id_jeu == r.id) {
        return true;
      }
    }
    return false;
  }

  // ABECEDAIRE LISTE CREATION SESSION
  addAbecedaire(a: Abecedaire): void {
    this.jeuId.push(
      { type: "Abecedaire", id_jeu: a.id }
    )
  }

  deleteAbecedaire(a: Abecedaire): void {
    let index = -1;
    for (let g of this.jeuId) {
      if (g.type == 'Abecedaire' && g.id_jeu == a.id) {
        index = this.jeuId.indexOf(g, 0);
      }
    }

    if (index > -1) {
      this.jeuId.splice(index, 1);
    }
  }

  containAbecedaire(a: Abecedaire): boolean {
    for (let g of this.jeuId) {
      if (g.type == 'Abecedaire' && g.id_jeu == a.id) {
        return true;
      }
    }
    return false;
  }

  // Fille&Gar??on LISTE CREATION SESSION
  addBoyGirl(bg: BoyGirl): void {
    this.jeuId.push(
      { type: "Fille&Gar??on", id_jeu: bg.id }
    )
  }

  deleteBoyGirl(bg: BoyGirl): void {
    let index = -1;
    for (let g of this.jeuId) {
      if (g.type == 'Fille&Gar??on' && g.id_jeu == bg.id) {
        index = this.jeuId.indexOf(g, 0);
      }
    }

    if (index > -1) {
      this.jeuId.splice(index, 1);
    }
  }

  containBoyGirl(bg: BoyGirl): boolean {
    for (let g of this.jeuId) {
      if (g.type == 'Fille&Gar??on' && g.id_jeu == bg.id) {
        return true;
      }
    }
    return false;
  }

  // Puzzle LISTE CREATION SESSION
  addPuzzle(p: Puzzle): void {
    this.jeuId.push(
      { type: "Puzzle", id_jeu: p.id }
    )
  }

  deletePuzzle(p: Puzzle): void {
    let index = -1;
    for (let g of this.jeuId) {
      if (g.type == 'Puzzle' && g.id_jeu == p.id) {
        index = this.jeuId.indexOf(g, 0);
      }
    }

    if (index > -1) {
      this.jeuId.splice(index, 1);
    }
  }

  containPuzzle(p: Puzzle): boolean {
    for (let g of this.jeuId) {
      if (g.type == 'Puzzle' && g.id_jeu == p.id) {
        return true;
      }
    }
    return false;
  }

  getRecopier(id: number): Recopier | null {
    for (let r of this.recopier_list) {
      if (r.id == id) {
        return r;
      }
    }
    return null;
  }

  getReconnaitre(id: number): Reconnaitre | null {
    for (let r of this.reconnaitre_list) {
      if (r.id == id) {
        return r;
      }
    }
    return null;
  }

  getMemory(id: number): Memory | null {
    for (let m of this.memory_list) {
      if (m.id == id) {
        return m;
      }
    }
    return null;
  }

  getAbecedaire(id: number): Abecedaire | null {
    for (let a of this.abecedaire_list) {
      if (a.id == id) {
        return a;
      }
    }
    return null;
  }

  getBoyGirl(id: number): BoyGirl | null {
    for (let bg of this.boygirl_list) {
      if (bg.id == id) {
        return bg;
      }
    }
    return null
  }

  getPuzzle(id: number): Puzzle | null {
    for (let p of this.puzzle_list) {
      if (p.id == id) {
        return p;
      }
    }
    return null;
  }

  previewGame(type: string, id: number): void {
    this.previsualiserJeuSession = true;

    switch (type) {
      case ('Recopier'):
        this.jeu = 'Recopier'
        this.recopier = this.getRecopier(id)!
        break;
      case ('Reconnaitre'):
        this.jeu = 'Reconnaitre'
        this.reconnaitre = this.getReconnaitre(id)!
        break;
      case ('Memory'):
        this.jeu = 'Memory'
        this.memory = this.getMemory(id)!
        break;
      case ('Abecedaire'):
        this.jeu = 'Abecedaire'
        this.abecedaire = this.getAbecedaire(id)!
        break;
      case ('Fille&Gar??on'):
        this.jeu = 'Fille&Gar??on'
        this.boyGirl = this.getBoyGirl(id)!
        break;
      case ('Puzzle'):
        this.jeu = 'Puzzle'
        this.puzzle = this.getPuzzle(id)!
        break;
    }
  }

  quitSession(): void {

    this.data = []
    this.recup(this.data)

    setTimeout(() => {
      let index = -1;
      for (let j of this.getSession()!.joueur) {
        if (j.id == +localStorage.getItem('id_user')!) {
          index = this.getSession()!.joueur.indexOf(j);
        }
      }

      if (index > -1) {
        this.getSession()!.joueur.splice(index, 1);
      }

      this.list = { nom: this.getSession()!.nom, isSuivi: +this.getSession()!.isSuivi, join: +this.getSession()!.isActive, id: this.getSession()!.id, jeux_id: this.setJeuSession(this.getSession()!.jeuId), liste_j: this.setJoueurs(this.getSession()!) };
      this.onSend_update(this.list);
      localStorage.removeItem('id_user');
    }, 200);
  }

  playGame(type: string, id: number): void {
    this.inPlay = true;
    this.jeu = type;

    switch (type) {
      case 'Recopier':
        this.recopier = this.getRecopier(id);
        break;
      case 'Memory':
        this.memory = this.getMemory(id);
        break;
      case 'Reconnaitre':
        this.reconnaitre = this.getReconnaitre(id);
        break;
      case 'Abecedaire':
        this.abecedaire = this.getAbecedaire(id);
        break;
      case 'Fille&Gar??on':
        this.boyGirl = this.getBoyGirl(id);
        break;
      case 'Puzzle':
        this.puzzle = this.getPuzzle(id);
        break;
    }
  }

  playGamePreview(type: string, id: number): void {
    this.inPlay = true;
    this.jeu = type;

    switch (type) {
      case 'Recopier':
        this.recopier = this.getRecopier(id);
        break;
      case 'Memory':
        this.memory = this.getMemory(id);
        break;
      case 'Reconnaitre':
        this.reconnaitre = this.getReconnaitre(id);
        break;
      case 'Abecedaire':
        this.abecedaire = this.getAbecedaire(id);
        break;
      case 'Fille&Gar??on':
        this.boyGirl = this.getBoyGirl(id);
        break;
      case 'Puzzle':
        this.puzzle = this.getPuzzle(id);
        break;
    }
  }

  getJeuId(): number {
    for (let i = 0; i < this.selected_session!.jeuId.length; i++) {
      if (this.selected_session!.jeuId[i].type == this.jeuSelected) {
        if (this.selected_session!.jeuId[i].id_jeu == this.jeuSelected_id) {
          return i;
        }
      }
    }
    return -1;
  }

  getJeuById(type: string, id: number): number {
    for (let i = 0; i < this.getSession()!.jeuId.length; i++) {
      if (this.getSession()!.jeuId[i].type == type) {
        if (this.getSession()!.jeuId[i].id_jeu == id) {
          return i;
        }
      }
    }
    return -1;
  }

  redirectSession(): void {
    window.location.href = '/session/' + this.getSession()!.id;
  }
}
