import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../Image';
import { ImagesComponent } from '../images/images.component';
import { Progress } from '../Progress';
import { Guest, Jeu, Progression, SessionsComponent } from '../sessions/sessions.component';
import { Abecedaire } from './Abecedaire';
import { JeuxService } from '../jeux.service';
import { Login } from '../index/login/Login';
import { LoginComponent } from '../index/login/login.component';
import { Session } from '../sessions/Session';
import { ThemeComponent } from '../theme/theme.component';

@Component({
  selector: 'app-abecedaire',
  templateUrl: './abecedaire.component.html',
  styleUrls: ['./abecedaire.component.css']
})
export class AbecedaireComponent implements OnInit {

  @Input() game: Abecedaire | null;
  @Input() showTitle: boolean = true;
  @Input() play: boolean = true;
  @Input() showList: boolean = false;
  @Input() create_game: boolean = false;
  @Input() edit: boolean = false;

  login:string=localStorage.getItem('id_pseudo')!;


  liste_image: Image[] = [];
  selectedImages: Image[] = [];
  progressValue: Progress[] = [
    Progress.Blue,
    Progress.Green,
    Progress.LightBlue,
    Progress.Orange,
    Progress.Red
  ];
  formStep: number = 0;


  rightLetter = '';
  errors = 0;
  nbEntries = 0;
  sound = true;
  afficherMot = "CURSIF";
  finish = false;

  synthesis: SpeechSynthesis | null = window.speechSynthesis;;
  voice: SpeechSynthesisVoice | null = this.synthesis!.getVoices().filter(function (voice) {
    return voice.lang === 'fr';
  })[0];;

  abecedaire_bg_color: string = "#3bb8c9";
  abecedaire_text_color: string = "#ffffff";
  abecedaire_good_answer_color: string = "#3498db";
  abecedaire_wrong_answer_color: string = "#e74c3c";
  abecedaire_progress: Progress = Progress.Blue;
  abecedaire_button_bg_color: string = "#f39c12";
  abecedaire_button_text_color: string = "#ffffff";
  abecedaire_type_ecriture: string = "SCRIPT";
  abecedaire_isVocaliser: boolean = false;
  id_crea = localStorage.getItem('id_crea');
  image: any = [];
  abecedaire_previsualiser: boolean = false;
  list: any = {table:'Abcdr',id_image: this.image.toString(), id: 1, bg_color: this.abecedaire_bg_color, text_color: this.abecedaire_text_color, gaw: this.abecedaire_good_answer_color, waw: this.abecedaire_wrong_answer_color,bu_bg_co: this.abecedaire_button_bg_color,bu_txt_co: this.abecedaire_button_text_color, progress: 'blue',type_ecri: this.abecedaire_type_ecriture,isVoca: 0, id_crea: this.id_crea };

