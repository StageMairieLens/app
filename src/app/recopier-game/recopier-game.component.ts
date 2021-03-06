import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../Image'
import { Recopier } from './Recopier'
import { Progress } from '../Progress'
import { ActivatedRoute, Router } from '@angular/router';
import { Guest, Jeu, Progression, SessionsComponent } from '../sessions/sessions.component';
import { JeuxService } from '../jeux.service';
import { Session } from '../sessions/Session';
import { Login } from '../index/login/Login';
import { LoginComponent } from '../index/login/login.component';
import { ThemeComponent } from '../theme/theme.component';


@Component({
  selector: 'app-recopier-game',
  templateUrl: './recopier-game.component.html',
  styleUrls: ['./recopier-game.component.css']
})
export class RecopierGameComponent implements OnInit {
  data: Recopier[] = [];
  list_session: Session[] = [];
  list_login: Login[] = [];
  login: string = localStorage.getItem('id_pseudo')!;
  constructor(private route: ActivatedRoute, private jeuxService: JeuxService, private router: Router) {
    this.r = null;
  }

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
  recup(tab: any) {//Récupere les jeux crée par l'utilisateur
    this.jeuxService.recup_recopier(tab).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {

          tab.push(
            new Recopier(data[i].id_recopier, data[i].date_recopier, this.getImage(data[i].id_image), data[i].bg_color, data[i].text_color, data[i].title_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_co, data[i].bu_txt_co, data[i].i_bg_co, data[i].i_text_co, data[i].type_ecri, data[i].isVoca, data[i].id_crea)
          );
        }
      }
    })
  }
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
          new Session(data[i].Id, data[i].nom, data[i].date, this.getJeuSession(data[i].Jeux_id), isJ, this.getJoueurs(data[i].liste_j, data[i].Id), isS, +data[i].Id_createur)
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

  reponse: any;
  onSend(list: any) {//Ajoute le jeu dans la bdd

    const formData: FormData = new FormData();
    formData.append('send', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        this.reponse = res;
      },
    });
  }

  getImage(s: string): Image[] {//Recupere les images et les ajoutes dans un tableau
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

  recupImage(donne: any) {//Récupere les images
    this.jeuxService.recup_image_id(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          donne.push(new Image(data[i].nom, data[i].id_image, data[i].id_crea));
        }
      }
    })
  }

  liste_image: Image[] = []
  selectedImages: Image[] = [];
  image: Image[] = [];
  showImageCpt: number = 0;
  typeEcriture: string = "CAPITAL"; // default
  waitToSend: boolean = false;
  @Input() r: Recopier | null;
  id_game: number | null = null;
  @Input() showTitle: boolean = true;
  @Input() play: boolean = true;
  @Input() showList: boolean = false;
  @Input() create_game: boolean = false;
  @Input() edit: boolean = false;

  cpt_erreur: number = 0;

  // VARIABLE JEU RECOPIER
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
  image2: any = [];
  id_crea = localStorage.getItem('id_crea');
  list: any = { table: 'Recopier', id_crea: this.id_crea, id_image: this.image2.toString(), id: this.id_game, i_bg_co: this.recopier_input_bg_color, i_text_co: this.recopier_input_text_color, bg_color: this.recopier_bg_color, text_color: this.recopier_text_color, title_color: this.recopier_title_color, gaw: this.recopier_good_answer_color, waw: this.recopier_wrong_answer_color, bu_bg_co: this.recopier_button_bg_color, bu_txt_co: this.recopier_button_text_color, progress: 'blue', type_ecri: this.recopier_type_ecriture, isVoca: 0 };

  formStep: number = 0;

  static firstFinish: number = 0;

  synthesis: SpeechSynthesis | null = window.speechSynthesis;;
  voice: SpeechSynthesisVoice | null = this.synthesis!.getVoices().filter(function (voice) {
    return voice.lang === 'fr';
  })[0];;

  progressValue: Progress[] = [
    Progress.Blue,
    Progress.Green,
    Progress.LightBlue,
    Progress.Orange,
    Progress.Red
  ];

  enterKey($event: KeyboardEvent): void {
    if ($event.key == 'Enter') {
      this.sendAnswer((<HTMLInputElement>$event.target).value, this.r!.images[this.showImageCpt]);
    }
  }
  onSend_delete(id: any) {//Supprime le jeu
    const formData: FormData = new FormData();
    var list={table:'Recopier',id:id,id_table:'id_recopier'};//Ajoute le nom de la table,le nom de l'id de la table et le numero de l'id
    formData.append('delete', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }
  onSend_update(list: any) {//Update les données
    const formData: FormData = new FormData();
    list['id_table']='id_recopier';//Ajoute le nom de l'id de la table
    formData.append('update', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        this.reponse = res;
      },
    });
  }
  ngOnInit(): void {
    this.recupImage(this.liste_image)
    setTimeout(() => {
      this.recup(this.data);
      this.recupSession(this.list_session);
      this.recupLogin(this.list_login);
    }, 200)

    setTimeout(() => {
      if (this.edit) {
        this.create_game = true;
        this.selectedImages = this.r!.images;
        this.recopier_bg_color = this.r!.bg_color;
        this.recopier_text_color = this.r!.text_color;
        this.recopier_title_color = this.r!.title_color;
        this.recopier_good_answer_color = this.r!.good_answer_color;
        this.recopier_wrong_answer_color = this.r!.wrong_answer_color;
        this.recopier_button_bg_color = this.r!.button_bg_color;
        this.recopier_button_text_color = this.r!.button_text_color;
        this.recopier_input_bg_color = this.r!.input_bg_color;
        this.recopier_input_text_color = this.r!.input_text_color;
        this.recopier_progress = this.r!.color_progress_bar;
        this.recopier_type_ecriture = this.r!.typeEcriture;
        if (+this.r!.isVocaliser == 1) {
          this.recopier_isVocaliser = true;
        } else {
          this.recopier_isVocaliser = false;
        }
        for (let i of this.selectedImages) {
          this.image2.push(i.id);
        }
        this.list = { table: 'Recopier', id_image: this.image2.toString(), id: this.r!.id, i_bg_co: this.recopier_input_bg_color, i_text_co: this.recopier_input_text_color, bg_color: this.recopier_bg_color, text_color: this.recopier_text_color, title_color: this.recopier_title_color, gaw: this.recopier_good_answer_color, waw: this.recopier_wrong_answer_color, bu_bg_co: this.recopier_button_bg_color, bu_txt_co: this.recopier_button_text_color, progress: 'blue', type_ecri: this.recopier_type_ecriture, isVoca: +this.recopier_isVocaliser };
      }
    }, 500)
  }

  vocalise(): void {
    this.synthesis!.cancel();
    var utterance = new SpeechSynthesisUtterance(this.r!.images[this.showImageCpt].getNom());
    utterance.voice = this.voice;
    utterance.pitch = 1;
    utterance.rate = 0.7;
    this.synthesis!.speak(utterance);
  }

  changeTypeEcritureToCapital(): void {
    if (this.typeEcriture != 'CAPITAL') {
      this.typeEcriture == 'CAPITAL';
    }
  }
  changeTypeEcritureToCursif(): void {
    if (this.typeEcriture != 'CURSIF') {
      this.typeEcriture == 'CURSIF';
    }
  }
  changeTypeEcritureToScript(): void {
    if (this.typeEcriture != 'SCRIPT') {
      this.typeEcriture == 'SCRIPT';
    }
  }

  // Teste si la réponse est le bonne ou pas
  sendAnswer(text: string, img: Image): void {
    if (!this.waitToSend) {
      this.waitToSend = true;
      if (this.r!.typeEcriture == 'CAPITAL') {
        if (text.toUpperCase() === img.getNom().toUpperCase()) {
          document.getElementById('result')!.innerHTML = '<p style="color :' + this.r!.good_answer_color + '">C\'est le bon mot</p>';

          setTimeout(() => {
            document.getElementById('card')!.animate([{ opacity: 1 },
            { opacity: 0.1, offset: 0.7 },
            { opacity: 1 }],
              800);
          }, 1000);

          setTimeout(() => {
            this.showImageCpt++;
            this.sendProgress();
            document.getElementById('result')!.innerHTML = '';
            (<HTMLInputElement>document.getElementById('input_recopier')).value = '';
            document.getElementById('progressbar')!.style.width = ((this.showImageCpt / this.r!.images.length) * 100).toString() + '%';
            this.waitToSend = false;
          },
            1600);

        } else {
          this.cpt_erreur++;
          this.sendProgress();

          document.getElementById('result')!.innerHTML = '<p style="color :' + this.r!.wrong_answer_color + '">Ce n\'est pas le bon mot</p>';
          document.getElementById('card')?.animate([
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-50px)' },
            { transform: 'translateX(50px)' }
          ], { duration: 200 }
          );
          this.waitToSend = false;

        }
      } else {
        if (text === img.getNom()) {
          document.getElementById('result')!.innerHTML = '<p style="color :' + this.r!.good_answer_color + '">C\'est le bon mot</p>';

          setTimeout(() => {
            document.getElementById('card')!.animate([{ opacity: 1 },
            { opacity: 0.1, offset: 0.7 },
            { opacity: 1 }],
              800);
          }, 1000);

          setTimeout(() => {
            this.showImageCpt++;
            this.sendProgress();
            document.getElementById('result')!.innerHTML = '';
            (<HTMLInputElement>document.getElementById('input_recopier')).value = '';
            document.getElementById('progressbar')!.style.width = ((this.showImageCpt / this.r!.images.length) * 100).toString() + '%';
            this.waitToSend = false;

          },
            1600);
        } else {
          this.cpt_erreur++;
          this.sendProgress();

          document.getElementById('result')!.innerHTML = '<p style="color :' + this.r!.wrong_answer_color + '">Ce n\'est pas le bon mot</p>';
          document.getElementById('card')?.animate([
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-50px)' },
            { transform: 'translateX(50px)' }
          ], { duration: 200 }
          );
          this.waitToSend = false;
        }
      }
    }
  }

  //Récupere la session du jeu
  getSession(): Session | null {
    for (let s of this.list_session) {
      for (let j of s.jeuId) {
        if (j.type == 'Recopier') {
          if (j.id_jeu == this.r!.id) {
            return s;
          }
        }
      }
    }
    return null
  }

  getJeuById(): number {//Récupère le jeu de la session par son id
    for (let i = 0; i < this.getSession()!.jeuId.length; i++) {
      if (this.getSession()!.jeuId[i].type == 'Recopier') {
        if (this.getSession()!.jeuId[i].id_jeu == this.r!.id) {
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
      this.getJoueur()!.progress_jeu[this.getJeuById()].cpt_erreur = this.cpt_erreur;
      this.getJoueur()!.progress_jeu[this.getJeuById()].progress = (this.showImageCpt / this.r!.images.length) * 100;
      let list = { nom: this.getSession()!.nom, isSuivi: +this.getSession()!.isSuivi, join: +this.getSession()!.isActive, id: this.getSession()!.id, jeux_id: this.setJeuSession(this.getSession()!.jeuId), liste_j: this.setJoueurs(this.getSession()!) };
      this.session_onSend_update(list)
    }, 500);
  }

  // Teste si le jeu est fini
  isFinish(): boolean {
    if (this.showImageCpt == this.r!.images.length && this.r!.images.length != 0) {
      if (RecopierGameComponent.firstFinish == 0) {
        this.sendProgress();
        RecopierGameComponent.firstFinish = 1;
      }
      return true;
    }
    return false;
  }

  setPrevisualiserRecopier(prev: boolean): void {//Affiche le jeu dans la prévisualisation
    if (prev == true) {
      this.r = new Recopier(0, '', this.selectedImages, this.recopier_bg_color, this.recopier_title_color, this.recopier_text_color, this.recopier_good_answer_color, this.recopier_wrong_answer_color, this.recopier_progress, this.recopier_button_bg_color, this.recopier_button_text_color, this.recopier_input_bg_color, this.recopier_input_text_color, this.recopier_type_ecriture, this.recopier_isVocaliser, Number(this.id_crea));
      this.recopier_previsualiser = true;
    }
    else {
      this.recopier_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
        this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      }, 0);
    }
  }

  //Permet de previsualiser le jeu
  previewRecopier(r: Recopier): void {
    this.r = r;
    this.recopier_previsualiser = true;
  }

  //Quitte la previsualition en cours 
  quitPreviewRecopier(): void {
    this.recopier_previsualiser = false;
  }

  //delete le jeu Recopier de toutes les sessions qui le contient
  deleteRecopier(id: number, s: Session): void {
    let index = -1;
    for (let g of s.jeuId) {
      if (g.type == 'Recopier' && g.id_jeu == id) {
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


  deleteSessionRecopier(id: number): void {//Delete le jeu de toutes sessions auquel il appartient
    let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);
    for (let s of this.list_session) {
      for (let jeu of s.jeuId) {
        if (jeu.type == 'Recopier' && jeu.id_jeu == id) {
          this.deleteRecopier(id, s);
          this.list = { nom: s!.nom, isSuivi: +s!.isSuivi, join: +s!.isActive, id: s!.id, jeux_id: this.setJeuSession(s!.jeuId), liste_j: this.setJoueurs(s!) };
          ses.onSend_update(this.list);
        }
      }
    }
  }


  deleteThemeRecopier(id: number): void {//Delete le jeu Recopier du theme
    let theme = new ThemeComponent(this.route, this.jeuxService, this.router);
    let liste: any = [];
    theme.recup2(liste);
    let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);

    setTimeout(() => {
      for (let t of liste) {
        let array = ses.getJeuSession(t.id_jeux);
        let index = -1;
        for (let j of array) {
          if (j.type == 'Recopier') {
            if (j.id_jeu == id) {
              index = array.indexOf(j);
            }
          }
        }

        if (index > -1) {
          array.splice(index, 1);
          t.id_jeux = ses.setJeuSession(array);
          theme.onSend_update({ id_theme: t.id, id: t.id_image, id_jeux: t.id_jeux, nom: t.nom });
        }
      }
    }, 200)
  }
  deleteGameRecopier(r: Recopier): void {//Supprime le jeu Recopier de partout
    this.onSend_delete(r.id);
    this.deleteSessionRecopier(r.id);
    this.deleteThemeRecopier(r.id);
    setTimeout(() => {
      this.data = [];
      this.recup(this.data);
    }, 400)
  }

  redirectEditRecopier(r: Recopier): void {
    window.location.href = '/panel/Recopier/edit/' + r.id;
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

  setActive(element: Element | null): void {// Donne Du style
    (<HTMLButtonElement>element!).style.background = 'white';
    (<HTMLButtonElement>element!).style.color = 'black';
  }

  setInactive(element: Element | null) {//Enleve  Du style
    (<HTMLButtonElement>element!).style.background = '';
    (<HTMLButtonElement>element!).style.color = 'white';
  }

  setFormStep(step: number): void {
    this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
    this.formStep = step;
    this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(step)!.children.item(0));

  }

  changeProgressValue(jeu: string, element: HTMLSelectElement): void {//Change la couleur de la progress bar
    switch (element.value) {
      case 'blue':
        this.recopier_progress = Progress.Blue;
        this.list['progress'] = 'blue'
        break;
      case 'green':
        this.recopier_progress = Progress.Green;
        this.list['progress'] = 'green';
        break;
      case 'lightblue':
        this.recopier_progress = Progress.LightBlue;
        this.list['progress'] = 'lightblue';
        break;
      case 'orange':
        this.recopier_progress = Progress.Orange;
        this.list['progress'] = 'orange';
        break;
      case 'red':
        this.recopier_progress = Progress.Red;
        this.list['progress'] = 'red';
        break;
    }
  }

  addImage(img: Image): void {//ajoute les images choisit dans la liste
    if (this.selectedImages.indexOf(img) == -1) {
      this.selectedImages.push(img);
      this.image2.push(img.id);
      this.list['id_image'] = this.image2.toString();
    }
  }

  deleteImage(i: Image): void {//Supprime les images de la liste
    let index = this.selectedImages.indexOf(i, 0);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
      this.image2.splice(index, 1);
      this.list['id_image'] = this.image2.toString();
    }
  }

  create(): void {//Crée le jeu Recopier avec les parametres soit par défaut, soit modifier à la création
    this.list = { table: 'Recopier', id_image: this.image2.toString(), id: 0, i_bg_co: this.recopier_input_bg_color, i_text_co: this.recopier_input_text_color, bg_color: this.recopier_bg_color, text_color: this.recopier_text_color, title_color: this.recopier_title_color, gaw: this.recopier_good_answer_color, waw: this.recopier_wrong_answer_color, bu_bg_co: this.recopier_button_bg_color, bu_txt_co: this.recopier_button_text_color, progress: this.recopier_progress, type_ecri: this.recopier_type_ecriture, isVoca: +this.recopier_isVocaliser, id_crea: Number(this.id_crea) };
    this.onSend(this.list);
    this.router.navigate(['/panel/Recopier']);
  }

  save(): void {//Sauvegarde les changement lors d'un edit et fait l'update dans la bd

    this.onSend_update(this.list);
    this.router.navigate(['/panel/Recopier']);
  }
}
