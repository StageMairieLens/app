import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Puzzle } from './Puzzle';
import { Image as ImageImport } from '../Image';
import { Guest, Jeu, Progression, SessionsComponent } from '../sessions/sessions.component'
import { ImagesComponent } from '../images/images.component';
import { ActivatedRoute, Router } from '@angular/router';
import { JeuxService } from '../jeux.service';
import { Login } from '../index/login/Login';
import { LoginComponent } from '../index/login/login.component';
import { Session } from '../sessions/Session';
import { ThemeComponent } from '../theme/theme.component';



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
    this.r = null;
  }
  login:string=localStorage.getItem('id_pseudo')!;

  reponse = "";
  data: Puzzle[] = [];
  recup(donne: any) {//Recupere les jeux Puzzle crée par l'utilisateur
    this.jeuxService.recup_puzzle(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if(data[i].id_crea == +localStorage.getItem('id_crea')!){

        donne.push(
          new Puzzle(data[i].id_puzzle, data[i].date_puzzle, this.getImage(data[i].id_images), data[i].bg_color, data[i].title_color, data[i].text_co, data[i].bu_bg_co, data[i].bu_text_co, data[i].type_ecri, data[i].decoupe,data[i].id_crea)
        );
      }
    }
    })
  }

  getImage(s: string): ImageImport[] {//Recupere les images et les ajoutes dans un tableau
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
  onSend(list: any) {//Ajoute le jeu dans la bdd

    const formData: FormData = new FormData();

    formData.append('send', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        this.reponse = res;
      },
    });
  }
  onSend_delete(id: any) {//Supprime le jeu

    const formData: FormData = new FormData();
    var list={table:'Puzzle',id:id,id_table:'id_puzzle'};//Ajoute le nom de la table,le nom de l'id de la table et le numero de l'id
    formData.append('delete', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }
  onSend_update(list: any) {//Update le jeu

    const formData: FormData = new FormData();
    list['id_table']='id_puzzle';//Ajoute le nom de l'id de la table
    formData.append('update', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        this.reponse = res;
      },
    });
  }


  recupImage(donne: any) {//Récupere les images
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          donne.push(new ImageImport(data[i].nom, data[i].id_image, data[i].id_crea));
        }
      }
    })
  }

  liste_image: ImageImport[] = [];
  selectedImages: ImageImport[] = [];


  list_login : Login[] = [];
  recupLogin(donne: any) {//Recupere les données des utilisateurs
    this.jeuxService.recup_user(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
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

  list_session : Session[] = [];
  recupSession(donne: any) {//Recupere les sessions
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


  getJeuSession(s: string): Jeu[] {//Récupere la liste des jeux de la session et les mets en tableau
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

  getJoueurs(s: string, id_session: number): Guest[] {//Récupere la liste des joueurs de la session et les mets en tableau
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

      this.list = { table:'Puzzle', id_images: this.image.toString(), id: this.r!.id, bg_color: this.puzzle_bg_color,text_co: this.puzzle_text_color, title_color: this.puzzle_title_color,bu_bg_co: this.puzzle_button_bg_color,bu_text_co: this.puzzle_button_text_color,type_ecri: this.puzzle_type_ecriture, decoupe: this.decoupe };

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
  list: any = { table:'Puzzle',id_crea:this.id_crea,id_images: this.image.toString(), id: 1, bg_color: this.puzzle_bg_color,text_co: this.puzzle_text_color, title_color: this.puzzle_title_color,bu_bg_co: this.puzzle_button_bg_color,bu_text_co: this.puzzle_button_text_color,type_ecri: this.puzzle_type_ecriture, decoupe: this.decoupe };
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

  // Check si le puzzle est fini
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
  }

  //Permet de previsualiser le jeu
  previewPuzzle(r: Puzzle): void {
    this.r = r;
    this.puzzle_previsualiser = true;
  }

  //Quitte la previsualition en cours 
  quitPreviewPuzzle(): void {
    this.puzzle_previsualiser = false;
  }

  //delete le jeu Puzzle de toutes les sessions qui le contient
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

  setJoueurs(s: Session): string {//Cast les données des joueurs dans le type string pour la base de donnée de la table session
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

  setJeuSession(tab: Jeu[]): string {//Cast les données des jeux dans le type string pour la base de donnée de la table session
    let res = "";
    for (let g of tab) {
      res += g.type + ',' + g.id_jeu + ';'
    }
    return res;
  }

  deleteSessionPuzzle(id : number) : void {//Delete le jeu de toutes sessions auquel il appartient
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

  deleteThemePuzzle(id: number): void {//Delete le jeu Abecedaire du theme
    let theme = new ThemeComponent(this.route, this.jeuxService, this.router);
    let liste: any = [];
    theme.recup2(liste);
    let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);

    setTimeout(() => {
      for (let t of liste) {
        let array = ses.getJeuSession(t.id_jeux);
        let index = -1;
        for (let j of array) {
          if (j.type == 'Puzzle') {
            if (j.id_jeu == id) {
              index = array.indexOf(j);
            }
          }
        }

        if (index > -1) {
          array.splice(index, 1);
          t.id_jeux = ses.setJeuSession(array);
          theme.onSend_update({id_theme : t.id, id : t.id_image , id_jeux : t.id_jeux , nom : t.nom});
        }
      }
    }, 200)
  }

  deleteGamePuzzle(r: Puzzle): void {//Supprime le jeu Abecedaire de partout
    this.onSend_delete(r.id);
    this.deleteSessionPuzzle(r.id);
    this.deleteThemePuzzle(r.id);
    setTimeout(() => {
      this.data = [];
      this.recup(this.data)
    }, 400)
  }

  setPrevisualiserPuzzle(prev: boolean): void {//Affiche le jeu dans la prévisualisation
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

  setActive(element: Element | null): void {// Donne Du style
    (<HTMLButtonElement>element!).style.background = 'white';
    (<HTMLButtonElement>element!).style.color = 'black';
  }

  setInactive(element: Element | null) {//Enleve  Du style
    (<HTMLButtonElement>element!).style.background = '';
    (<HTMLButtonElement>element!).style.color = 'white';
  }

  nextStep(): void {//Permet d'aller a l'étape suivante dans le formulaire de création et d'édit
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

  previousStep(): void {//Permet d'aller a l'étape précédente dans le formulaire de création et d'édit
    let step = this.formStep;
    if (this.formStep > 0) {
      step--;
      this.setFormStep(step);
    }
  }

  save(): void {//Sauvegarde les changement lors d'un edit et fait l'update dans la bd
    this.onSend_update(this.list)
    this.router.navigate(['/panel/Puzzle']);
  }

  redirectEditPuzzle(p: Puzzle): void {
    window.location.href = '/panel/Puzzle/edit/' + p.id;
  }

  create(): void {//Crée le jeu Puzzle avec les parametres soit par défaut, soit modifier à la création
    this.list = {table:'Puzzle', id_images: this.image.toString(), id: 1, bg_color: this.puzzle_bg_color,text_co: this.puzzle_text_color, title_color: this.puzzle_title_color,bu_bg_co: this.puzzle_button_bg_color,bu_text_co: this.puzzle_button_text_color,type_ecri: this.puzzle_type_ecriture, decoupe: this.decoupe,id_crea:Number(this.id_crea) };
    this.onSend(this.list)
    this.router.navigate(['/panel/Puzzle']);
  }

  addImage(img: ImageImport): void {//ajoute les images choisit dans la liste
    if (this.selectedImages.indexOf(img) == -1) {
      this.selectedImages.push(img);
      this.image.push(img.id);
      this.list['id_images'] = this.image.toString();
    }
  }

  deleteImage(i: ImageImport): void {//Supprime les images de la liste
    let index = this.selectedImages.indexOf(i, 0);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
      this.image.splice(index, 1);
      this.list['id_images'] = this.image.toString();
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
