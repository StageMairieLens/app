import { Component, OnInit, Input } from '@angular/core';
import { Reconnaitre } from './Reconnaitre'
import { Progress } from '../Progress'
import { Image } from '../Image'
import { JeuxService } from '../jeux.service';
import { Guest, Jeu, Progression, SessionsComponent } from '../sessions/sessions.component'
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../index/login/Login';
import { LoginComponent } from '../index/login/login.component';
import { Session } from '../sessions/Session';
import { ThemeComponent } from '../theme/theme.component';

interface Erreur {
  src: string;
  erreur: number;
}

@Component({
  selector: 'app-reconnaitre',
  templateUrl: './reconnaitre.component.html',
  styleUrls: ['./reconnaitre.component.css']
})
export class ReconnaitreComponent implements OnInit {
  id_crea = localStorage.getItem('id_crea');//L'id de la personne connecter
  static firstFinish: number = 0;
  cpt_erreur: number = 0;//nombre d'erreur
  constructor(private route: ActivatedRoute, private jeuxService: JeuxService, private router: Router) {
    this.r = null;
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

  
  data: Reconnaitre[] = [];
  login: string = localStorage.getItem('id_pseudo')!;

  recup(donne: any) {//Récupere tout les jeux Reconnaitre crée par la personne connecter
    this.jeuxService.recup_reconnaitre(donne).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {

          donne.push(
            new Reconnaitre(data[i].id_reco, data[i].date_reco, this.getImage(data[i].id_images), data[i].bg_color, data[i].title_color, data[i].text_color, data[i].gaw, data[i].waw, data[i].progress, data[i].bu_bg_co, data[i].bu_txt_co, data[i].type_ecri, data[i].isVoca, Number(this.id_crea))
          );
        }
      }
    })
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
          new Session(data[i].Id, data[i].nom, data[i].date, this.getJeuSession(data[i].Jeux_id), isJ, this.getJoueurs(data[i].liste_j, data[i].Id), isS, +data[i].Id_createur)
        );
      }
    })

  }


  getJeuSession(s: string): Jeu[] {//Récupere la session et lui rajoute le jeu
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

  getJoueurs(s: string, id_session: number): Guest[] {
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

  getImage(s: string): Image[] {//Recupere les images et les ajoutes dans une liste
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

  onSend(list: any) {//Envoi les données du jeu dans la bdd

    const formData: FormData = new FormData();
    formData.append('send', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }

  onSend_delete(id: any) {//Suprimme un jeu de la bdd

    const formData: FormData = new FormData();
    var list={table:'Reconnaitre',id:id,id_table:'id_reco'};//Permet de reconnaitre la table, le nom de l'id et le numero de l'id
    formData.append('delete', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }
  onSend_update(list: any) {//Update le jeu dans la bdd

    const formData: FormData = new FormData();
    list['id_table']='id_reco';//Permet de reconnaitre la table
    formData.append('update', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }

  recupImage(donne: any) {//Récupere les images depuis la bdd
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        donne.push(new Image(data[i].nom, data[i].id_image, data[i].id_crea));
      }
    })
  }

  ngOnInit(): void {
    this.recupImage(this.liste_image)
    setTimeout(() => {
      this.recup(this.data);
      this.recupLogin(this.list_login);
      this.recupSession(this.list_session);
    }, 200)

    this.r!.liste_button = [];

    if (this.r != null) {
      this.alea(this.r!.images);
      this.alea2(this.r!.liste_button)

    }


    if (this.edit) {//Permet d'editer un jeu, récupere les données du jeu this.r!.(nom d'une variable du jeu) de Reconnaitre.ts et les affiches
      this.create_game = true
      this.selectedImages = this.r!.images;
      this.reconnaitre_bg_color = this.r!.bg_color;
      this.reconnaitre_title_color = this.r!.title_color;
      this.reconnaitre_text_color = this.r!.text_color;
      this.reconnaitre_good_answer_color = this.r!.good_answer_color;
      this.reconnaitre_wrong_answer_color = this.r!.wrong_answer_color;
      this.reconnaitre_button_bg_color = this.r!.button_bg_color;
      this.reconnaitre_button_text_color = this.r!.button_text_color;
      this.reconnaitre_progress = this.r!.color_progress_bar;
      this.reconnaitre_type_ecriture = this.r!.typeEcriture;
      if (+this.r!.isVocaliser == 1) {
        this.reconnaitre_isVocaliser = true;
      } else {
        this.reconnaitre_isVocaliser = false;
      }

      for (let i of this.selectedImages) {
        this.image.push(i.id);
        
      }

      this.list = //Recupere les données dans une liste pour l'update
      {
        table: 'Reconnaitre', type_ecri: this.reconnaitre_type_ecriture, isVoca: +this.reconnaitre_isVocaliser,
        id_images: this.image.toString(),
        bg_color: this.reconnaitre_bg_color,
        title_color: this.reconnaitre_title_color, gaw: this.reconnaitre_good_answer_color,
        waw: this.reconnaitre_wrong_answer_color,
        progress: 'blue',
        bu_bg_co: this.reconnaitre_button_bg_color,
        bu_txt_co: this.reconnaitre_button_text_color,
        text_color: this.reconnaitre_text_color
        , id_crea: this.id_crea, id: this.r!.id,
      };
    }
  }
  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Reconnaitre | null;
  @Input() showTitle: boolean = true;//affiche le titre du jeu
  @Input() showList: boolean = false;
  @Input() play: boolean = true;//Lance le jeu
  @Input() create_game: boolean = false;//Crée le jeu si true
  @Input() edit: boolean = false;//Va dans l'edit si true


  clicked = false; //Le boutton n'est pas désactiver
  
  liste_image: Image[] = [];
  selectedImages: Image[] = [];
  erreur_image: Erreur[] = [];
  
  prochaine_image = 0;
  taille_to = 0;
  //Variable qui contient l'image a trouver
  
  liste_mot_boutton: string[] = [];
  compteur = 0; //Compte le nombre d'erreur
  compteur_image = 0; //Compte erreur par image
  
  progressValue: Progress[] = [
    Progress.Blue,
    Progress.Green,
    Progress.LightBlue,
    Progress.Orange,
    Progress.Red
  ];
  //Permet de mettre le son 
  synthesis: SpeechSynthesis | null = window.speechSynthesis;
  voice: SpeechSynthesisVoice | null = this.synthesis!.getVoices().filter(function (voice) {
    return voice.lang === 'fr';
  })[0];;
  //Valeur par défault du jeu
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

  image: any = [];
  //Valeur par défaut ajouter dans la liste pour les envoyé dans la bdd
  list: any = {
    table: 'Reconnaitre', type_ecri: this.reconnaitre_type_ecriture, isVoca: 0,
    id_images: this.image.toString(),
    bg_color: this.reconnaitre_bg_color,
    title_color: this.reconnaitre_title_color, gaw: this.reconnaitre_good_answer_color,
    waw: this.reconnaitre_wrong_answer_color,
    progress: 'blue',
    bu_bg_co: this.reconnaitre_button_bg_color,
    bu_txt_co: this.reconnaitre_button_text_color,
    text_color: this.reconnaitre_text_color
    , id_crea: this.id_crea
  };

  formStep: number = 0;

  alea(li: Image[]): void {

    var m = li.length, name, src, i;

    // While there remain elements to shuffle
    while (this.taille_to) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      name = li[m].nom;
      src = li[m].src;
      li[m].nom = li[i].nom;
      li[m].src = li[i].src;
      li[i].nom = name;
      li[i].src = src;
    }
  }
  //rend aléatoire l'affichage des bouttons
  alea2(li: string[]): void {
    for (var taile = 0; this.r!.images[taile]; taile++) {
      li.push(this.r!.images[taile].nom);
    }
    var m = this.r!.images.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = li[m];
      li[m] = li[i];
      li[i] = t;
    }
  }
  //Foncion qui lance le jeu,qui gere tout le jeu
  change($event: any, varia: string): Boolean {
    if (varia == this.r!.images[this.prochaine_image].nom) { //Si reponse trouver alert un message et bloque tous les bouttons
      this.clicked = false;
      document.getElementById('result')!.innerHTML = '<p style="color : green">C\'est le bon mot</p>';
      this.erreur_image.push({ src: this.r!.images[this.prochaine_image].src, erreur: this.compteur_image });
      this.sendProgress();

      this.compteur_image = 0;

      setTimeout(() => {
        document.getElementById('container')!.animate([{ opacity: 1 },
        { opacity: 0.1, offset: 0.7 },
        { opacity: 1 }],

          800);
      }, 1000);
      setTimeout(() => {
        this.prochaine_image += 1;

      }, 1600);
      setTimeout(() => {
        document.getElementById('result')!.innerHTML = '';
        document.getElementById('progressbar')!.style.width = ((this.prochaine_image / this.r!.images.length) * 100).toString() + '%';
        this.sendProgress();

      },
        1600);
      if (this.prochaine_image < this.r!.images.length) {
        setTimeout(() => {
          for (var i = 0; i < this.r!.liste_button.length; i++) {
            document.getElementById(this.r!.images[i].nom)!.classList.remove("disabled")
            document.getElementById(this.r!.images[i].nom)!.style.backgroundColor = this.r!.button_bg_color;
            document.getElementById(this.r!.images[i].nom)!.style.border = '';
            document.getElementById(this.r!.images[i].nom)!.style.color = this.r!.button_text_color;
          }
        }, 1600);


      }
      else {
        this.clicked = true;
      }
      return true;
    }
    else { //Transforme le boutton et le désactive et incrémente le nombre d'erreurs
      if (!document.getElementById(varia)!.classList.contains('disabled')) {
        document.getElementById(varia)!.style.backgroundColor = "red";
        document.getElementById(varia)!.style.border = '1px solid #999999';
        document.getElementById(varia)!.style.color = '#999999';
        document.getElementById(varia)!.classList.add('disabled');
        this.compteur += 1;
        this.compteur_image += 1;
        this.cpt_erreur++;
        this.sendProgress();

        document.getElementById('result')!.innerHTML = '<p style="color : red">Ce n\'est pas le bon mot</p>';

        document.getElementById('container')?.animate([
          { transform: 'translateX(0px)' },
          { transform: 'translateX(-50px)' },
          { transform: 'translateX(50px)' }
        ], { duration: 200 }
        );
      }
      return false;
    }
  }
  //Récupere la session
  getSession(): Session | null {
    for (let s of this.list_session) {
      for (let j of s.jeuId) {
        if (j.type == 'Reconnaitre') {
          if (j.id_jeu == this.r!.id) {
            return s;
          }
        }
      }
    }
    return null
  }

  getJeuById(): number {
    for (let i = 0; i < this.getSession()!.jeuId.length; i++) {
      if (this.getSession()!.jeuId[i].type == 'Reconnaitre') {
        if (this.getSession()!.jeuId[i].id_jeu == this.r!.id) {
          return i;
        }
      }
    }
    return -1;
  }

  getJoueur(): Guest | null {
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
      this.getJoueur()!.progress_jeu[this.getJeuById()].progress = (this.prochaine_image / this.r!.images.length) * 100
      let list = { nom: this.getSession()!.nom, isSuivi: +this.getSession()!.isSuivi, join: +this.getSession()!.isActive, id: this.getSession()!.id, jeux_id: this.setJeuSession(this.getSession()!.jeuId), liste_j: this.setJoueurs(this.getSession()!) };
      this.session_onSend_update(list)
    }, 500);
  }

  isFinish(): boolean {//Si le jeu est fini
    if (this.prochaine_image == this.r!.images.length) {
      if (ReconnaitreComponent.firstFinish == 0) {
        this.sendProgress();
        ReconnaitreComponent.firstFinish = 1;
      }
      return true;
    }
    return false;
  }
  //Permet de previsualiser le jeu
  previewReconnaitre(r: Reconnaitre): void {
    this.r = r;
    this.reconnaitre_previsualiser = true;
  }
  //Quitte la previsualition en cours 
  quitPreviewReconnaitre(): void {
    this.reconnaitre_previsualiser = false;
  }
  //delete le jeu Reconnaitre de toutes les sessions qui le contient
  deleteReconnaitre(id: number, s: Session): void {
    let index = -1;
    for (let g of s.jeuId) {
      if (g.type == 'Reconnaitre' && g.id_jeu == id) {
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
      res += g.type + ',' + g.id_jeu + ';'
    }
    return res;
  }

  deleteSessionReconnaitre(id: number): void {
    let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);
    for (let s of this.list_session) {
      for (let jeu of s.jeuId) {
        if (jeu.type == 'Reconnaitre' && jeu.id_jeu == id) {
          this.deleteReconnaitre(id, s);
          this.list = { nom: s!.nom, isSuivi: +s!.isSuivi, join: +s!.isActive, id: s!.id, jeux_id: this.setJeuSession(s!.jeuId), liste_j: this.setJoueurs(s!) };
          ses.onSend_update(this.list);
        }
      }
    }
  }

  deleteThemeReconnaitre(id: number): void {//Delete le jeu reconnaitre du theme
    let theme = new ThemeComponent(this.route, this.jeuxService, this.router);
    let liste: any = [];
    theme.recup2(liste);
    let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);

    setTimeout(() => {
      for (let t of liste) {
        let array = ses.getJeuSession(t.id_jeux);
        let index = -1;
        for (let j of array) {
          if (j.type == 'Reconnaitre') {
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

  deleteGameReconnaitre(r: Reconnaitre): void {//Supprime le jeu reconnaitre de partout
    this.onSend_delete(r.id);
    this.deleteSessionReconnaitre(r.id);
    this.deleteThemeReconnaitre(r.id);
    setTimeout(() => {
      this.data = [];
      this.recup(this.data);
    }, 400)
  }

  setPrevisualiserReconnaitre(prev: boolean): void {
    if (prev == true) {
      this.r = new Reconnaitre(0, '', this.selectedImages, this.reconnaitre_bg_color, this.reconnaitre_title_color, this.reconnaitre_text_color, this.reconnaitre_good_answer_color, this.reconnaitre_wrong_answer_color, this.reconnaitre_progress, this.reconnaitre_button_bg_color, this.reconnaitre_button_text_color, this.reconnaitre_type_ecriture, this.reconnaitre_isVocaliser, Number(this.id_crea));
      this.reconnaitre_previsualiser = true;
    }
    else {
      this.reconnaitre_previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
        this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      }, 0);
    }
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
        this.reconnaitre_progress = Progress.Blue;
        this.list['progress'] = 'blue';
        break;
      case 'green':
        this.reconnaitre_progress = Progress.Green;
        this.list['progress'] = 'green';
        break;
      case 'lightblue':
        this.reconnaitre_progress = Progress.LightBlue;
        this.list['progress'] = 'lightblue';
        break;
      case 'orange':
        this.reconnaitre_progress = Progress.Orange;
        this.list['progress'] = 'orange';
        break;
      case 'red':
        this.reconnaitre_progress = Progress.Red;
        this.list['progress'] = 'red';
        break;
    }
  }

  redirectEditReconnaitre(r: Reconnaitre): void {
    window.location.href = '/panel/Reconnaitre/edit/' + r.id;
  }

  create(): void {//Crée le jeu reconnaitre avec les parametres soit par défaut, soit modifier à la création
    this.list = {
      table: 'Reconnaitre', type_ecri: this.reconnaitre_type_ecriture, isVoca: +this.reconnaitre_isVocaliser,
      id_images: this.image.toString(),
      bg_color: this.reconnaitre_bg_color,
      title_color: this.reconnaitre_title_color, gaw: this.reconnaitre_good_answer_color,
      waw: this.reconnaitre_wrong_answer_color,
      progress: 'blue',
      bu_bg_co: this.reconnaitre_button_bg_color,
      bu_txt_co: this.reconnaitre_button_text_color,
      text_color: this.reconnaitre_text_color
      , id_crea: this.id_crea
    };
    this.onSend(this.list);
    this.router.navigate(['/panel/Reconnaitre']);
  }

  addImage(img: Image): void {//ajoute les images choisit dans la liste
    if (this.selectedImages.indexOf(img) == -1) {
      this.selectedImages.push(img);
      this.image.push(img.id);
      this.list['id_images'] = this.image.toString();
    }
  }

  deleteImage(i: Image): void {//Supprime les images de la liste
    let index = this.selectedImages.indexOf(i, 0);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
      this.image.splice(index, 1);
      this.list['id_images'] = this.image.toString();
    }
  }

  vocalise(): void {//Lance la vocalisation
    this.synthesis!.cancel();
    var utterance = new SpeechSynthesisUtterance(this.r!.images[this.prochaine_image].getNom());
    utterance.voice = this.voice;
    utterance.pitch = 1;
    utterance.rate = 0.7;
    this.synthesis!.speak(utterance);
  }

  save(): void {//Sauvegarde les changement lors d'un edit
    this.list['id'] = this.r!.id;
    this.onSend_update(this.list);
    this.router.navigate(['/panel/Reconnaitre']);
  }
}
