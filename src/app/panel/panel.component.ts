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
    this.selected_session = null;

  }

  liste_image: Image[] = ImagesComponent.list_image;
  selectedImages: Image[] = [];
  liste_image_puzzle: any = [];
  imgPuzzle(li: Image[]): any {
    for (var i = 0; i < li.length; i++) {
      this.liste_image_puzzle.push({ src: li[i].src, title: li[i].nom });
    }
    return this.liste_image_puzzle;
  }
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
  sessionActive: Session[] = [];
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
  recopier_list: Recopier[] = [
    new Recopier([
      this.liste_image[0], this.liste_image[1]
    ], '#777777', this.recopier_title_color, this.recopier_text_color, this.recopier_good_answer_color, this.recopier_wrong_answer_color, this.recopier_progress, this.recopier_button_bg_color, this.recopier_button_text_color, this.recopier_input_bg_color, this.recopier_input_text_color, this.recopier_type_ecriture, false)
  ];


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
  reconnaitre_isVocaliser: boolean = false;
  reconnaitre_previsualiser: boolean = false;
  reconnaitre_list: Reconnaitre[] = [
    new Reconnaitre([
      this.liste_image[0]
    ], this.reconnaitre_bg_color, this.reconnaitre_title_color, this.reconnaitre_text_color, this.reconnaitre_good_answer_color, this.reconnaitre_wrong_answer_color, this.reconnaitre_progress, this.reconnaitre_button_bg_color, this.reconnaitre_button_text_color, this.reconnaitre_type_ecriture, this.reconnaitre_isVocaliser)
  ];

  // VARIABLE JEU PUZZLE
  puzzle: Puzzle | null;
  puzzle_bg_color: string = "#3bb8c9";
  puzzle_title_color: string = "#ffffff";
  puzzle_button_bg_color: string = "#0f73b1";
  puzzle_button_text_color: string = "#ffffff";
  puzzle_type_ecriture = "SCRIPT";
  puzzle_text_color: string = "#000000";
  puzzle_previsualiser: boolean = false;
  decoupe: string = '3';
  puzzle_list: Puzzle[] = [
    new Puzzle(this.liste_image_puzzle = this.imgPuzzle(this.selectedImages), this.puzzle_bg_color, this.puzzle_title_color, this.puzzle_text_color, this.puzzle_button_bg_color, this.puzzle_button_text_color, this.puzzle_type_ecriture, Number(this.decoupe))
  ];
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
  boygirl_type_ecriture: string = "SCRIPT";
  boygirl_previsualiser: boolean = false;
  boygirl_form_step: number = 0;
  boygirl_list: BoyGirl[] = [
    new BoyGirl(['girl', 'girl'], this.boygirl_listMotsGarcon, this.boygirl_bg_color_container, this.boygirl_bg_color_fille, this.boygirl_bg_color_garcon, this.boygirl_bg_color_mot, this.boygirl_word_color_fille, this.boygirl_word_color_garcon, this.boygirl_word_color_mot, this.boygirl_title_color_fille, this.boygirl_title_color_garcon, this.boygirl_title_color_mot, this.boygirl_text_color_fille, this.boygirl_text_color_garcon, this.boygirl_text_color_mot, this.boygirl_type_ecriture)
  ];

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
  abecedaire_list: Abecedaire[] = [
    new Abecedaire([
      this.liste_image[0], this.liste_image[1]
    ], '#745154', this.abecedaire_text_color, this.abecedaire_good_answer_color, this.abecedaire_wrong_answer_color, this.abecedaire_progress, this.abecedaire_button_bg_color, this.abecedaire_button_text_color, this.abecedaire_isVocaliser, this.abecedaire_type_ecriture)
  ];

  //VARIABLE JEU MEMORY
  memory: Memory | null;
  memory_nbTile: number = 18;
  memory_settings: string[] = ['image', 'image'];
  memory_bg_color: string = "#3bb8c9";
  memory_text_color: string = "#ffffff";
  memory_good_answer_color: string = "#3498db";
  memory_wrong_answer_color: string = "#e74c3c";
  memory_progress: Progress = Progress.Blue;
  memory_previsualiser: boolean = false;
  memory_tmp_affichage: string = "5";
  memory_list: Memory[] = [
    new Memory(this.selectedImages.slice(1), this.selectedImages[0], 12, ['cursif', 'image'], this.memory_bg_color, this.memory_text_color, this.memory_good_answer_color, this.memory_wrong_answer_color, this.memory_progress, this.memory_tmp_affichage)
  ];


  // ETAPE D'AVANCEMENT FORMULAIRE
  formStep: number = 0;
  // r1 : Recopier = new Recopier([],'red','CAPITAL');
  // r2 : Recopier = new Recopier([],'blue','CAPITAL');

  ngOnInit(): void {
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
                this.selectedImages = this.getRecopier()!.images;
                this.recopier_bg_color = this.getRecopier()!.bg_color;
                this.recopier_text_color = this.getRecopier()!.text_color;
                this.recopier_title_color = this.getRecopier()!.title_color;
                this.recopier_good_answer_color = this.getRecopier()!.good_answer_color;
                this.recopier_wrong_answer_color = this.getRecopier()!.wrong_answer_color;
                this.recopier_button_bg_color = this.getRecopier()!.button_bg_color;
                this.recopier_button_text_color = this.getRecopier()!.button_text_color;
                this.recopier_input_bg_color = this.getRecopier()!.input_bg_color;
                this.recopier_input_text_color = this.getRecopier()!.input_text_color;
                this.recopier_progress = this.getRecopier()!.color_progress_bar;
                this.recopier_type_ecriture = this.getRecopier()!.typeEcriture;
                this.recopier_isVocaliser = this.getRecopier()!.isVocaliser;
              }
            }

            else if (this.selectedGame == 'Memory') {
              if (this.getMemory()! == null) {
                this.router.navigate(['/panel/Memory']);
              } else {
                this.memory_nbTile = this.getMemory()!.nbTile;
                this.memory_settings = this.getMemory()!.setting;
                this.memory_bg_color = this.getMemory()!.bg_color;
                this.memory_text_color = this.getMemory()!.text_color;
                this.memory_good_answer_color = this.getMemory()!.good_answer_color;
                this.memory_wrong_answer_color = this.getMemory()!.wrong_answer_color;
                this.memory_progress = this.getMemory()!.color_progress_bar;
                this.memory_tmp_affichage = this.getMemory()!.tmpAffichage;
              }
            }

            else if (this.selectedGame == 'Reconnaitre') {
              if (this.getReconnaitre()! == null) {
                this.router.navigate(['/panel/Reconnaitre']);
              } else {
                this.selectedImages = this.getReconnaitre()!.images;
                this.reconnaitre_bg_color = this.getReconnaitre()!.bg_color;
                this.reconnaitre_title_color = this.getReconnaitre()!.title_color;
                this.reconnaitre_text_color = this.getReconnaitre()!.text_color;
                this.reconnaitre_good_answer_color = this.getReconnaitre()!.good_answer_color;
                this.reconnaitre_wrong_answer_color = this.getReconnaitre()!.wrong_answer_color;
                this.reconnaitre_button_bg_color = this.getReconnaitre()!.button_bg_color;
                this.reconnaitre_button_text_color = this.getReconnaitre()!.button_text_color;
                this.reconnaitre_progress = this.getReconnaitre()!.color_progress_bar;
                this.reconnaitre_type_ecriture = this.getReconnaitre()!.typeEcriture;
                this.reconnaitre_isVocaliser = this.getReconnaitre()!.isVocaliser;
              }
            }
            else if (this.selectedGame == 'Puzzle') {
              if (this.getPuzzle() != null) {
                this.router.navigate(['/panel/Puzzle']);
              } else {
                this.selectedImages = this.getPuzzle()!.liste_images;
                this.puzzle_bg_color = this.getPuzzle()!.bg_color;
                this.puzzle_title_color = this.getPuzzle()!.title_color;
                this.puzzle_text_color = this.getPuzzle()!.text_color;
                this.puzzle_button_bg_color = this.getPuzzle()!.button_bg_color;
                this.puzzle_button_text_color = this.getPuzzle()!.button_text_color;
                this.puzzle_type_ecriture = this.getPuzzle()!.typeEcriture;
                this.decoupe = this.getPuzzle()!.decoupe.toString();
              }
            }
            else if (this.selectedGame == 'Abecedaire') {
              if (this.getAbecedaire()! == null) {
                this.router.navigate(['/panel/Abecedaire']);
              } else {
                this.selectedImages = this.getAbecedaire()!.images;
                this.abecedaire_bg_color = this.getAbecedaire()!.bg_color;
                this.abecedaire_text_color = this.getAbecedaire()!.text_color;
                this.abecedaire_good_answer_color = this.getAbecedaire()!.good_answer_color;
                this.abecedaire_wrong_answer_color = this.getAbecedaire()!.wrong_answer_color;
                this.abecedaire_progress = this.getAbecedaire()!.color_progress_bar;
                this.abecedaire_button_bg_color = this.getAbecedaire()!.button_bg_color;
                this.abecedaire_button_text_color = this.getAbecedaire()!.button_text_color;
                this.abecedaire_type_ecriture = this.getAbecedaire()!.typeEcriture;
                this.abecedaire_isVocaliser = this.getAbecedaire()!.isVocaliser;
              }
            }
            else if (this.selectedGame == 'Fille&Garçon') {
              if (this.getBoyGirl()! == null) {
                this.router.navigate(['/panel/Fille&Garçon']);
              } else {
                this.boygirl_listMotsFille = this.getBoyGirl()!.listMotsFille;
                this.boygirl_listMotsGarcon = this.getBoyGirl()!.listMotsGarcon;
                this.boygirl_bg_color_container = this.getBoyGirl()!.bg_color_container;
                this.boygirl_bg_color_fille = this.getBoyGirl()!.bg_color_fille;
                this.boygirl_bg_color_garcon = this.getBoyGirl()!.bg_color_garcon;
                this.boygirl_bg_color_mot = this.getBoyGirl()!.bg_color_mot;
                this.boygirl_word_color_fille = this.getBoyGirl()!.word_color_fille;
                this.boygirl_word_color_garcon = this.getBoyGirl()!.word_color_garcon;
                this.boygirl_word_color_mot = this.getBoyGirl()!.word_color_mot;
                this.boygirl_title_color_fille = this.getBoyGirl()!.title_color_fille;
                this.boygirl_title_color_garcon = this.getBoyGirl()!.title_color_garcon;
                this.boygirl_title_color_mot = this.getBoyGirl()!.title_color_mot;
                this.boygirl_text_color_fille = this.getBoyGirl()!.text_color_fille;
                this.boygirl_text_color_garcon = this.getBoyGirl()!.text_color_garcon;
                this.boygirl_text_color_mot = this.getBoyGirl()!.text_color_mot;
                this.boygirl_type_ecriture = this.getBoyGirl()!.type_ecriture;
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
        this.sessionActive.push(s);
      }
    }

  }

  previewRecopier(r: Recopier): void {
    this.recopier = r;
    this.recopier_previsualiser = true;
  }

  quitPreviewRecopier(): void {
    this.recopier_previsualiser = false;
  }

  deleteGameRecopier(r: Recopier): void {
    let index = this.recopier_list.indexOf(r, 0);

    if (index > -1) {
      this.recopier_list.splice(index, 1);
    }
  }

  previewMemory(m: Memory): void {
    this.memory = m;
    this.memory_previsualiser = true;
  }

  quitPreviewMemory(): void {
    this.memory_previsualiser = false;
  }

  deleteGameMemory(m: Memory): void {
    let index = this.memory_list.indexOf(m, 0);

    if (index > -1) {
      this.memory_list.splice(index, 1);
    }
  }

  previewReconnaitre(r: Reconnaitre): void {
    this.reconnaitre = r;
    this.reconnaitre_previsualiser = true;
  }

  quitPreviewReconnaitre(): void {
    this.reconnaitre_previsualiser = false;
  }

  deleteGameReconnaitre(r: Reconnaitre): void {
    let index = this.reconnaitre_list.indexOf(r, 0);

    if (index > -1) {
      this.reconnaitre_list.splice(index, 1);
    }
  }

  previewPuzzle(r: Puzzle): void {
    this.puzzle = r;
    this.puzzle_previsualiser = true;
  }

  quitPreviewPuzzle(): void {
    this.puzzle_previsualiser = false;
  }

  deleteGamePuzzle(r: Puzzle): void {
    let index = this.puzzle_list.indexOf(r, 0);

    if (index > -1) {
      this.puzzle_list.splice(index, 1);
    }
  }

  previewAbecedaire(a: Abecedaire): void {
    this.abecedaire = a;
    this.abecedaire_previsualiser = true;
  }

  quitPreviewAbecedaire(): void {
    this.abecedaire_previsualiser = false;
  }

  deleteGameAbecedaire(a: Abecedaire): void {
    let index = this.abecedaire_list.indexOf(a, 0);

    if (index > -1) {
      this.abecedaire_list.splice(index, 1);
    }
  }

  previewBoyGirl(bg: BoyGirl): void {
    this.boygirl = bg;
    this.boygirl_previsualiser = true;
  }

  quitPreviewBoyGirl(): void {
    this.boygirl_previsualiser = false;
  }

  deleteGameBoyGirl(bg: BoyGirl): void {
    let index = this.boygirl_list.indexOf(bg, 0);

    if (index > -1) {
      this.boygirl_list.splice(index, 1);
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

  parseDate(date: Date): string {
    let month: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let index: number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  }

  setPanelOption(option: string): void {
    this.panel_option = option;
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
      this.boygirl = new BoyGirl(this.boygirl_listMotsFille, this.boygirl_listMotsGarcon, this.boygirl_bg_color_container, this.boygirl_bg_color_fille, this.boygirl_bg_color_garcon, this.boygirl_bg_color_mot, this.boygirl_word_color_fille, this.boygirl_word_color_garcon, this.boygirl_word_color_mot, this.boygirl_title_color_fille, this.boygirl_title_color_garcon, this.boygirl_title_color_mot, this.boygirl_text_color_fille, this.boygirl_text_color_garcon, this.boygirl_text_color_mot, this.boygirl_type_ecriture);
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
  setPrevisualiserPuzzle(prev: boolean): void {
    if (prev == true) {
      this.liste_image_puzzle = this.imgPuzzle(this.selectedImages);
      this.puzzle = new Puzzle(this.liste_image_puzzle, this.puzzle_bg_color, this.puzzle_title_color, this.puzzle_text_color, this.puzzle_button_bg_color, this.puzzle_button_text_color, this.puzzle_type_ecriture, Number(this.decoupe));
      this.puzzle_previsualiser = true;
    }
    else {
      this.puzzle = null;
      this.puzzle_previsualiser = false;
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
      }, 0);
    }
  }

  isActive(button: HTMLButtonElement): boolean {
    if (document.getElementsByClassName('breadcrumb-item').item(this.formStep)!.children.item(0) == button) {
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

  previsualiserGame(element: Session): void {
    this.panel_option = 'preview';
    this.selected_session = element;
  }

  create(jeu: string): void {
    switch (jeu) {
      case 'Recopier':
        this.recopier_list.push(
          new Recopier(this.selectedImages, this.recopier_bg_color, this.recopier_title_color, this.recopier_text_color, this.recopier_good_answer_color, this.recopier_wrong_answer_color, this.recopier_progress, this.recopier_button_bg_color, this.recopier_button_text_color, this.recopier_input_bg_color, this.recopier_input_text_color, this.recopier_type_ecriture, this.recopier_isVocaliser)
        );
        this.router.navigate(['/panel/Recopier']);
        break;
      case 'Memory':
        this.memory_list.push(
          new Memory(this.selectedImages.slice(1), this.selectedImages[0], this.memory_nbTile, this.memory_settings, this.memory_bg_color, this.memory_text_color, this.memory_good_answer_color, this.memory_wrong_answer_color, this.memory_progress, this.memory_tmp_affichage)
        );
        this.router.navigate(['/panel/Memory']);
        break;
      case 'Reconnaitre':
        this.reconnaitre_list.push(
          new Reconnaitre(this.selectedImages, this.reconnaitre_bg_color, this.reconnaitre_title_color, this.reconnaitre_text_color, this.reconnaitre_good_answer_color, this.reconnaitre_wrong_answer_color, this.reconnaitre_progress, this.reconnaitre_button_bg_color, this.reconnaitre_button_text_color, this.reconnaitre_type_ecriture, this.reconnaitre_isVocaliser)
        );
        this.router.navigate(['/panel/Reconnaitre']);
        break;
    }
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

  redirectEditRecopier(r: Recopier): void {
    window.location.href = '/panel/Recopier/edit/' + r.id;
  }
  redirectEditMemory(m: Memory): void {
    window.location.href = '/panel/Memory/edit/' + m.id;
  }

  redirectEditReconnaitre(r: Reconnaitre): void {
    window.location.href = '/panel/Reconnaitre/edit/' + r.id;
  }
  redirectEditAbecedaire(a: Abecedaire): void {
    window.location.href = '/panel/Abecedaire/edit/' + a.id;
  }

  redirectEditBoyGirl(bg: BoyGirl): void {
    window.location.href = '/panel/Fille&Garçon/edit/' + bg.id;
  }

  getRecopier(): Recopier | null {
    for (let r of this.recopier_list) {
      if (r.id == this.id_game) {
        return r;
      }
    }
    return null;
  }

  getSessionRecopier(s : Session) : Recopier | null {
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

  getSessionMemory(s : Session) : Memory | null {
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

  getSessionReconnaitre(s : Session) : Reconnaitre | null {
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

  getSessionAbecedaire(s : Session) : Abecedaire | null {
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

  getSessionBoyGirl(s : Session) : BoyGirl | null {
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

  getSessionPuzzle(s : Session) : Puzzle | null {
    this.id_game = s.jeuId;
    return this.getPuzzle();
  }



  save(): void {
    switch (this.selectedGame) {
      case 'Recopier':
        this.getRecopier()!.images = this.selectedImages;
        this.getRecopier()!.bg_color = this.recopier_bg_color;
        this.getRecopier()!.text_color = this.recopier_text_color;
        this.getRecopier()!.title_color = this.recopier_title_color;
        this.getRecopier()!.good_answer_color = this.recopier_good_answer_color;
        this.getRecopier()!.wrong_answer_color = this.recopier_wrong_answer_color;
        this.getRecopier()!.button_bg_color = this.recopier_button_bg_color;
        this.getRecopier()!.button_text_color = this.recopier_button_text_color;
        this.getRecopier()!.input_bg_color = this.recopier_input_bg_color;
        this.getRecopier()!.input_text_color = this.recopier_input_text_color;
        this.getRecopier()!.color_progress_bar = this.recopier_progress;
        this.getRecopier()!.typeEcriture = this.recopier_type_ecriture;
        this.getRecopier()!.isVocaliser = this.recopier_isVocaliser;
        this.router.navigate(['/panel/Recopier']);
        break;
      case 'Memory':
        this.getMemory()!.nbTile = this.memory_nbTile;
        this.getMemory()!.setting = this.memory_settings;
        this.getMemory()!.bg_color = this.memory_bg_color;
        this.getMemory()!.text_color = this.memory_text_color;
        this.getMemory()!.good_answer_color = this.memory_good_answer_color;
        this.getMemory()!.wrong_answer_color = this.memory_wrong_answer_color;
        this.getMemory()!.color_progress_bar = this.memory_progress;
        this.getMemory()!.tmpAffichage = this.memory_tmp_affichage;
        this.router.navigate(['/panel/Memory']);
        break;
      case 'Reconnaitre':
        this.getReconnaitre()!.images = this.selectedImages;
        this.getReconnaitre()!.bg_color = this.reconnaitre_bg_color;
        this.getReconnaitre()!.title_color = this.reconnaitre_title_color;
        this.getReconnaitre()!.text_color = this.reconnaitre_text_color;
        this.getReconnaitre()!.good_answer_color = this.reconnaitre_good_answer_color;
        this.getReconnaitre()!.wrong_answer_color = this.reconnaitre_wrong_answer_color;
        this.getReconnaitre()!.button_bg_color = this.reconnaitre_button_bg_color;
        this.getReconnaitre()!.button_text_color = this.reconnaitre_button_text_color;
        this.getReconnaitre()!.color_progress_bar = this.reconnaitre_progress;
        this.getReconnaitre()!.typeEcriture = this.reconnaitre_type_ecriture;
        this.getReconnaitre()!.isVocaliser = this.reconnaitre_isVocaliser;
        this.router.navigate(['/panel/Reconnaitre']);
        break;
      case 'Puzzle':
        this.getPuzzle()!.liste_images = this.liste_image_puzzle;
        this.getPuzzle()!.bg_color = this.puzzle_bg_color;
        this.getPuzzle()!.title_color = this.puzzle_title_color;
        this.getPuzzle()!.text_color = this.puzzle_text_color;
        this.getPuzzle()!.button_bg_color = this.puzzle_button_bg_color;
        this.getPuzzle()!.button_text_color = this.puzzle_button_text_color;
        this.getPuzzle()!.typeEcriture = this.puzzle_type_ecriture;
        this.getPuzzle()!.decoupe = Number(this.decoupe);
        break;
      case 'Abecedaire':
        this.getAbecedaire()!.images = this.selectedImages;
        this.getAbecedaire()!.bg_color = this.abecedaire_bg_color;
        this.getAbecedaire()!.text_color = this.abecedaire_text_color;
        this.getAbecedaire()!.good_answer_color = this.abecedaire_good_answer_color;
        this.getAbecedaire()!.wrong_answer_color = this.abecedaire_wrong_answer_color;
        this.getAbecedaire()!.color_progress_bar = this.abecedaire_progress;
        this.getAbecedaire()!.button_bg_color = this.abecedaire_button_bg_color;
        this.getAbecedaire()!.button_text_color = this.abecedaire_button_text_color;
        this.getAbecedaire()!.typeEcriture = this.abecedaire_type_ecriture;
        this.getAbecedaire()!.isVocaliser = this.abecedaire_isVocaliser;
        this.router.navigate(['/panel/Abecedaire']);
        break;
      case 'Fille&Garçon':
        this.getBoyGirl()!.listMotsFille = this.boygirl_listMotsFille;
        this.getBoyGirl()!.listMotsGarcon = this.boygirl_listMotsGarcon;
        this.getBoyGirl()!.bg_color_container = this.boygirl_bg_color_container;
        this.getBoyGirl()!.bg_color_fille = this.boygirl_bg_color_fille;
        this.getBoyGirl()!.bg_color_garcon = this.boygirl_bg_color_garcon;
        this.getBoyGirl()!.bg_color_mot = this.boygirl_bg_color_mot;
        this.getBoyGirl()!.word_color_fille = this.boygirl_word_color_fille;
        this.getBoyGirl()!.word_color_garcon = this.boygirl_word_color_garcon;
        this.getBoyGirl()!.word_color_mot = this.boygirl_word_color_mot;
        this.getBoyGirl()!.title_color_fille = this.boygirl_title_color_fille;
        this.getBoyGirl()!.title_color_garcon = this.boygirl_title_color_garcon;
        this.getBoyGirl()!.title_color_mot = this.boygirl_title_color_mot;
        this.getBoyGirl()!.text_color_fille = this.boygirl_text_color_fille;
        this.getBoyGirl()!.text_color_garcon = this.boygirl_text_color_garcon;
        this.getBoyGirl()!.text_color_mot = this.boygirl_text_color_mot;
        this.getBoyGirl()!.type_ecriture = this.boygirl_type_ecriture;
        this.router.navigate(['/panel/Fille&Garçon']);
        break;
    }

  }
}

