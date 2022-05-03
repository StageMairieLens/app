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
import { SessionsComponent } from '../sessions/sessions.component';
import { LoginComponent } from '../index/login/login.component';
import { JeuxService } from '../jeux.service';

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
          new Recopier(data[i].id_recopier, data[i].date_recopier, this.getImage(data[i].id_image), data[i].bg_color, data[i].text_color, data[i].title_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_bo, data[i].bu_text_co, data[i].i_bg_co, data[i].i_text_co, data[i].type_ecri, data[i].isVoca)
        );
      }

    })
  }

  recupMemory(donne: any) {
    this.jeuxService.recup_memory(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        donne.push(
          new Memory(data[i].id_memory, data[i].date_memory, this.getImage(data[i].id_image).slice(1), this.getImage(data[i].id_image)[0], data[i].isVoca, data[i].nb_pair, [data[i].sett0,data[i].sett1], data[i].bg_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].tmps)
        );
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
  sessionActive: Session[] = SessionsComponent.sessionActive;
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
  reconnaitre_list: Reconnaitre[] = SessionsComponent.reconnaitre_list;

  // VARIABLE JEU PUZZLE
  puzzle: Puzzle | null;
  puzzle_list: Puzzle[] = SessionsComponent.puzzle_list;


  // VARIABLE JEU BOY&GIRL
  boygirl: BoyGirl | null;
  boygirl_list: BoyGirl[] = SessionsComponent.boygirl_list;

  // VARIABLE JEU ABECEDAIRE
  abecedaire: Abecedaire | null;
  abecedaire_list: Abecedaire[] = SessionsComponent.abecedaire_list;

  //VARIABLE JEU MEMORY
  memory: Memory | null;
  memory_list: Memory[] = []


  // ETAPE D'AVANCEMENT FORMULAIRE
  formStep: number = 0;


  ngOnInit(): void {
    this.recupRecopier(this.recopier_list)
    this.recupMemory(this.memory_list)


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

      for (let s of SessionsComponent.data) {
        if (s.isActive) {
          SessionsComponent.sessionActive.push(s);
        }
      }
    },100)


  }

  getImage(s: string): Image[] {
    let res = [];
    let tab = s.split(',');
    if(s.length != 0) {
      for (let i of tab) {
        for (let j of ImagesComponent.list_image) {
          if (+i == j.id) {
            res.push(j);
            break;
          }
        }
      }
    }
    return res;
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



  previousStep(): void {
    let step = this.formStep;
    if (this.formStep > 0) {
      step--;
      this.setFormStep(step);
    }
  }

  redirect(str: string): void {
    if (str == 'Accueil') {
      LoginComponent.logout();
      this.router.navigate(['/']);
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
    index = this.sessionActive.indexOf(session, 0);
    if (index > -1) {
      this.sessionActive.splice(index, 1);
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
    this.sessionActive.push(s);
  }

  setSessionInactive(s: Session): void {
    s.isActive = false;
    let index = this.sessionActive.indexOf(s, 0);
    if (index > -1) {
      this.sessionActive.splice(index, 1);
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

      this.sessionActive.sort((s1: Session, s2: Session) => {
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

      this.sessionActive.sort((s1: Session, s2: Session) => {
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

      this.sessionActive.sort((s1: Session, s2: Session) => {
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

      this.sessionActive.sort((s1: Session, s2: Session) => {
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

      this.sessionActive.sort((s1: Session, s2: Session) => {
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

      this.sessionActive.sort((s1: Session, s2: Session) => {
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

  getSessionRecopier(s: Session): Recopier | null {
    this.id_game = s.jeuId;
    return this.getRecopier();
  }


  getMemory(): Memory | null {
    for (let m of this.memory_list) {
      if (m.id == this.id_game) {
        return m;
      }
    }
    return null;
  }

  getSessionMemory(s: Session): Memory | null {
    this.id_game = s.jeuId;
    return this.getMemory();
  }


  getReconnaitre(): Reconnaitre | null {
    for (let r of this.reconnaitre_list) {
      if (r.id == this.id_game) {
        return r;
      }
    }
    return null;
  }

  getSessionReconnaitre(s: Session): Reconnaitre | null {
    this.id_game = s.jeuId;
    return this.getReconnaitre();
  }


  getAbecedaire(): Abecedaire | null {
    for (let a of this.abecedaire_list) {
      if (a.id == this.id_game) {
        return a;
      }
    }
    return null;
  }

  getSessionAbecedaire(s: Session): Abecedaire | null {
    this.id_game = s.jeuId;
    return this.getAbecedaire();
  }


  getBoyGirl(): BoyGirl | null {
    for (let bg of this.boygirl_list) {
      if (bg.id == this.id_game) {
        return bg;
      }
    }
    return null;
  }

  getSessionBoyGirl(s: Session): BoyGirl | null {
    this.id_game = s.jeuId;
    return this.getBoyGirl();
  }

  getPuzzle(): Puzzle | null {
    for (let p of this.puzzle_list) {
      if (p.id == this.id_game) {
        return p;
      }
    }
    return null;
  }

  getSessionPuzzle(s: Session): Puzzle | null {
    this.id_game = s.jeuId;
    return this.getPuzzle();
  }




}

