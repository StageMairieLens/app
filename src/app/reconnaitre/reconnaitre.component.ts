import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Reconnaitre } from './Reconnaitre'
import { Progress } from '../Progress'
import { Image } from '../Image'
import { MatButton } from '@angular/material/button';
import { JeuxService } from '../jeux.service';
import { SessionsComponent } from '../sessions/sessions.component'
import { ImagesComponent } from '../images/images.component';
import { Router } from '@angular/router';

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
  reponse = ""
  constructor(private jeuxService: JeuxService, private router: Router) {
    this.r = null;
    // this.r = new Reconnaitre(this.images, 'blue', 'white', 'black', 'green', 'red', Progress.Red, 'lightblue', 'white', 'CAPITAL',false);
  }


  onSend(list: any) {
    const formData: FormData = new FormData();
    formData.append('liste', list);
    this.jeuxService.onSendReco(formData).subscribe(res => {
      console.log(res);
      this.reponse = res;
    },
      err => {
        console.log(err, "err");
      }
    )
  }
  ngOnInit(): void {
    if (this.r != null) {
      this.alea(this.r!.images);

    }

    if (this.edit) {
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
      this.reconnaitre_isVocaliser = this.r!.isVocaliser;
    }


  }
  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Reconnaitre | null;
  @Input() showTitle: boolean = true;
  @Input() showList: boolean = false;
  @Input() play: boolean = true;
  @Input() create_game: boolean = false;
  @Input() edit: boolean = false;


  clicked = false; //Le boutton n'est pas désactiver
  //liste_images : String[] = ["../../assets/lion.jpg","../../assets/chat.jpg","../../assets/chien.jpeg","../../assets/souris.jpg"];
  liste_image: Image[] = ImagesComponent.list_image;
  selectedImages: Image[] = [];
  erreur_image: Erreur[] = [];
  //liste_images = [];
  prochaine_image = 0;
  taille_to = 0;
  //Variable qui contient l'image a trouver
  //liste_mot: string[] = []; //Liste qui contient les noms des images
  liste_mot_boutton: string[] = [];
  compteur = 0; //Compte le nombre d'erreur
  compteur_image = 0; //Compte erreur par image
  //variable: string = this.r!.images[this.prochaine_image].nom;
  progressValue: Progress[] = [
    Progress.Blue,
    Progress.Green,
    Progress.LightBlue,
    Progress.Orange,
    Progress.Red
  ];

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
  reconnaitre_list: Reconnaitre[] = SessionsComponent.reconnaitre_list;

  formStep: number = 0;


  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
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
  alea2(li: string[]): void {
    for (var taile = 0; this.r!.images[taile]; taile++) {
      li.push(this.r!.images[taile].nom);
    }
    var m = this.taille_to, t, i, t2;

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

  change($event: any, varia: string): Boolean {
    //this.variable=this.liste_images[this.prochaine_image];
    if (varia == this.r!.images[this.prochaine_image].nom) { //Si reponse trouver alert un message et bloque tous les bouttons
      this.clicked = false;
      document.getElementById('result')!.innerHTML = '<p style="color : green">C\'est le bon mot</p>';
      this.erreur_image.push({ src: this.r!.images[this.prochaine_image].src, erreur: this.compteur_image });


      this.compteur_image = 0;
      console.log(this.erreur_image);

      setTimeout(() => {
        //this.variable = this.r!.images[this.prochaine_image].nom;
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


        //($event.target as HTMLButtonElement).disabled = false;
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



  previewReconnaitre(r: Reconnaitre): void {
    this.r = r;
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

  setPrevisualiserReconnaitre(prev: boolean): void {
    if (prev == true) {
      this.r = new Reconnaitre(this.selectedImages, this.reconnaitre_bg_color, this.reconnaitre_title_color, this.reconnaitre_text_color, this.reconnaitre_good_answer_color, this.reconnaitre_wrong_answer_color, this.reconnaitre_progress, this.reconnaitre_button_bg_color, this.reconnaitre_button_text_color, this.reconnaitre_type_ecriture, this.reconnaitre_isVocaliser);
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
  }

  parseDate(date: Date): string {
    let month: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let index: number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  }
  redirectEditReconnaitre(r: Reconnaitre): void {
    window.location.href = '/panel/Reconnaitre/edit/' + r.id;
  }

  create(): void {
    this.reconnaitre_list.push(
      new Reconnaitre(this.selectedImages, this.reconnaitre_bg_color, this.reconnaitre_title_color, this.reconnaitre_text_color, this.reconnaitre_good_answer_color, this.reconnaitre_wrong_answer_color, this.reconnaitre_progress, this.reconnaitre_button_bg_color, this.reconnaitre_button_text_color, this.reconnaitre_type_ecriture, this.reconnaitre_isVocaliser)
    );
    this.router.navigate(['/panel/Reconnaitre']);
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

  save(): void {
    this.r!.images = this.selectedImages;
    this.r!.bg_color = this.reconnaitre_bg_color;
    this.r!.title_color = this.reconnaitre_title_color;
    this.r!.text_color = this.reconnaitre_text_color;
    this.r!.good_answer_color = this.reconnaitre_good_answer_color;
    this.r!.wrong_answer_color = this.reconnaitre_wrong_answer_color;
    this.r!.button_bg_color = this.reconnaitre_button_bg_color;
    this.r!.button_text_color = this.reconnaitre_button_text_color;
    this.r!.color_progress_bar = this.reconnaitre_progress;
    this.r!.typeEcriture = this.reconnaitre_type_ecriture;
    this.r!.isVocaliser = this.reconnaitre_isVocaliser;
    this.router.navigate(['/panel/Reconnaitre']);
  }

}
