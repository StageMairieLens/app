import { Component, OnInit } from '@angular/core';
import { Game } from '../Game';
import { Progress } from '../Progress';
import { Image } from '../Image';
import { Recopier } from './../recopier-game/Recopier';
import { Router } from '@angular/router';
import { ImagesComponent } from '../images/images.component';
import { Reconnaitre } from '../reconnaitre/Reconnaitre';
import { Puzzle } from '../puzzle/Puzzle';
import { ActivatedRoute } from '@angular/router';
import { BoyGirl } from '../boy-girl-game/BoygGirl';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Abecedaire } from '../abecedaire/Abecedaire';
import { Memory } from '../memory/Memory';
import { Session } from '../sessions/Session';
import { join } from 'path';
import { Guest, Jeu, Progression, SessionsComponent } from '../sessions/sessions.component';
import { LoginComponent } from '../index/login/login.component';
import { JeuxService } from '../jeux.service';
import { Users } from '../users/Users';
import { Login } from '../index/login/Login';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  jeu: string | null = "";


  recupRecopier(tab: any) {
    this.jeuxService.recup_recopier(tab).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        tab.push(
          new Recopier(data[i].id_recopier, data[i].date_recopier, this.getImage(data[i].id_image), data[i].bg_color, data[i].text_color, data[i].title_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_bo, data[i].bu_text_co, data[i].i_bg_co, data[i].i_text_co, data[i].type_ecri, data[i].isVoca, data[i].id_crea)
        );
      }

    })
  }
  recupMemory(donne: any) {
    this.jeuxService.recup_memory(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        donne.push(
          new Memory(data[i].id_memory, data[i].date_memory, this.getImage(data[i].id_image).slice(1), this.getImage(data[i].id_image)[0], data[i].isVoca, data[i].nb_pair, [data[i].sett0, data[i].sett1], data[i].bg_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].tmps, data[i].id_crea)
        );
      }
    })

  }

  recupReconnaitre(donne: any) {
    this.jeuxService.recup_reconnaitre(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        console.log(data[i].id_images)

        donne.push(
          new Reconnaitre(data[i].id_reco, data[i].date_reco, this.getImage(data[i].id_images), data[i].bg_color, data[i].title_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_co, data[i].bu_txt_co, data[i].type_ecri, data[i].isVoca, data[i].id_crea)
        );
      }
    })

  }

  recupAbecedaire(donne: any) {
    this.jeuxService.recup_abcd(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        donne.push(
          new Abecedaire(data[i].id_abcdr, data[i].date_abcdr, this.getImage(data[i].id_image), data[i].bg_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_co, data[i].bu_txt_co, data[i].isVoca, data[i].type_ecri, data[i].id_crea)
        );
      }
    })

  }

  recupBoyGirl(donne: any) {
    this.jeuxService.recup_bg(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        donne.push(
          new BoyGirl(data[i].id_gb, data[i].date_gb, this.getMots(data[i].l_m_f), this.getMots(data[i].l_m_b), data[i].bg_color, data[i].bg_color_f, data[i].bg_color_b, data[i].bg_color_m, data[i].word_f, data[i].word_b, data[i].word_m, data[i].title_f, data[i].title_b, data[i].title_m, data[i].text_f, data[i].text_b, data[i].text_m, data[i].type_ecri, data[i].id_crea)
        );
      }
    })
  }

  recupPuzzle(donne: any) {
    this.jeuxService.recup_puzzle(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        donne.push(
          new Puzzle(data[i].id_puzzle, data[i].date_puzzle, this.getImage(data[i].id_images), data[i].bg_color, data[i].title_color, data[i].text_color, data[i].bu_bg_co, data[i].bu_txt_co, data[i].type_ecri, data[i].decoupe, data[i].id_crea)
        );
      }

    })

  }

  recupSession(donne: any) {
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

  getJoueurs(s: string, id_session: number):  Guest[] {
    let tab = s.split(';');
    let res = []
    for (let i of tab) {
      let progression : Progression[] = []
      if (i.length != 0) {
        for(let p of i.split(',[')) {
            for(let p2 of  p.split(']')) {
              if(p2 != "" && p2.split(',').length == 3) {
                progression.push(
                  { id_jeu: +p2.split(',')[0], cpt_erreur: +p2.split(',')[1], progress: +p2.split(',')[2] }
                )
              }
            }
        }
        res.push(
          { id : +i.split(',')[0], nom : i.split(',')[1], progress_jeu : progression}
        );
      }
    }
    return res;
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

  recupImage(donne: any) {
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        donne.push(new Image(data[i].nom, data[i].id_image));
      }
    })
  }





  constructor(private jeuxService: JeuxService, private router: Router, private route: ActivatedRoute) {
    // this.recopier = new Recopier(this.selectedImages, this.recopier_bg_color, this.recopier_title_color, this.recopier_text_color, this.recopier_good_answer_color, this.recopier_wrong_answer_color, this.recopier_progress, this.recopier_button_bg_color, this.recopier_button_text_color, this.recopier_input_bg_color, this.recopier_input_text_color, this.recopier_type_ecriture);
    this.recopier = null;
    this.reconnaitre = null;
    this.puzzle = null;
    this.boygirl = null;
    this.abecedaire = null;
    this.memory = null;
    this.selected_session = null;
  }

  liste_image: Image[] = ImagesComponent.list_image;
  selectedImages: Image[] = [];

  progressValue: Progress[] = [
    Progress.Blue,
    Progress.Green,
    Progress.LightBlue,
    Progress.Orange,
    Progress.Red
  ];

  previsualiser: boolean = false;

  optionGame: string[] = ['Recopier', 'Memory', 'Reconnaitre', 'Abecedaire', 'Fille&Garçon', 'Puzzle'];
  selectedGame: string | null = "";
  panel: string | null = "";
  displayedColumns: string[] = ['Active', 'Id', 'Nom', 'Date', 'Jeu', 'Nombre de joueurs', 'Actions'];
  sessions: Session[] = SessionsComponent.data;
  static sessionActive: Session[] = [];
  showActive: boolean = false;


  selected_session: Session | null;
  id_game: number | null = null;
  session_id: number | null = null;
  panel_option: string | null = "";
  create_session: boolean = false;
  jeuSession: string = "";
  jeuId: number = -1;

  sortById: boolean = true;
  sortByDate: boolean = false;
  sortByNbJoueur: boolean = false;



  // VARIABLE JEU RECOPIER
  recopier: Recopier | null;
  recopier_list: Recopier[] = [];



  // VARIABLE JEU RECONNAITRE
  reconnaitre: Reconnaitre | null;
  reconnaitre_list: Reconnaitre[] = []

  // VARIABLE JEU PUZZLE
  puzzle: Puzzle | null;
  puzzle_list: Puzzle[] = []


  // VARIABLE JEU BOY&GIRL
  boygirl: BoyGirl | null;
  boygirl_list: BoyGirl[] = []

  // VARIABLE JEU ABECEDAIRE
  abecedaire: Abecedaire | null;
  abecedaire_list: Abecedaire[] = [];

  //VARIABLE JEU MEMORY
  memory: Memory | null;
  memory_list: Memory[] = []


  // ETAPE D'AVANCEMENT FORMULAIRE
  formStep: number = 0;



  ngOnInit(): void {

    this.recupImage(this.liste_image)
    this.recupRecopier(this.recopier_list);
    this.recupMemory(this.memory_list);
    this.recupReconnaitre(this.reconnaitre_list);
    this.recupAbecedaire(this.abecedaire_list);
    this.recupBoyGirl(this.boygirl_list);
    this.recupPuzzle(this.puzzle_list);
    this.recupSession(this.sessions);






    setTimeout(() => {



      this.panel = this.route.snapshot.paramMap.get('param1');

      if (this.panel != null) {
        if (this.panel == 'create') {
          this.jeu = this.route.snapshot.paramMap.get('param2');
          if (this.jeu != null) {
            if (this.optionGame.includes(this.jeu)) {
              this.selectedGame = this.jeu;
            } else {
              this.router.navigate(['/panel']);
            }
          } else {
            this.selectedGame = "";
          }
        }

        if (this.panel == 'sessions') {
          this.panel_option = this.route.snapshot.paramMap.get('param2');

          if (this.panel_option != null) {
            if (this.panel_option == 'edit') {
              if (this.route.snapshot.paramMap.get('param3') != null) {
                this.session_id = +this.route.snapshot.paramMap.get('param3')!;
                if (this.session_id == null) {
                  this.router.navigate(['/panel/sessions']);
                }
              }
            }
            else if (this.panel_option == 'active') {
              this.showActive = true;
            }

            else if (this.panel_option == 'create') {
              this.create_session = true;
            }

            else {
              this.router.navigate(['/panel/sessions']);
            }
          } else {
            this.router.navigate(['/panel/sessions']);
          }
        }

        if (this.optionGame.includes(this.panel!)) {
          this.selectedGame = this.panel;
          this.panel_option = this.route.snapshot.paramMap.get('param2');

          if (this.panel_option == null) {
            this.panel_option = 'showList';
          }
          else if (this.panel_option == 'edit') {

            if (this.route.snapshot.paramMap.get('param3') != null) {
              this.id_game = +this.route.snapshot.paramMap.get('param3')!;

              if (this.id_game == null) {
                this.router.navigate(['/panel/', this.selectedGame]);
              }
              else if (this.selectedGame == 'Recopier') {
                if (this.getRecopier()! == null) {
                  this.router.navigate(['/panel/Recopier']);
                } else {
                  this.recopier = this.getRecopier();
                }
              }
              else if (this.selectedGame == 'Memory') {
                if (this.getMemory()! == null) {
                  this.router.navigate(['/panel/Memory']);
                } else {
                  this.memory = this.getMemory();
                }
              }

              else if (this.selectedGame == 'Reconnaitre') {
                if (this.getReconnaitre()! == null) {
                  this.router.navigate(['/panel/Reconnaitre']);
                } else {
                  this.reconnaitre = this.getReconnaitre();
                }
              }
              else if (this.selectedGame == 'Puzzle') {
                if (this.getPuzzle()! == null) {
                  this.router.navigate(['/panel/Puzzle']);
                } else {
                  this.puzzle = this.getPuzzle();
                }
              }
              else if (this.selectedGame == 'Abecedaire') {
                if (this.getAbecedaire()! == null) {
                  this.router.navigate(['/panel/Abecedaire']);
                } else {
                  this.abecedaire = this.getAbecedaire();
                }
              }
              else if (this.selectedGame == 'Fille&Garçon') {
                if (this.getBoyGirl()! == null) {
                  this.router.navigate(['/panel/Fille&Garçon']);
                } else {
                  this.boygirl = this.getBoyGirl();
                }
              }

            }
          }
          else if (this.panel_option != 'create') {
            this.router.navigate(['/panel/', this.selectedGame]);
          }
        }
      }

      for (let s of this.sessions) {
        if (s.isActive) {
          PanelComponent.sessionActive.push(s);
        }
      }
    }, 500)


  }

  getImage(s: string): Image[] {
    let res = [];
    let tab = s.split(',');
    if (s.length != 0) {
      for (let i of tab) {
        for (let j of this.liste_image) {
          if (+i == j.id) {
            res.push(j);
            break;
          }
        }
      }
    }
    return res;
  }

  getUserName(): string | null {
    return localStorage.getItem('id_pseudo');
  }

  parseDate(date: Date): string {
    let month: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let index: number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  }

  setPanelOption(option: string): void {
    this.panel_option = option;
  }




  setActive(element: Element | null): void {
    (<HTMLButtonElement>element!).style.background = 'white';
    (<HTMLButtonElement>element!).style.color = 'black';
  }

  setInactive(element: Element | null) {
    (<HTMLButtonElement>element!).style.background = '';
    (<HTMLButtonElement>element!).style.color = 'white';
  }

  nextStep(): void {
    let step = this.formStep;
    if (this.formStep < 2) {
      step++;
      this.setFormStep(step);
    }
  }


  setFormStep(step: number): void {
    this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
    this.formStep = step;
    this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(step)!.children.item(0));

  }

  getSessionActive(): Session[] {
    return PanelComponent.sessionActive;
  }



  previousStep(): void {
    let step = this.formStep;
    if (this.formStep > 0) {
      step--;
      this.setFormStep(step);
    }
  }

  redirect(str: string): void {
    if (str == 'Accueil') {
      let lc: LoginComponent = new LoginComponent(null, this.router, this.jeuxService);
      lc.onSend_verify_deco(localStorage.getItem('id_user'));
      LoginComponent.logout();
      localStorage.removeItem("connect");
      localStorage.removeItem("id_user");
      localStorage.removeItem("id_crea");
      localStorage.removeItem("id_pseudo");
      setTimeout(() => {
        window.location.href = "";

      }, 200)
    }
  }

  addImage(img: Image): void {
    if (this.selectedImages.indexOf(img) == -1) {
      this.selectedImages.push(img);
    }
  }

  deleteImage(i: Image): void {
    let index = this.selectedImages.indexOf(i, 0);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    }
  }

  previsualiserGame(element: Session): void {
    this.panel_option = 'preview';
    this.selected_session = element;
  }

  editSession(session: Session): void {
    this.router.navigate(['/panel/sessions/edit', session.id]);
  }

  deleteSession(session: Session): void {
    let index = this.sessions.indexOf(session, 0);
    if (index > -1) {
      this.sessions.splice(index, 1);
    }
    index = this.getSessionActive().indexOf(session, 0);
    if (index > -1) {
      this.getSessionActive().splice(index, 1);
    }
  }

  getSession(): Session | null {
    for (let session of this.sessions) {
      if (session.id == this.session_id) {
        return session;
      }
    }
    return null;
  }

  join(s: Session): void {
    this.selected_session = s;
    this.panel_option = "view";
  }

  setSessionActive(s: Session): void {
    s.isActive = true;
    this.getSessionActive().push(s);
  }

  setSessionInactive(s: Session): void {
    s.isActive = false;
    let index = this.getSessionActive().indexOf(s, 0);
    if (index > -1) {
      this.getSessionActive().splice(index, 1);
    }
  }

  sortSessionId(): void {
    if (!this.sortById) {
      this.sortById = true;
      this.sortByDate = false;
      this.sortByNbJoueur = false;

      this.sessions.sort((s1: Session, s2: Session) => {
        if (s1.id > s2.id) return 1;
        if (s1.id < s2.id) return -1;
        return 0;
      })

      this.getSessionActive().sort((s1: Session, s2: Session) => {
        if (s1.id > s2.id) return 1;
        if (s1.id < s2.id) return -1;
        return 0;
      })
    }
    else {
      this.sortById = false;

      this.sessions.sort((s1: Session, s2: Session) => {
        if (s1.id > s2.id) return -1;
        if (s1.id < s2.id) return 1;
        return 0;
      })

      this.getSessionActive().sort((s1: Session, s2: Session) => {
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

      this.sessions.sort((s1: Session, s2: Session) => {
        if (s1.date > s2.date) return -1;
        if (s1.date < s2.date) return 1;
        return 0;
      })

      this.getSessionActive().sort((s1: Session, s2: Session) => {
        if (s1.date > s2.date) return -1;
        if (s1.date < s2.date) return 1;
        return 0;
      })
    }
    else {
      this.sortByDate = false;

      this.sessions.sort((s1: Session, s2: Session) => {
        if (s1.date > s2.date) return 1;
        if (s1.date < s2.date) return -1;
        return 0;
      })

      this.getSessionActive().sort((s1: Session, s2: Session) => {
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

      this.sessions.sort((s1: Session, s2: Session) => {
        if (s1.joueur.length > s2.joueur.length) return -1;
        if (s1.joueur.length < s2.joueur.length) return 1;
        return 0;
      })

      this.getSessionActive().sort((s1: Session, s2: Session) => {
        if (s1.joueur.length > s2.joueur.length) return -1;
        if (s1.joueur.length < s2.joueur.length) return 1;
        return 0;
      })
    }
    else {
      this.sortByNbJoueur = false;

      this.sessions.sort((s1: Session, s2: Session) => {
        if (s1.joueur.length > s2.joueur.length) return 1;
        if (s1.joueur.length < s2.joueur.length) return -1;
        return 0;
      })

      this.getSessionActive().sort((s1: Session, s2: Session) => {
        if (s1.joueur.length > s2.joueur.length) return 1;
        if (s1.joueur.length < s2.joueur.length) return -1;
        return 0;
      })
    }
  }

  createSession(jeu: string, nom: string): void {
    if (jeu != "" && nom != "" && this.jeuId != -1) {
      // new Session(nom, new Date(), (<any>Game)[jeu], false, []);
      this.create_session = false;
      this.jeuSession = "";
    }
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


  getRecopier(): Recopier | null {
    for (let r of this.recopier_list) {
      if (r.id == this.id_game) {
        return r;
      }
    }
    return null;
  }

  // getSessionRecopier(s: Session): Recopier | null {
  //   this.id_game = s.jeuId;
  //   return this.getRecopier();
  // }


  getMemory(): Memory | null {
    for (let m of this.memory_list) {
      if (m.id == this.id_game) {
        return m;
      }
    }
    return null;
  }

  // getSessionMemory(s: Session): Memory | null {
  //   this.id_game = s.jeuId;
  //   return this.getMemory();
  // }


  getReconnaitre(): Reconnaitre | null {
    for (let r of this.reconnaitre_list) {
      if (r.id == this.id_game) {
        return r;
      }
    }
    return null;
  }

  // getSessionReconnaitre(s: Session): Reconnaitre | null {
  //   this.id_game = s.jeuId;
  //   return this.getReconnaitre();
  // }


  getAbecedaire(): Abecedaire | null {
    for (let a of this.abecedaire_list) {
      if (a.id == this.id_game) {
        return a;
      }
    }
    return null;
  }

  // getSessionAbecedaire(s: Session): Abecedaire | null {
  //   this.id_game = s.jeuId;
  //   return this.getAbecedaire();
  // }


  getBoyGirl(): BoyGirl | null {
    for (let bg of this.boygirl_list) {
      if (bg.id == this.id_game) {
        return bg;
      }
    }
    return null;
  }

  // getSessionBoyGirl(s: Session): BoyGirl | null {
  //   this.id_game = s.jeuId;
  //   return this.getBoyGirl();
  // }

  getPuzzle(): Puzzle | null {
    for (let p of this.puzzle_list) {
      if (p.id == this.id_game) {
        return p;
      }
    }
    return null;
  }

  // getSessionPuzzle(s: Session): Puzzle | null {
  //   this.id_game = s.jeuId;
  //   return this.getPuzzle();
  // }




}