  constructor(private route: ActivatedRoute, private jeuxService: JeuxService, private router: Router) {
    this.game = null;
  }
  reponse: any;
  onSend(list: any) {//Envoi les données du jeu 

    const formData: FormData = new FormData();
    formData.append('send', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        this.reponse = res;
      },
    });
  }
  onSend_delete(id: any) {//Supprime les données du jeu

    const formData: FormData = new FormData();
    var list={table:'Abcdr',id:id,id_table:'id_abcdr'};//Ajoute le nom de la table,le nom de l'id de la table et le numero de l'id
    formData.append('delete', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }
  onSend_update(list: any) {

    const formData: FormData = new FormData();
    list['id_table']='id_abcdr';//Ajoute le nom de l'id de la table
    formData.append('update', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        this.reponse = res;
      },
    });
  }
  data: Abecedaire[] = [];
  recup(donne: any) {//Recupere les jeux Abcdr crée par l'utilisateur
    this.jeuxService.recup_abcd(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if(data[i].id_crea == +localStorage.getItem('id_crea')!){

        donne.push(
          new Abecedaire(data[i].id_abcdr, data[i].date_abcdr, this.getImage(data[i].id_image), data[i].bg_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_co, data[i].bu_txt_co, data[i].isVoca, data[i].type_ecri, data[i].id_crea)
        );
        }
      }
    })

  }

  getImage(s: string): Image[] {//Recupere les images et les ajoutes dans un tableau
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

  list_session: Session[] = [];
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

  list_login: Login[] = [];
  recupLogin(donne: any) {//Recupere les données des utilisateurs
    this.jeuxService.recup_user(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        donne.push(new Login(data[i].id_user, data[i].mail_user, data[i].password_user, data[i].connect, data[i].pseudo));
        var inn = 0;
        for (var j = 0; LoginComponent.logins[j]; j++) {
          if (data[i].mail_user == LoginComponent.logins[j]) {
            inn = 1;
          }
        }
        if (inn == 0) {
          LoginComponent.logins.push(new Login(data[i].id_user, data[i].mail_user, data[i].password_user, data[i].connect, data[i].pseudo));
        }
      }
    })
  }

  recupImage(donne: any) {//Récupere les images depuis la bdd
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          donne.push(new Image(data[i].nom, data[i].id_image, data[i].id_crea));
        }
      }
    })
  }

  // Initialisation
  ngOnInit(): void {

    this.recupImage(this.liste_image)
    setTimeout(() => {
      this.recup(this.data);
      this.recupLogin(this.list_login);
      this.recupSession(this.list_session);
    }, 200)

    if (this.game != null) {
      if (this.game!.images.length != 0) {
        this.rightLetter = this.game!.images[this.nbEntries].getNom()[0].toUpperCase();
        this.afficherMot = this.game!.typeEcriture;
        this.sound = this.game!.isVocaliser;
      }

    }

    if (this.edit) {
      this.create_game = true;
      this.selectedImages = this.game!.images;
      this.abecedaire_bg_color = this.game!.bg_color;
      this.abecedaire_text_color = this.game!.text_color;
      this.abecedaire_good_answer_color = this.game!.good_answer_color;
      this.abecedaire_wrong_answer_color = this.game!.wrong_answer_color;
      this.abecedaire_progress = this.game!.color_progress_bar;
      this.abecedaire_button_bg_color = this.game!.button_bg_color;
      this.abecedaire_button_text_color = this.game!.button_text_color;
      this.abecedaire_type_ecriture = this.game!.typeEcriture;
      if (+this.game!.isVocaliser == 1) {
        this.abecedaire_isVocaliser = true;
      } else {
        this.abecedaire_isVocaliser = false;
      }

      for (let i of this.selectedImages) {
        this.image.push(i.id)
      }

      this.list = {table:'Abcdr',id_image: this.image.toString(), id: this.game!.id, bg_color: this.abecedaire_bg_color, text_color: this.abecedaire_text_color, gaw: this.abecedaire_good_answer_color, waw: this.abecedaire_wrong_answer_color,bu_bg_co: this.abecedaire_button_bg_color,bu_txt_co: this.abecedaire_button_text_color, progress: 'blue',type_ecri: this.abecedaire_type_ecriture,isVoca: +this.abecedaire_isVocaliser };

    }
  }

  // Vocalisation
  vocalise(): void {
    this.synthesis!.cancel();
    var utterance = new SpeechSynthesisUtterance(this.game!.images[this.nbEntries].getNom());
    utterance.voice = this.voice;
    utterance.pitch = 1;
    utterance.rate = 0.7;
    this.synthesis!.speak(utterance);
  }

  nextImage() {
    if (this.nbEntries == this.game!.images.length) {
      var buttons = document.getElementsByClassName("button");
      for (var i = 0; i < buttons.length; i++) {
        (buttons.item(i) as HTMLButtonElement).style.backgroundColor = this.game!.button_bg_color;
      }
      this.finish = true;
      this.sendProgress();

    }
    else {
      this.rightLetter = this.game!.images[this.nbEntries].getNom()[0].toUpperCase();
      this.resetButton();
    }
  }

  errorsPlus(): void {
    this.errors++;
  }

  resetErrors(): void {
    this.errors = 0;
  }

  // Logique du jeu
  click($event: MouseEvent, letter: string): void {
    ($event.target as HTMLButtonElement).disabled = true;
    if (letter == this.rightLetter) {
      ($event.target as HTMLButtonElement).style.backgroundColor = this.game!.good_answer_color;
      var buttons = document.getElementsByClassName("button");
      for (var i = 0; i < buttons.length; i++) {
        (buttons.item(i) as HTMLButtonElement).disabled = true;
      }
      setTimeout(() => {
        this.nbEntries++;
        document.getElementById('progressbar')!.style.width = ((this.nbEntries / (this.game!.images.length)) * 100).toString() + '%';
        this.sendProgress();

        this.nextImage();
      }, 1000);
    }
    else {
      this.errorsPlus();
      this.sendProgress();

      ($event.target as HTMLButtonElement).style.backgroundColor = this.game!.wrong_answer_color;
    }
  }

  //Récupere la session du jeu
  getSession(): Session | null {
    for (let s of this.list_session) {
      for (let j of s.jeuId) {
        if (j.type == 'Abecedaire') {
          if (j.id_jeu == this.game!.id) {
            return s;
          }
        }
      }
    }
    return null
  }

  getJeuById(): number {//Récupère le jeu de la session par son id
    for (let i = 0; i < this.getSession()!.jeuId.length; i++) {
      if (this.getSession()!.jeuId[i].type == 'Abecedaire') {
        if (this.getSession()!.jeuId[i].id_jeu == this.game!.id) {
          return i;
        }
      }
    }
    return -1;
  }

  getJoueur(): Guest | null {//Récupère les informations du joueur actuel
    for (let g of this.getSession()!.joueur) {
      if (g.id == +localStorage.getItem('id_user')!) {
        return g;
      }
    }
    return null;
  }


  session_onSend_update(list: any) {//Update la session avec les parametre du jeu en cours

    const formData: FormData = new FormData();
    formData.append('session_update', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }

  sendProgress(): void {//Envoie la progression dans la session du jeu en cours

    this.list_session = [];
    this.recupSession(this.list_session);

    setTimeout(() => {
      this.getJoueur()!.progress_jeu[this.getJeuById()].cpt_erreur = this.errors;
      this.getJoueur()!.progress_jeu[this.getJeuById()].progress = (this.nbEntries / this.game!.images.length) * 100
      let list = { nom: this.getSession()!.nom, isSuivi: +this.getSession()!.isSuivi, join: +this.getSession()!.isActive, id: this.getSession()!.id, jeux_id: this.setJeuSession(this.getSession()!.jeuId), liste_j: this.setJoueurs(this.getSession()!) };
      this.session_onSend_update(list)
    }, 500);
  }

  // Réactive tout les boutons
  resetButton() {
    var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; i++) {
      (buttons.item(i) as HTMLButtonElement).style.backgroundColor = this.game!.button_bg_color;
      (buttons.item(i) as HTMLButtonElement).disabled = false;
    }
  }

  //Permet de previsualiser le jeu
  previewAbecedaire(a: Abecedaire): void {
    this.game = a;
    this.abecedaire_previsualiser = true;
  }

  //Quitte la previsualition en cours 
  quitPreviewAbecedaire(): void {
    this.abecedaire_previsualiser = false;
  }

  //delete le jeu Abécédaire de toutes les sessions qui le contient
  deleteAbcdr(id: number, s: Session): void {
    let index = -1;
    for (let g of s.jeuId) {
      if (g.type == 'Abecedaire' && g.id_jeu == id) {
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


  deleteSessionAbecedaire(id: number): void {//Delete le jeu de toutes sessions auquel il appartient
    let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);
    for (let s of this.list_session) {
      for (let jeu of s.jeuId) {
        if (jeu.type == 'Abecedaire' && jeu.id_jeu == id) {
          this.deleteAbcdr(id, s);
          this.list = { nom: s!.nom, isSuivi: +s!.isSuivi, join: +s!.isActive, id: s!.id, jeux_id: this.setJeuSession(s!.jeuId), liste_j: this.setJoueurs(s!) };
          ses.onSend_update(this.list);
        }
      }
    }
  }

  deleteThemeAbcdr(id: number): void {//Delete le jeu Abecedaire du theme
    let theme = new ThemeComponent(this.route, this.jeuxService, this.router);
    let liste: any = [];
    theme.recup2(liste);
    let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);

    setTimeout(() => {
      for (let t of liste) {
        let array = ses.getJeuSession(t.id_jeux);
        let index = -1;
        for (let j of array) {
          if (j.type == 'Abécédaire') {
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

  deleteGameAbecedaire(a: Abecedaire): void {//Supprime le jeu Abecedaire de partout
    this.onSend_delete(a.id)
    this.deleteSessionAbecedaire(a.id);
    this.deleteThemeAbcdr(a.id);
    setTimeout(() => {
      this.data = [];
      this.recup(this.data);

    }, 200)
  }

  redirectEditAbecedaire(a: Abecedaire): void {
    window.location.href = '/panel/Abecedaire/edit/' + a.id;
  }

  setPrevisualiserAbecedaire(prev: boolean): void {//Affiche le jeu dans la prévisualisation
    if (prev == true) {
      this.game = new Abecedaire(0, '', this.selectedImages, this.abecedaire_bg_color, this.abecedaire_text_color, this.abecedaire_good_answer_color, this.abecedaire_wrong_answer_color, this.abecedaire_progress, this.abecedaire_button_bg_color, this.abecedaire_button_text_color, this.abecedaire_isVocaliser, this.abecedaire_type_ecriture, Number(this.id_crea));
      this.abecedaire_previsualiser = true;
    }
    else {
      this.game = null;
      this.abecedaire_previsualiser = false;
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
  previousStep(): void {//Permet d'aller a l'étape précédente dans le formulaire de création et d'édit
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

  addImageSelected(img: Image): void {//ajoute les images choisit dans la liste
    if (this.selectedImages.indexOf(img) == -1) {
      this.selectedImages.push(img);
      this.image.push(img.id);
      this.list['id_image'] = this.image.toString();
    }
  }

  deleteImage(i: Image): void {//Supprime les images de la liste
    let index = this.selectedImages.indexOf(i, 0);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
      this.image.splice(index, 1);
      this.list['id_image'] = this.image.toString();
    }
  }

  changeProgressValue(jeu: string, element: HTMLSelectElement): void {
    //Change la couleur de la progress bar
    switch (element.value) {
      case 'blue':
        this.abecedaire_progress = Progress.Blue;
        this.list['progress'] = 'blue';
        break;
      case 'green':
        this.abecedaire_progress = Progress.Green;
        this.list['progress'] = 'green';
        break;
      case 'lightblue':
        this.abecedaire_progress = Progress.LightBlue;
        this.list['progress'] = 'lightblue';
        break;
      case 'orange':
        this.abecedaire_progress = Progress.Orange;
        this.list['progress'] = 'orange';
        break;
      case 'red':
        this.abecedaire_progress = Progress.Red;
        this.list['progress'] = 'red';
        break;
    }
  }

  create(): void {//Crée le jeu Abecedaire avec les parametres soit par défaut, soit modifier à la création

    this.list = {table:'Abcdr',id_image: this.image.toString(), id: 0, bg_color: this.abecedaire_bg_color, text_color: this.abecedaire_text_color, gaw: this.abecedaire_good_answer_color, waw: this.abecedaire_wrong_answer_color,bu_bg_co: this.abecedaire_button_bg_color,bu_txt_co: this.abecedaire_button_text_color, progress: this.abecedaire_progress,type_ecri: this.abecedaire_type_ecriture,isVoca: +this.abecedaire_isVocaliser, id_crea: Number(this.id_crea) };
    this.onSend(this.list);
    this.router.navigate(['/panel/Abecedaire']);

  }

  save(): void {//Sauvegarde les changement lors d'un edit et fait l'update dans la bd
    this.onSend_update(this.list);
    this.router.navigate(['/panel/Abecedaire']);
  }
}
