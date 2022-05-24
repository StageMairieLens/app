import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Jeu, SessionsComponent, Guest, Progression } from '../sessions/sessions.component';
import { BoyGirl } from './BoygGirl'
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { JeuxService } from '../jeux.service';
import { Login } from '../index/login/Login';
import { LoginComponent } from '../index/login/login.component';
import { Session } from '../sessions/Session';

@Component({
  selector: 'app-boy-girl-game',
  templateUrl: './boy-girl-game.component.html',
  styleUrls: ['./boy-girl-game.component.css']
})
export class BoyGirlGameComponent implements OnInit {

  constructor(private route : ActivatedRoute,private jeuxService: JeuxService, private router: Router) {
    this.bg = null;

    // this.bg = new BoyGirl(this.girl, this.boy, '#3bb8c9', 'pink', 'blue', 'orange', 'brown', 'lightblue', 'red', 'black', 'black', 'black', 'black', 'white', 'black', 'SCRIPT');
    this.recup(this.data);
    this.recupLogin(this.list_login);
    this.recupSession(this.list_session);
  }

  list_session : Session[] = [];
  login:string=localStorage.getItem('id_pseudo')!;

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
          new Session(data[i].Id, data[i].nom, data[i].date, this.getJeuSession(data[i].Jeux_id), isJ, this.getJoueurs(data[i].liste_j, data[i].Id), isS , +data[i].Id_createur)
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

