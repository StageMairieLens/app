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
import { SessionsComponent } from '../sessions/sessions.component';
import { join } from 'path';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  jeu: string | null = "";

  constructor(private router: Router, private route: ActivatedRoute) {
    // this.recopier = new Recopier(this.selectedImages, this.recopier_bg_color, this.recopier_title_color, this.recopier_text_color, this.recopier_good_answer_color, this.recopier_wrong_answer_color, this.recopier_progress, this.recopier_button_bg_color, this.recopier_button_text_color, this.recopier_input_bg_color, this.recopier_input_text_color, this.recopier_type_ecriture);
    this.recopier = null;
    this.reconnaitre = null;
    this.puzzle = null;
    this.boygirl = null;
    this.abecedaire = null;
    this.memory = null;
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
  nbSessionsActive : number = 0;
  panel : string | null = "";
  displayedColumns: string[] = ['Active','Id','Nom','Date','Jeu','Nombre de joueurs','Actions'];
  sessions : Session[] = SessionsComponent.data;
  sessionActive : Session[] = [];
  showActive : boolean = true;

  session_id : number | null = null;
  panel_option : string | null = "";


  // VARIABLE JEU RECOPIER
  recopier: Recopier | null;
  recopier_bg_color: string = "#3bb8c9";
  recopier_text_color: string = "#000000";
  recopier_title_color: string = "#ffffff";
  recopier_good_answer_color: string = "#0dff00";
  recopier_wrong_answer_color: string = "#ff0000";
  recopier_button_bg_color: string = "#0f73b1";
  recopier_button_text_color: string = "#ffffff";
  recopier_input_bg_color: string = "#ffffff";
  recopier_input_text_color: string = "#000000";
  recopier_progress: Progress = Progress.Blue;
  recopier_type_ecriture = "CURSIF";
  recopier_isVocaliser: boolean = false;
  recopier_previsualiser: boolean = false;


  // VARIABLE JEU RECONNAITRE
  reconnaitre: Reconnaitre | null;
  reconnaitre_bg_color: string = "#3bb8c9";
  reconnaitre_title_color: string = "#ffffff";
  reconnaitre_text_color: string = "#000000";
  reconnaitre_good_answer_color: string = "#0dff00";
  reconnaitre_wrong_answer_color: string = "#ff0000";
  reconnaitre_button_bg_color: string = "#0f73b1";
  reconnaitre_button_text_color: string = "#ffffff";
  reconnaitre_progress: Progress = Progress.Blue;
  reconnaitre_type_ecriture = "SCRIPT";
  reconnaitre_isVocaliser: boolean = true;
  reconnaitre_previsualiser: boolean = false;

  // VARIABLE JEU PUZZLE
  puzzle: Puzzle | null;
  puzzle_bg_color: string = "#3bb8c9";
  puzzle_title_color: string = "#ffffff";
  puzzle_button_bg_color: string = "#0f73b1";
  puzzle_button_text_color: string = "#ffffff";
  puzzle_type_ecriture = "SCRIPT";
  puzzle_text_color: string = "#000000";

  // VARIABLE JEU BOY&GIRL
  boygirl: BoyGirl | null;
  boygirl_listMotsFille: string[] = [];
  boygirl_listMotsGarcon: string[] = [];
  boygirl_bg_color_container: string = "#3bb8c9";
  boygirl_bg_color_fille: string = "#ffc0cb";
  boygirl_bg_color_garcon: string = "#add9e6";
  boygirl_bg_color_mot: string = "#fea500";
  boygirl_word_color_fille: string = "#ffc0cb";
  boygirl_word_color_garcon: string = "#0f73b1";
  boygirl_word_color_mot: string = "#000000";
  boygirl_title_color_fille: string = "#000000";
  boygirl_title_color_garcon: string = "#000000";
  boygirl_title_color_mot: string = "#000000";
  boygirl_text_color_fille: string = "#ffffff";
  boygirl_text_color_garcon: string = "#ffffff";
  boygirl_text_color_mot: string = "#ffffff";
  boygirl_type_ecriture : string = "SCRIPT";
  boygirl_previsualiser: boolean = false;
  boygirl_form_step: number = 0;

  // VARIABLE JEU ABECEDAIRE
  abecedaire: Abecedaire | null;
  abecedaire_bg_color: string = "#3bb8c9";
  abecedaire_text_color: string = "#ffffff";
  abecedaire_good_answer_color: string = "#3498db";
  abecedaire_wrong_answer_color: string = "#e74c3c";
  abecedaire_progress: Progress = Progress.Blue;
  abecedaire_button_bg_color: string = "#f39c12";
  abecedaire_button_text_color: string = "#ffffff";
  abecedaire_type_ecriture: string = "script";
  abecedaire_isVocaliser: boolean = false;
  abecedaire_previsualiser: boolean = false;

  //VARIABLE JEU MEMORY
  memory : Memory | null;
  memory_nbTile: number = 18;
  memory_settings: string[] = ['image', 'image'];
  memory_bg_color: string = "#3bb8c9";
  memory_text_color: string = "#ffffff";
  memory_good_answer_color: string = "#3498db";
  memory_wrong_answer_color: string = "#e74c3c";
  memory_progress: Progress = Progress.Blue;
  memory_previsualiser : boolean = false;
  memory_tmp_affichage : string = "5";


  // ETAPE D'AVANCEMENT FORMULAIRE
  formStep: number = 0;
  // r1 : Recopier = new Recopier([],'red','CAPITAL');
  // r2 : Recopier = new Recopier([],'blue','CAPITAL');

  ngOnInit(): void {
    this.panel = this.route.snapshot.paramMap.get('param1');

    if(this.panel == 'create') {
      this.jeu = this.route.snapshot.paramMap.get('param2');
      if(this.jeu != null) {
        if(this.optionGame.includes(this.jeu)) {
          this.selectedGame = this.jeu;
        } else {
          this.router.navigate(['/panel']);
        }
      } else {
        this.selectedGame = "";
      }
    }

    if(this.panel == 'sessions') {
      this.panel_option = this.route.snapshot.paramMap.get('param2');

      if(this.panel_option != null) {
        if(this.route.snapshot.paramMap.get('param3') != null) {
          if(this.panel_option == 'edit') {
            this.session_id = +this.route.snapshot.paramMap.get('param3')!;
            if(this.session_id == null) {
              this.router.navigate(['/panel/sessions']);
            }
          } else {
            this.router.navigate(['/panel/sessions']);
          }
        }else {
          this.router.navigate(['/panel/sessions']);
        }
      }
    }

    for (let s of this.sessions) {
      if(s.isActive) {
        this.sessionActive.push(s);
      }
    }

  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  getMemorySetting(n: number): string {
    return this.memory_settings[n];
  }

  changeMemorySetting(n: number, setting: string): void {
    this.memory_settings[n] = setting;
    console.log(this.memory_settings);
  }

  changeMemoryNbTile(n: number): void {
    this.memory_nbTile = n;
  }

  addMotsFille(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.boygirl_listMotsFille.push(value);
    }

    event.chipInput!.clear();
  }

  removeFille(str: string): void {
    const index = this.boygirl_listMotsFille.indexOf(str);

    if (index >= 0) {
      this.boygirl_listMotsFille.splice(index, 1);
    }
  }

  addMotsGarcon(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.boygirl_listMotsGarcon.push(value);
    }

    event.chipInput!.clear();
  }

  removeGarcon(str: string): void {
    const index = this.boygirl_listMotsGarcon.indexOf(str);

    if (index >= 0) {
      this.boygirl_listMotsGarcon.splice(index, 1);
    }
  }

  parseDate(date : Date) : string {
    let month : string[] = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];
    let index : number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  }


  setSelected(element: HTMLOptionElement): void {
    element.selected = true;
  }

  setPrevisualiserRecopier(prev: boolean): void {
    if (prev == true) {
      this.recopier = new Recopier(this.selectedImages, this.recopier_bg_color, this.recopier_title_color, this.recopier_text_color, this.recopier_good_answer_color, this.recopier_wrong_answer_color, this.recopier_progress, this.recopier_button_bg_color, this.recopier_button_text_color, this.recopier_input_bg_color, this.recopier_input_text_color, this.recopier_type_ecriture, this.recopier_isVocaliser);
      this.recopier_previsualiser = true;
    }
    else {
      this.recopier = null;
      this.recopier_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
        this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      }, 0);
    }
  }

  setPrevisualiserBoyGirl(prev: boolean): void {
    if (prev == true) {
      this.boygirl = new BoyGirl(this.boygirl_listMotsFille, this.boygirl_listMotsGarcon, this.boygirl_bg_color_container, this.boygirl_bg_color_fille, this.boygirl_bg_color_garcon, this.boygirl_bg_color_mot, this.boygirl_word_color_fille, this.boygirl_word_color_garcon, this.boygirl_word_color_mot, this.boygirl_title_color_fille, this.boygirl_title_color_garcon, this.boygirl_title_color_mot, this.boygirl_text_color_fille, this.boygirl_text_color_garcon, this.boygirl_text_color_mot,this.boygirl_type_ecriture);
      this.boygirl_previsualiser = true;
    }
    else {
      this.boygirl = null;
      this.boygirl_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
        this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.boygirl_form_step)!.children.item(0));
      }, 0);
    }
  }

  setPrevisualiserReconnaitre(prev: boolean): void {
    if (prev == true) {
      this.reconnaitre = new Reconnaitre(this.selectedImages, this.reconnaitre_bg_color, this.reconnaitre_title_color, this.reconnaitre_text_color, this.reconnaitre_good_answer_color, this.reconnaitre_wrong_answer_color, this.reconnaitre_progress, this.reconnaitre_button_bg_color, this.reconnaitre_button_text_color, this.reconnaitre_type_ecriture, this.reconnaitre_isVocaliser);
      this.reconnaitre_previsualiser = true;
    }
    else {
      this.reconnaitre = null;
      this.reconnaitre_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
        this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      }, 0);
    }
  }

  setPrevisualiserAbecedaire(prev: boolean): void {
    if (prev == true) {
      this.abecedaire = new Abecedaire(this.selectedImages, this.abecedaire_bg_color, this.abecedaire_text_color, this.abecedaire_good_answer_color, this.abecedaire_wrong_answer_color, this.abecedaire_progress, this.abecedaire_button_bg_color, this.abecedaire_button_text_color, this.abecedaire_isVocaliser, this.abecedaire_type_ecriture);
      this.abecedaire_previsualiser = true;
    }
    else {
      this.abecedaire = null;
      this.abecedaire_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
        this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      }, 0);
    }
  }

  setPrevisualiserMemory(prev: boolean): void {
    if (prev == true) {
      this.memory = new Memory(this.selectedImages.slice(1), this.selectedImages[0], this.memory_nbTile, this.memory_settings, this.memory_bg_color, this.memory_text_color, this.memory_good_answer_color, this.memory_wrong_answer_color, this.memory_progress, this.memory_tmp_affichage);
      this.memory_previsualiser = true;
    }
    else {
      this.memory = null;
      this.memory_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
      this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      },0);
    }
  }

  isActive(button : HTMLButtonElement) : boolean {
    if(document.getElementsByClassName('breadcrumb-item').item(this.formStep)!.children.item(0) == button) {
      return true;
    } else {
      return false;
    }
  }

  changeProgressValue(jeu: string, element: HTMLSelectElement): void {

    if (jeu == 'Recopier') {
      switch (element.value) {
        case 'blue':
          this.recopier_progress = Progress.Blue;
          break;
        case 'green':
          this.recopier_progress = Progress.Green;
          break;
        case 'lightblue':
          this.recopier_progress = Progress.LightBlue;
          break;
        case 'orange':
          this.recopier_progress = Progress.Orange;
          break;
        case 'red':
          this.recopier_progress = Progress.Red;
          break;
      }
    } else if (jeu == 'Reconnaitre') {
      switch (element.value) {
        case 'blue':
          this.reconnaitre_progress = Progress.Blue;
          break;
        case 'green':
          this.reconnaitre_progress = Progress.Green;
          break;
        case 'lightblue':
          this.reconnaitre_progress = Progress.LightBlue;
          break;
        case 'orange':
          this.reconnaitre_progress = Progress.Orange;
          break;
        case 'red':
          this.reconnaitre_progress = Progress.Red;
          break;
      }
    } else if (jeu == 'Abecedaire') {
      switch (element.value) {
        case 'blue':
          this.abecedaire_progress = Progress.Blue;
          break;
        case 'green':
          this.abecedaire_progress = Progress.Green;
          break;
        case 'lightblue':
          this.abecedaire_progress = Progress.LightBlue;
          break;
        case 'orange':
          this.abecedaire_progress = Progress.Orange;
          break;
        case 'red':
          this.abecedaire_progress = Progress.Red;
          break;
      }
    } else if (jeu == 'Memory') {
      switch (element.value) {
        case 'blue':
          this.memory_progress = Progress.Blue;
          break;
        case 'green':
          this.memory_progress = Progress.Green;
          break;
        case 'lightblue':
          this.memory_progress = Progress.LightBlue;
          break;
        case 'orange':
          this.memory_progress = Progress.Orange;
          break;
        case 'red':
          this.memory_progress = Progress.Red;
          break;
      }
    }
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

  nextStepBoyGirl(): void {
    let step = this.boygirl_form_step;
    if (this.boygirl_form_step < 1) {
      step++;
      this.setFormStepBoyGirl(step);
    }
  }

  setFormStep(step: number): void {
    this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
    this.formStep = step;
    this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(step)!.children.item(0));

  }

  setFormStepBoyGirl(step: number): void {
    this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(this.boygirl_form_step)!.children.item(0));
    this.boygirl_form_step = step;
    this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(step)!.children.item(0));

  }

  previousStep(): void {
    let step = this.formStep;
    if (this.formStep > 0) {
      step--;
      this.setFormStep(step);
    }
  }

  previousStepBoyGirl(): void {
    let step = this.boygirl_form_step;
    if (this.boygirl_form_step > 0) {
      step--;
      this.setFormStepBoyGirl(step);
    }
  }

  redirect(str: string): void {
    if (str == 'Accueil') {
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

  create(): void {

  }

  previsualiserGame(element : Session) : void {

  }

  editSession(session : Session) : void {
    this.panel_option = 'edit';
    this.session_id = session.id;
  }

  deleteSession(session : Session) : void {
    let index = this.sessions.indexOf(session,0);
    if(index > -1) {
      this.sessions.splice(index,1);
    }
    index = this.sessionActive.indexOf(session,0);
    if(index > -1) {
      this.sessionActive.splice(index,1);
    }
  }

  getSession() : Session | null{
    for(let session of this.sessions) {
      if(session.id == this.session_id) {
        return session;
      }
    }
    return null;
  }

  join(s : Session) : void {
    this.router.navigate(['/session/' + s.id]);
  }

  setSessionActive (s : Session) : void {
    s.isActive = true;
    this.sessionActive.push(s);
  }

  setSessionInactive (s : Session) : void {
    s.isActive = false;
    let index = this.sessionActive.indexOf(s,0);
    if(index > -1) {
      this.sessionActive.splice(index, 1);
    }
  }

  sortSessionId() : void {
    this.sessions.sort((s1 : Session,s2 : Session) => {
      if(s1.id > s2.id) return 1;
      if(s1.id < s2.id) return -1;
      return 0;
    })

    this.sessionActive.sort((s1 : Session,s2 : Session) => {
      if(s1.id > s2.id) return 1;
      if(s1.id < s2.id) return -1;
      return 0;
    })
  }

  showSessionActive() : void {
    this.showActive = true;
  }

  showSessionInactive() : void {
    this.showActive = false;
  }
}

