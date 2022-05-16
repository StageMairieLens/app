import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Image } from '../Image';
import { Progress } from '../Progress';
import { Memory } from './Memory';
import { TileComponent } from './tile/tile.component';
import { Guest, Jeu, Progression, SessionsComponent } from '../sessions/sessions.component';
import { ImagesComponent } from '../images/images.component';
import { ActivatedRoute, Router } from '@angular/router';
import { JeuxService } from '../jeux.service';
import { Session } from '../sessions/Session';
import { Users } from '../users/Users';
import { Login } from '../index/login/Login';
import { LoginComponent } from '../index/login/login.component';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {


  list_login : Login[] = [];
  recupLogin(donne: any) {
      this.jeuxService.recup_user(donne).subscribe(data => {

        for (var i = 0; data[i] != null; i++) {
          //console.log(data);
          //donne.push({id:data[i].id_user,mail:data[i].mail_user,pwd:data[i].password_user,co:data[i].connect});
          donne.push(new Login(data[i].id_user, data[i].mail_user, data[i].password_user, data[i].connect,data[i].pseudo));
          var inn = 0;
          for (var j = 0; LoginComponent.logins[j]; j++) {
            if (data[i].mail_user == LoginComponent.logins[j]) {
              inn = 1;
            }
          }
          if (inn == 0) {
            LoginComponent.logins.push(new Login(data[i].id_user, data[i].mail_user, data[i].password_user, data[i].connect,data[i].pseudo));
          }

        }

      })


    }
  @Input() game: Memory | null;
  derriere: Image | null;

  @Input() showTitle: boolean = true;
  @Input() play: boolean = true;
  @Input() showList: boolean = false;
  @Input() create_game: boolean = false;
  @Input() edit: boolean = false;



  memory_nbTile: number = 18;
  memory_settings: string[] = ['image', 'image'];
  memory_isVocaliser: boolean = false;
  memory_bg_color: string = "#3bb8c9";
  memory_text_color: string = "#ffffff";
  memory_good_answer_color: string = "#3498db";
  memory_wrong_answer_color: string = "#e74c3c";
  memory_progress: Progress = Progress.Blue;
  memory_previsualiser: boolean = false;
  sound: boolean = false;
  image: any = [];
  memory_tmp_affichage: string = "5";
  id_crea=localStorage.getItem('id_crea');
  list: any = { id_crea:this.id_crea,image: this.image.toString(), id: 1, bg_color: this.memory_bg_color, text_color: this.memory_text_color, gaw_color: this.memory_good_answer_color, waw_color: this.memory_wrong_answer_color, progress: 'blue', ecri1: this.memory_settings[0], ecri2: this.memory_settings[1], pair: this.memory_nbTile, tmps: this.memory_tmp_affichage, voca: 0 };

  liste_image: Image[] = [];
  selectedImages: Image[] = [];
  formStep: number = 0;

  progressValue: Progress[] = [
    Progress.Blue,
    Progress.Green,
    Progress.LightBlue,
    Progress.Orange,
    Progress.Red
  ];


  started = false;
  pressStart = false;
  nbTile = 18;
  setting: string[] = ["image", "image"];
  tmpAfficher: number = 5000;
  affichage: string[] = [];
  nom: string[] = [];
  isImage: boolean[] = [];

  cursif: boolean[] = [];
  sets: number[] = [];
  hash: number[] = [];
  retourner: string = "0";
  essaie: number = 0;
  nbBon: number = 0;
  finish: boolean = false;
  static synthesis: SpeechSynthesis | null = window.speechSynthesis;;
  static voice: SpeechSynthesisVoice | null = MemoryComponent.synthesis!.getVoices().filter(function (voice) {
    return voice.lang === 'fr';
  })[0];;
  @ViewChild("tile1") tile1!: TileComponent;
  @ViewChild("tile2") tile2!: TileComponent;
  @ViewChild("tile3") tile3!: TileComponent;
  @ViewChild("tile4") tile4!: TileComponent;
  @ViewChild("tile5") tile5!: TileComponent;
  @ViewChild("tile6") tile6!: TileComponent;
  @ViewChild("tile7") tile7!: TileComponent;
  @ViewChild("tile8") tile8!: TileComponent;
  @ViewChild("tile9") tile9!: TileComponent;
  @ViewChild("tile10") tile10!: TileComponent;
  @ViewChild("tile11") tile11!: TileComponent;
  @ViewChild("tile12") tile12!: TileComponent;
  @ViewChild("tile13") tile13!: TileComponent;
  @ViewChild("tile14") tile14!: TileComponent;
  @ViewChild("tile15") tile15!: TileComponent;
  @ViewChild("tile16") tile16!: TileComponent;
  @ViewChild("tile17") tile17!: TileComponent;
  @ViewChild("tile18") tile18!: TileComponent;
  tiles: TileComponent[] = [];

  constructor(private route: ActivatedRoute, private jeuxService: JeuxService, private router: Router) {
    // this.derriere = new Image("Lapin", "../../assets/lapin.webp");
    // this.game = new Memory(this.images, this.derriere, 18, this.setting, '#3bb8c9', 'white', 'blue', 'red', Progress.Blue, "5");
    this.game = null;
    this.derriere = null;

  }
  data: Memory[] = [];
  list_session: Session[] = [];
  recup(donne: any) {
    this.jeuxService.recup_memory(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        donne.push(
          new Memory(data[i].id_memory, data[i].date_memory, this.getImage(data[i].id_image).slice(1), this.getImage(data[i].id_image)[0], data[i].isVoca, data[i].nb_pair, [data[i].sett0, data[i].sett1], data[i].bg_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].tmps,data[i].id_crea)
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
  onSend_delete(id: any) {

    const formData: FormData = new FormData();
    /*for(var i = 0;i<id.lenght;i++){
      formData.append('id[]',id[i]);
    }*/
    formData.append('memory_delete', id);
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
    formData.append('memory_update', JSON.stringify(list));
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        console.log(res.name);
        this.reponse = res;
      },

      error: err => {
        console.log(err);
      },

    });
  }
  reponse: any;
  onSend(list: any) {

    const formData: FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('memory', JSON.stringify(list));
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        console.log(res.name);
        this.reponse = res;
      },

      error: err => {
        console.log(err);
      },

    });
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



  recupImage(donne: any) {
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        donne.push(new Image(data[i].nom, data[i].id_image));
      }
    })
  }

  // Initialisation
  ngOnInit(): void {

    this.recupImage(this.liste_image)
    setTimeout(() => {
      this.recup(this.data);
      this.recupSession(this.list_session);
      this.recupLogin(this.list_login);
    }, 200)

    if (this.game == null || this.game.derriere == null) return;
    this.nbTile = this.game.nbTile;
    this.setting = this.game.setting;
    this.derriere = this.game.derriere;
    this.sound = this.game.isVocaliser;
    this.tmpAfficher = Number(this.game.tmpAffichage) * 1000;
    this.set();


    if (this.edit) {
      this.create_game = true;
      this.selectedImages = [this.game!.derriere].concat(this.game!.images);
      this.memory_nbTile = this.game!.nbTile;
      this.memory_settings = this.game!.setting;
      this.memory_bg_color = this.game!.bg_color;
      this.memory_text_color = this.game!.text_color;
      this.memory_good_answer_color = this.game!.good_answer_color;
      this.memory_wrong_answer_color = this.game!.wrong_answer_color;
      this.memory_progress = this.game!.color_progress_bar;
      this.memory_tmp_affichage = this.game!.tmpAffichage;
      if (+this.game!.isVocaliser == 1) {
        this.memory_isVocaliser = true;
      } else {
        this.memory_isVocaliser = false;
      }
    }

    for (let i of this.selectedImages) {
      this.image.push(i.id);
    }

    this.list = { image: this.image.toString(), id: this.game!.id, bg_color: this.memory_bg_color, text_color: this.memory_text_color, gaw_color: this.memory_good_answer_color, waw_color: this.memory_wrong_answer_color, progress: 'blue', ecri1: this.memory_settings[0], ecri2: this.memory_settings[1], pair: this.memory_nbTile, tmps: this.memory_tmp_affichage, voca: +this.memory_isVocaliser };


  }


  getUser(id : number) : string | null {
    for(let l of this.list_login) {
      if(l.id2 == id) {
        return l.pseudo;
      }
    }
    return null;
  }
  // Initialisation
  ngAfterViewInit(): void {
    if (this.game == null || this.game!.images.length == 0) return;
    this.tiles = [this.tile1, this.tile2, this.tile3, this.tile4, this.tile5, this.tile6, this.tile7, this.tile8, this.tile9, this.tile10, this.tile11, this.tile12, this.tile13, this.tile14, this.tile15, this.tile16, this.tile17, this.tile18];
    for (var i = 0; i < this.nbTile; i++) {
      this.tiles[i].isImage = this.isImage[i];
      this.tiles[i].sound = this.sound;
      this.tiles[i].id = (i + 1).toString();
      this.tiles[i].affichage = this.affichage[i];
      this.tiles[i].nom = this.nom[i];
      this.tiles[i].cursif = this.cursif[i];
    }
    this.disable();
  }

  // Création du memory
  set(): void {
    var val;
    var i = 0;
    var a;
    this.hash = [];
    while (i < this.game!.images.length && i < this.nbTile / 2) {
      for (var x = 0; x < 2; x++) {
        a = this.random();
        this.sets[a] = i;
        switch (this.setting[x]) {
          case "image":
            this.affichage[a] = this.game!.images[i].getSrc();
            this.nom[a] = this.game!.images[i].getNom();
            this.isImage[a] = true;
            this.cursif[a] = false;
            break;
          case "cursif":
            this.affichage[a] = this.game!.images[i].getNom();
            this.nom[a] = this.game!.images[i].getNom();
            this.isImage[a] = false;
            this.cursif[a] = true;
            break;
          case "script":
            this.affichage[a] = this.game!.images[i].getNom();
            this.nom[a] = this.game!.images[i].getNom();
            this.isImage[a] = false;
            this.cursif[a] = false;
            break;
          case "capital":
            this.affichage[a] = this.game!.images[i].getNom().toUpperCase();
            this.nom[a] = this.game!.images[i].getNom();
            this.isImage[a] = false;
            this.cursif[a] = false;
            break;
          case "sound":
            this.affichage[a] = this.game!.images[i].getSrc();
            this.nom[a] = this.game!.images[i].getNom();
            this.isImage[a] = true;
            this.cursif[a] = false;
            break;
        }
      }
      i++
    }
  }

  resetImage(): void {
    this.sound = this.memory_isVocaliser;
    for (var i = 0; i < this.nbTile; i++) {
      this.tiles[i].isImage = this.isImage[i];
      this.tiles[i].sound = this.sound;
      this.tiles[i].id = (i + 1).toString();
      this.tiles[i].affichage = this.affichage[i];
      this.tiles[i].nom = this.nom[i];
      this.tiles[i].cursif = this.cursif[i];
    }
  }

  // Renvoie un nombre aléatoire et jamais 2 fois le même
  random(): number {
    var a = Math.floor(Math.random() * this.nbTile);
    while (this.hash[a] == 1) {
      a++;
      if (a >= this.nbTile) a = 0;
    }
    this.hash[a] = 1;
    return a;
  }

  // Logique du jeu
  retourne(id: string): void {
    if (!this.started) return;
    if (this.retourner == "0") {
      this.retourner = id;
    }
    else {
      this.essaie++;
      if (this.sets[Number(id) - 1] == this.sets[Number(this.retourner) - 1]) {
        this.nbBon++;
        document.getElementById(id)!.style.border = "3px solid";
        document.getElementById(id)!.style.borderColor = this.game!.good_answer_color;
        document.getElementById(this.retourner)!.style.border = "3px solid";
        document.getElementById(this.retourner)!.style.borderColor = this.game!.good_answer_color;
        this.retourner = "0";
        document.getElementById('progressbar')!.style.width = ((this.nbBon / (this.game!.nbTile / 2)) * 100).toString() + '%';
        if (this.nbBon >= this.nbTile / 2) {
          setTimeout(() => {
            this.finish = true;
          }, 1000);
        }
      }
      else {
        this.disable();
        document.getElementById(id)!.style.border = "3px solid";
        document.getElementById(id)!.style.borderColor = this.game!.wrong_answer_color;
        document.getElementById(this.retourner)!.style.border = "3px solid";
        document.getElementById(this.retourner)!.style.borderColor = this.game!.wrong_answer_color;
        setTimeout(() => {
          this.tiles[Number(id) - 1].cacher();
          this.tiles[Number(this.retourner) - 1].cacher();
          document.getElementById(id)!.style.border = "none";
          document.getElementById(this.retourner)!.style.border = "none";
          this.retourner = "0";
          this.enable();
        }, 1000);
      }
    }
  }

  disable(): void {
    for (var i = 0; i < this.nbTile; i++) {
      this.tiles[i].disable = true;
    }
  }

  enable(): void {
    for (var i = 0; i < this.nbTile; i++) {
      this.tiles[i].disable = false;
    }
  }

  // Logique du bouton commencer
  start(): void {
    if (this.pressStart == true) return;
    if (this.tmpAfficher == 0) {
      this.pressStart = true;
      this.enable();
      this.started = true;
      return;
    }
    this.pressStart = true;
    for (var i = 0; i < this.nbTile; i++) {
      console.log(i);
      this.tiles[i].retourner = true;
    }
    setTimeout(() => {
      for (var i = 0; i < this.nbTile; i++) {
        this.tiles[i].cacher();
      }
      this.enable();
      this.started = true;
    }, this.tmpAfficher);
  }


  previewMemory(m: Memory): void {
    this.game = m;
    this.memory_previsualiser = true;
  }

  quitPreviewMemory(): void {
    this.memory_previsualiser = false;
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

  setJeuSession(tab: Jeu[]): string {
    let res = "";
    for (let g of tab) {
      console.log(g)
      res += g.type + ',' + g.id_jeu + ';'
    }
    return res;
  }


  deleteMemory(id: number, s: Session): void {
    let index = -1;
    for (let g of s.jeuId) {
      if (g.type == 'Memory' && g.id_jeu == id) {
        index = s.jeuId.indexOf(g, 0);
      }
    }

    if (index > -1) {
      s.jeuId.splice(index, 1);
    }
  }

  deleteSessionMemory(id: number): void {
    let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);
    for (let s of this.list_session) {
      for (let jeu of s.jeuId) {
        if (jeu.type == 'Memory' && jeu.id_jeu == id) {
          this.deleteMemory(id, s);
          this.list = { nom: s!.nom, isSuivi: +s!.isSuivi, join: +s!.isActive, id: s!.id, jeux_id: this.setJeuSession(s!.jeuId), liste_j: this.setJoueurs(s!) };
          ses.onSend_update(this.list);
        }
      }
    }
  }

  deleteGameMemory(m: Memory): void {
    this.onSend_delete(m.id);
    this.deleteSessionMemory(m.id);
    setTimeout(() => {
      this.data = []
      this.recup(this.data);
    }, 200)
  }

  parseDate(date: Date): string {
    let month: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let index: number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  }

  redirectEditMemory(m: Memory): void {
    window.location.href = '/panel/Memory/edit/' + m.id;
  }

  nextStep(): void {
    let step = this.formStep;
    if (this.formStep < 2) {
      step++;
      this.setFormStep(step);
    }
  }

  previousStep(): void {
    let step = this.formStep;
    if (this.formStep > 0) {
      step--;
      this.setFormStep(step);
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

  setFormStep(step: number): void {
    this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
    this.formStep = step;
    this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(step)!.children.item(0));

  }

  changeProgressValue(jeu: string, element: HTMLSelectElement): void {

    switch (element.value) {
      case 'blue':
        this.memory_progress = Progress.Blue;
        this.list['progress'] = 'blue';
        break;
      case 'green':
        this.memory_progress = Progress.Green;
        this.list['progress'] = 'green';
        break;
      case 'lightblue':
        this.memory_progress = Progress.LightBlue;
        this.list['progress'] = 'lightblue';
        break;
      case 'orange':
        this.memory_progress = Progress.Orange;
        this.list['progress'] = 'orange';
        break;
      case 'red':
        this.memory_progress = Progress.Red;
        this.list['progress'] = 'red';
        break;
    }
  }

  addImage(img: Image): void {
    if (this.selectedImages.indexOf(img) == -1) {
      this.selectedImages.push(img);
      this.image.push(img.id);
      this.list['image'] = this.image.toString();
    }
  }

  deleteImage(i: Image): void {
    let index = this.selectedImages.indexOf(i, 0);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
      this.image.splice(index, 1);
      this.list['image'] = this.image.toString();
    }
  }


  setPrevisualiserMemory(prev: boolean): void {
    if (prev == true) {
      this.game = new Memory(0, "", this.selectedImages.slice(1), this.selectedImages[0], this.sound, this.memory_nbTile, this.memory_settings, this.memory_bg_color, this.memory_text_color, this.memory_good_answer_color, this.memory_wrong_answer_color, this.memory_progress, this.memory_tmp_affichage,Number(this.id_crea));
      this.memory_previsualiser = true;
    }
    else {
      this.memory_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
        this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      }, 0);
    }
  }

  getMemorySetting(n: number): string {
    return this.memory_settings[n];
  }

  changeMemorySetting(n: number, setting: string): void {
    this.memory_settings[n] = setting;
  }

  changeMemoryNbTile(n: number): void {
    this.memory_nbTile = n;
  }

  create(): void {
    this.onSend(this.list);
    this.router.navigate(['/panel/Memory']);
  }

  save(): void {
    this.onSend_update(this.list)
    this.router.navigate(['/panel/Memory']);
  }

  formatLabel(value: number) {
    return value + 's';
  }
}