  list_login : Login[] = [];
  recupLogin(donne: any) {
      this.jeuxService.recup_user(donne).subscribe(data => {

        for (var i = 0; data[i] != null; i++) {
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
  reponse = "";
  onSend(list: any) {

    const formData: FormData = new FormData();
    formData.append('send', JSON.stringify(list));
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
  onSend_delete(id: any) {

    const formData: FormData = new FormData();
    var list={table:'girlsandboys',id:id,id_table:'id_gb'};
    formData.append('delete', JSON.stringify(list));
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
    list['id_table']='id_gb';
    formData.append('update', JSON.stringify(list));
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
  data: BoyGirl[] = [];
  recup(donne: any) {
    this.jeuxService.recup_bg(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if(data[i].id_crea == +localStorage.getItem('id_crea')!){

        donne.push(
          new BoyGirl(data[i].id_gb, data[i].date_gb, this.getMots(data[i].l_m_f), this.getMots(data[i].l_m_b), data[i].bg_color, data[i].bg_color_f, data[i].bg_color_b, data[i].bg_color_m, data[i].word_f, data[i].word_b, data[i].word_m, data[i].title_f, data[i].title_b, data[i].title_m, data[i].text_f, data[i].text_b, data[i].text_m, data[i].type_ecri,data[i].id_crea)
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

  ngOnInit(): void {

    if (this.bg != null) {
      this.boy = this.bg!.listMotsGarcon;
      this.girl = this.bg!.listMotsFille;

      this.girlFinish = this.girl;
      this.boyFinish = this.boy;

      this.mots = this.boy.concat(this.girl);
      this.taille_ini = this.mots.length;
      this.boy = [];
      this.girl = [];
      this.shuffle();
    }
    

    if (this.edit) {
      this.create_game = true;
      this.boygirl_listMotsFille = this.bg!.listMotsFille;
      this.boygirl_listMotsGarcon = this.bg!.listMotsGarcon;
      this.boygirl_bg_color_container = this.bg!.bg_color_container;
      this.boygirl_bg_color_fille = this.bg!.bg_color_fille;
      this.boygirl_bg_color_garcon = this.bg!.bg_color_garcon;
      this.boygirl_bg_color_mot = this.bg!.bg_color_mot;
      this.boygirl_word_color_fille = this.bg!.word_color_fille;
      this.boygirl_word_color_garcon = this.bg!.word_color_garcon;
      this.boygirl_word_color_mot = this.bg!.word_color_mot;
      this.boygirl_title_color_fille = this.bg!.title_color_fille;
      this.boygirl_title_color_garcon = this.bg!.title_color_garcon;
      this.boygirl_title_color_mot = this.bg!.title_color_mot;
      this.boygirl_text_color_fille = this.bg!.text_color_fille;
      this.boygirl_text_color_garcon = this.bg!.text_color_garcon;
      this.boygirl_text_color_mot = this.bg!.text_color_mot;
      this.boygirl_type_ecriture = this.bg!.type_ecriture;

      this.list = {
        table:'girlsandboys',
        id: this.bg!.id , bg_color: this.boygirl_bg_color_container,
        bg_color_b: this.boygirl_bg_color_garcon, bg_color_f: this.boygirl_bg_color_fille, bg_color_m: this.boygirl_bg_color_mot,
        word_f: this.boygirl_word_color_fille, word_b: this.boygirl_word_color_garcon, word_m: this.boygirl_word_color_mot,
        title_f: this.boygirl_title_color_fille, title_b: this.boygirl_title_color_garcon, title_m: this.boygirl_title_color_mot,
        text_f: this.boygirl_text_color_fille, text_b: this.boygirl_text_color_garcon, text_m: this.boygirl_text_color_mot,
        id_crea:this.id_crea,
        type_ecri: this.boygirl_type_ecriture,
         l_m_f: this.boygirl_listMotsFille.toString(), l_m_b: this.boygirl_listMotsGarcon.toString()
      };
    }

  }


  @Input() bg: BoyGirl | null;
  @Input() showTitle: boolean = true;
  @Input() play: boolean = true;
  @Input() showList: boolean = false;
  @Input() create_game: boolean = false;
  @Input() edit: boolean = false;

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
  id_crea=localStorage.getItem('id_crea');
  list: any = {
    table:'girlsandboys',
    id: 1, bg_color: this.boygirl_bg_color_container,
    bg_color_b: this.boygirl_bg_color_garcon, bg_color_f: this.boygirl_bg_color_fille, bg_color_m: this.boygirl_bg_color_mot,
    word_f: this.boygirl_word_color_fille, word_b: this.boygirl_word_color_garcon, word_m: this.boygirl_word_color_mot,
    title_f: this.boygirl_title_color_fille, title_b: this.boygirl_title_color_garcon, title_m: this.boygirl_title_color_mot,
    text_f: this.boygirl_text_color_fille, text_b: this.boygirl_text_color_garcon, text_m: this.boygirl_text_color_mot,
    type_ecri: this.boygirl_type_ecriture, l_m_f: this.boygirl_listMotsFille.toString(), l_m_b: this.boygirl_listMotsGarcon.toString(),
    id_crea:this.id_crea
  };


  formStep: number = 0;

  finish: boolean = false;
  mots: string[] = [];

  girl: string[] = [];
  girlFinish: string[] = this.girl;

  boy: string[] = [];
  boyFinish: string[] = this.boy;
  taille_ini: number = 0;



  checkBoy(): boolean {

    if (this.boy.length == this.boyFinish.length) {
      let result = true;
      for (let i = 0; i < this.boy.length; i++) {
        if (!this.boyFinish.includes(this.boy[i])) {
          return false;
        }
      }
      return result;
    }
    return false;
  }

  checkGirl(): boolean {
    if (this.girl.length == this.girlFinish.length) {
      let result = true;
      for (let i = 0; i < this.girl.length; i++) {
        if (!this.girlFinish.includes(this.girl[i])) {
          return false;
        }
      }
      return result;
    }
    return false;

  }

  shuffle(): void {
    var m = this.mots.length, t, i, t2;

    while (m) {
      i = Math.floor(Math.random() * m--);

      t = this.mots[m];
      this.mots[m] = this.mots[i];
      this.mots[i] = t;
    }
  }

  drop(event: CdkDragDrop<string[]>) {


    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    if ((this.checkBoy() && this.checkGirl()) && this.mots.length == 0) {
      this.finish = true;
      document.getElementById('content')!.style.display = 'none';
      document.getElementById('container')!.style.display = 'none';
    }

  }

  previewBoyGirl(bg: BoyGirl): void {
    this.bg = bg;
    this.boygirl_previsualiser = true;
  }

  quitPreviewBoyGirl(): void {
    this.boygirl_previsualiser = false;
  }

  deleteBoyGirl(id : number, s : Session): void {
    let index = -1;
    for (let g of s.jeuId) {
      if (g.type == 'Fille&Garçon' && g.id_jeu == id) {
        index = s.jeuId.indexOf(g, 0);
      }
    }

    if (index > -1) {
      s.jeuId.splice(index, 1);
    }
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


  deleteSessionBoyGirl(id : number) : void {
    let ses : SessionsComponent = new SessionsComponent(this.router,this.route,this.jeuxService);
    for (let s of this.list_session) {
      for(let jeu of s.jeuId) {
        if(jeu.type == 'Fille&Garçon' && jeu.id_jeu == id) {
          this.deleteBoyGirl(id , s);
          this.list = { nom: s!.nom, isSuivi: +s!.isSuivi, join: +s!.isActive, id: s!.id, jeux_id: this.setJeuSession(s!.jeuId), liste_j: this.setJoueurs(s!) };
          ses.onSend_update(this.list);
        }
      }
    }
  }

  deleteGameBoyGirl(bg: BoyGirl): void {
    this.onSend_delete(bg.id);
    this.deleteSessionBoyGirl(bg.id);
    setTimeout(() => {
      this.data = [];
      this.recup(this.data)
    }, 200)
  }

  redirectEditBoyGirl(bg: BoyGirl): void {
    window.location.href = '/panel/Fille&Garçon/edit/' + bg.id;
  }

  addMotsFille(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.boygirl_listMotsFille.push(value);
      this.list['l_m_f'] = this.boygirl_listMotsFille.toString();
      console.log(this.list['l_m_f']);
    }

    event.chipInput!.clear();
  }

  removeFille(str: string): void {
    const index = this.boygirl_listMotsFille.indexOf(str);

    if (index >= 0) {
      this.boygirl_listMotsFille.splice(index, 1);
      this.list['l_m_f'] = this.boygirl_listMotsFille.toString();
      console.log(this.list['l_m_f']);
    }
  }

  addMotsGarcon(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.boygirl_listMotsGarcon.push(value);
      this.list['l_m_b'] = this.boygirl_listMotsGarcon.toString();
      console.log(this.list['l_m_b']);
    }

    event.chipInput!.clear();
  }

  removeGarcon(str: string): void {
    const index = this.boygirl_listMotsGarcon.indexOf(str);

    if (index >= 0) {
      this.boygirl_listMotsGarcon.splice(index, 1);
      this.list['l_m_b'] = this.boygirl_listMotsGarcon.toString();
      console.log(this.list['l_m_b']);
    }
  }

  setPrevisualiserBoyGirl(prev: boolean): void {
    if (prev == true) {
      this.bg = new BoyGirl(0, '', this.boygirl_listMotsFille, this.boygirl_listMotsGarcon, this.boygirl_bg_color_container, this.boygirl_bg_color_fille, this.boygirl_bg_color_garcon, this.boygirl_bg_color_mot, this.boygirl_word_color_fille, this.boygirl_word_color_garcon, this.boygirl_word_color_mot, this.boygirl_title_color_fille, this.boygirl_title_color_garcon, this.boygirl_title_color_mot, this.boygirl_text_color_fille, this.boygirl_text_color_garcon, this.boygirl_text_color_mot, this.boygirl_type_ecriture,Number(this.id_crea));
      this.boygirl_previsualiser = true;
    }
    else {
      this.boygirl_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
        this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      }, 0);
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
    if (this.formStep < 1) {
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

  setFormStep(step: number): void {
    this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
    this.formStep = step;
    this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(step)!.children.item(0));

  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;


  create(): void {
    this.onSend(this.list)
    setTimeout(() => {
      this.router.navigate(['/panel/Fille&Garçon']);
    },200)
  }

  save(): void {
    this.onSend_update(this.list)
    setTimeout(() => {
      this.router.navigate(['/panel/Fille&Garçon']);
    },200)
  }

}
