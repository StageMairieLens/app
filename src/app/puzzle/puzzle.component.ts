import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Puzzle } from './Puzzle';
import { Image as ImageImport } from '../Image';
import { Guest, Jeu, Progression, SessionsComponent } from '../sessions/sessions.component'
import { Progress } from '../Progress';
import { ImagesComponent } from '../images/images.component';
import { ActivatedRoute, Router } from '@angular/router';
import { JeuxService } from '../jeux.service';
import { Login } from '../index/login/Login';
import { LoginComponent } from '../index/login/login.component';
import { Session } from '../sessions/Session';
import { Users } from '../users/Users';

declare function restart(gridsize: number, imagess: any): any;
declare function rules(): any;
declare function lance(gridsize: number, imagess: any): any;
declare var images: any;


interface tuile {
  x: number;
  y: number;
}


@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css'],

})



export class PuzzleComponent implements OnInit {


  constructor(private route : ActivatedRoute,private jeuxService: JeuxService, private router: Router) {
    this.r = new Puzzle(0, '', [this.liste_image[5], this.liste_image[2]], 'yellow', 'blue', 'black', 'green', 'red', 'SCRIPT', 5,Number(this.id_crea));
    // this.r = null;
    //


  }

  reponse = "";
  data: Puzzle[] = [];
  recup(donne: any) {
    this.jeuxService.recup_puzzle(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        donne.push(
          new Puzzle(data[i].id_puzzle, data[i].date_puzzle, this.getImage(data[i].id_images), data[i].bg_color, data[i].title_color, data[i].text_color, data[i].bu_bg_co, data[i].bu_txt_co, data[i].type_ecri, data[i].decoupe,data[i].id_crea)
        );
      }

    })

  }

  getImage(s: string): ImageImport[] {
    let res = [];
    let tab = s.split(',');
    if (s.length != 0) {
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
  onSend(list: any) {

    const formData: FormData = new FormData();

    formData.append('puzzle', JSON.stringify(list));
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
    /*for(var i = 0;i<id.lenght;i++){
      formData.append('id[]',id[i]);
    }*/
    formData.append('puzzle_delete', id);
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
    formData.append('puzzle_update', JSON.stringify(list));
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


  recupImage(donne: any) {
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        donne.push(new ImageImport(data[i].nom, data[i].id_image,data[i].id_crea));
      }
    })
  }

  liste_image: ImageImport[] = [];
  selectedImages: ImageImport[] = [];


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


  getUser(id : number) : string | null {
    for(let l of this.list_login) {
      if(l.id2 == id) {
        return l.pseudo;
      }
    }
    return null;
  }

  list_session : Session[] = [];
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

  ngOnInit(): void {

    this.recupImage(this.liste_image)
    setTimeout(() => {
      this.recup(this.data);
      this.recupLogin(this.list_login);
      this.recupSession(this.list_session);
    },200)


    if (this.r != null && this.play) {
      this.decoupageImage();


      for (let i = 0; i < this.r!.decoupe * this.r!.decoupe; i++) {
        this.nombre.push(i);
        this.plateau[i] = [];
        this.dragList.push(('plateau_list_' + i));
      }

      for (let i of this.nombre) {
        this.plateau[i].push(this.decoupage[i])
      }

      this.shuffle();

    }


    if (this.edit) {
      this.create_game = true;
      this.selectedImages = this.r!.liste_images;
      this.puzzle_title_color = this.r!.title_color;
      this.puzzle_bg_color = this.r!.bg_color;
      this.puzzle_button_bg_color = this.r!.button_bg_color;
      this.puzzle_button_text_color = this.r!.button_text_color;
      this.puzzle_type_ecriture = this.r!.typeEcriture;
      this.puzzle_text_color = this.r!.text_color;
      this.decoupe = this.r!.decoupe;

      for (let i of this.selectedImages) {
        this.image.push(i.id);
      }

      this.list = { image: this.image.toString(), id: this.r!.id, bg_color: this.puzzle_bg_color, text_color: this.puzzle_text_color, title_color: this.puzzle_title_color, button_bg_color: this.puzzle_button_bg_color, button_text_color: this.puzzle_button_text_color, ecri: this.puzzle_type_ecriture, decoupe: this.decoupe };

    }



  }

  puzzle_bg_color: string = "#3bb8c9";
  puzzle_title_color: string = "#ffffff";
  puzzle_button_bg_color: string = "#0f73b1";
  puzzle_button_text_color: string = "#ffffff";
  puzzle_type_ecriture = "SCRIPT";
  puzzle_text_color: string = "#000000";
  puzzle_previsualiser: boolean = false;
  decoupe: number = 4;
  formStep: number = 0;
  image: any = [];
  id_crea=localStorage.getItem('id_crea');
  list: any = { id_crea:this.id_crea,image: this.image.toString(), id: 1, bg_color: this.puzzle_bg_color, text_color: this.puzzle_text_color, title_color: this.puzzle_title_color, button_bg_color: this.puzzle_button_bg_color, button_text_color: this.puzzle_button_text_color, ecri: this.puzzle_type_ecriture, decoupe: this.decoupe };
  prochaine_image = 0;


  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Puzzle | null;
  @Input() showTitle: boolean = true;
  @Input() play: boolean = true;
  @Input() showList: boolean = false;
  @Input() create_game: boolean = false;
  @Input() edit: boolean = false;

  decoupage: tuile[] = [];
  nombre: number[] = [];
  plateau: [tuile[]] = [[]];
  dragList: string[] = [];
  selected_image: HTMLImageElement[] = [];
  showModel: boolean = false;


  checkPuzzle(): boolean {
    for (let i = 0; i < this.r!.decoupe * this.r!.decoupe; i++) {
      if (this.decoupage[i] != this.plateau[i][0]) {
        return false;
      }
    }
    return true;
  }

  shuffle(): void {
    var j, x, i;
    for (i = this.plateau.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this.plateau[i];
      this.plateau[i] = this.plateau[j];
      this.plateau[j] = x;
    }

    if (this.checkPuzzle()) {
      this.shuffle();
    }
  }

  decoupageImage(): void {
    this.decoupage = [];
    for (let i = 0; i < this.r!.decoupe * this.r!.decoupe; i++) {
      this.decoupage.push(
        { x: ((100 / (this.r!.decoupe - 1)) * (i % this.r!.decoupe)), y: ((100 / (this.r!.decoupe - 1)) * Math.floor(i / this.r!.decoupe)) }
      )
    }
  }

  // switch(t1: tuile[], t2: tuile[]): void {
  //   let tmp = t1[0];
  //   t1[0] = t2[0];
  //   t2[0] = tmp;
  // }

  drop(event: CdkDragDrop<tuile[]>) {

    if (event.container.data.length == 0) {
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
    }
    else if (event.container.data.length == 1) {

      if (event.previousContainer.id != 'decoupage_list') {
        let i = +event.container.id.split('_')[2];
        let iprime = +event.previousContainer.id.split('_')[2];

        let el = event.container.data[0];

        this.plateau[i].splice(0);
        this.plateau[iprime].push(el);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );

      }
      else {
        let i = +event.container.id.split('_')[2];

        let el = event.container.data[0];
        this.plateau[i].splice(0);
        this.decoupage.push(el);

        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }


    }

    if (this.checkPuzzle()) {
      this.prochaine_image++;
      this.plateau = [[]];
      this.nombre = [];
      this.dragList = [];
      this.decoupageImage();


      for (let i = 0; i < this.r!.decoupe * this.r!.decoupe; i++) {
        this.nombre.push(i);
        this.plateau[i] = [];
        this.dragList.push(('plateau_list_' + i));
      }

      for (let i of this.nombre) {
        this.plateau[i].push(this.decoupage[i])
      }

      this.shuffle();

    }
    console.log(this.prochaine_image, this.r!.liste_images)

  }



  previewPuzzle(r: Puzzle): void {
    this.r = r;
    this.puzzle_previsualiser = true;
  }

  quitPreviewPuzzle(): void {
    this.puzzle_previsualiser = false;
  }

  deletePuzzle(id : number, s : Session): void {
    let index = -1;
    for (let g of s.jeuId) {
      if (g.type == 'Puzzle' && g.id_jeu == id) {
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


  deleteSessionPuzzle(id : number) : void {
    let ses : SessionsComponent = new SessionsComponent(this.router,this.route,this.jeuxService);
    for (let s of this.list_session) {
      for(let jeu of s.jeuId) {
        if(jeu.type == 'Puzzle' && jeu.id_jeu == id) {
          this.deletePuzzle(id , s);
          this.list = { nom: s!.nom, isSuivi: +s!.isSuivi, join: +s!.isActive, id: s!.id, jeux_id: this.setJeuSession(s!.jeuId), liste_j: this.setJoueurs(s!) };
          ses.onSend_update(this.list);
        }
      }
    }
  }

  deleteGamePuzzle(r: Puzzle): void {
    this.onSend_delete(r.id);
    this.deleteSessionPuzzle(r.id);
    setTimeout(() => {
      this.data = [];
      this.recup(this.data)
    }, 200)
  }




  setPrevisualiserPuzzle(prev: boolean): void {
    if (prev == true) {
      this.r = new Puzzle(0, '', this.selectedImages, this.puzzle_bg_color, this.puzzle_title_color, this.puzzle_text_color, this.puzzle_button_bg_color, this.puzzle_button_text_color, this.puzzle_type_ecriture, Number(this.decoupe),Number(this.id_crea));
      this.puzzle_previsualiser = true;
    }
    else {
      this.puzzle_previsualiser = false;
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

  save(): void {
    this.onSend_update(this.list)
    this.router.navigate(['/panel/Puzzle']);
  }


  parseDate(date: Date): string {
    let month: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let index: number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  }

  redirectEditPuzzle(p: Puzzle): void {
    window.location.href = '/panel/Puzzle/edit/' + p.id;
  }

  create(): void {
    this.list = { image: this.image.toString(), id: 1, bg_color: this.puzzle_bg_color, text_color: this.puzzle_text_color, title_color: this.puzzle_title_color, button_bg_color: this.puzzle_button_bg_color, button_text_color: this.puzzle_button_text_color, ecri: this.puzzle_type_ecriture, decoupe: this.decoupe,id_crea:Number(this.id_crea) };
    this.onSend(this.list)
    this.router.navigate(['/panel/Puzzle']);
  }

  addImage(img: ImageImport): void {
    if (this.selectedImages.indexOf(img) == -1) {
      this.selectedImages.push(img);
      this.image.push(img.id);
      this.list['image'] = this.image.toString();
    }
  }

  deleteImage(i: ImageImport): void {
    let index = this.selectedImages.indexOf(i, 0);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
      this.image.splice(index, 1);
      this.list['image'] = this.image.toString();
    }
  }

  formatLabel(value: number) {
    if (value >= 2) {
      this.decoupe = value * value
      return Math.round(value * value);
    }

    return value;
  }



}



