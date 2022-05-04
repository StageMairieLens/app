import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { SessionsComponent } from '../sessions/sessions.component';
import { BoyGirl } from './BoygGirl'
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { JeuxService } from '../jeux.service';

@Component({
  selector: 'app-boy-girl-game',
  templateUrl: './boy-girl-game.component.html',
  styleUrls: ['./boy-girl-game.component.css']
})
export class BoyGirlGameComponent implements OnInit {

  constructor(private jeuxService: JeuxService,private router: Router) {
    this.bg = null;
    // this.bg = new BoyGirl(this.girl, this.boy, '#3bb8c9', 'pink', 'blue', 'orange', 'brown', 'lightblue', 'red', 'black', 'black', 'black', 'black', 'white', 'black', 'SCRIPT');
  }
  reponse = "";
  onSend(list:any){

    const formData : FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('bg',JSON.stringify(list));
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next:res=>{
        console.log(res.name);
        this.reponse = res;
      },

      error  :err =>{
        console.log(err);
      },

    });
  }
  onSend_delete(id:any){

    const formData : FormData = new FormData();
    /*for(var i = 0;i<id.lenght;i++){
      formData.append('id[]',id[i]);
    }*/
    formData.append('bg_delete',id);
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next:res=>{
        console.log(res);

      },

      error  :err =>{
        console.log(err);
      },

    });
  }
  onSend_update(list:any){

    const formData : FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('bg_update',JSON.stringify(list));
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next:res=>{
        console.log(res.name);
        this.reponse = res;
      },

      error  :err =>{
        console.log(err);
      },

    });
  }
  data : BoyGirl[] = [];
  recup(donne:any){
    this.jeuxService.recup_bg(donne).subscribe(data =>{
      for(var i = 0;data[i]!= null;i++){
        donne.push(
          new BoyGirl(data[i].id_gb,data[i].date_gb,this.getMots(data[i].l_m_f),this.getMots(data[i].l_m_b),data[i].bg_color,data[i].bg_color_f,data[i].bg_color_b,data[i].bg_color_m,data[i].word_f,data[i].word_b,data[i].word_m,data[i].title_f,data[i].title_b,data[i].title_m,data[i].text_f,data[i].text_b,data[i].text_m,data[i].type_ecri)
        );
      }
    })
  }

  getMots(s : string) : string[] {
    let tab = s.split(',');
    let res : string[] = []
    for(let mot of tab) {
      res.push(mot)
    }
    return res;
  }

  ngOnInit(): void {
    this.recup(this.data);
    console.log(this.data);
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
    /*elseif($_POST['bg']){
  $nom2=json_decode($_POST['bg'],TRUE);
  try {
    $conn = new PDO("mysql:host=$servername;dbname=Application", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO girlsandboys (type_ecri, id_image,bg_color,bg_color_f,bg_color_m, word_f,word_b,word_m,title_f, title_b,title_m, text_f,text_b,text_m)
    VALUES('$nom2[ecri]','text','$nom2[bg_color]','$nom2[bg_color_f]','$nom2[bg_color_f]','$nom2[bg_color_m]','$nom2[word_f]','$nom2[word_b]','$nom2[word_m]','$nom2[title_f]','$nom2[title_b]','$nom2[title_m]','$nom2[text_f]','$nom2[text_b]','$nom2[text_m]')";

    $conn->exec($sql);
    echo 'Entrée ajoutée dans la table';


  } catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }

  echo "\n";
}*/

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
    }

  }


  @Input() bg: BoyGirl | null;
  @Input() showTitle: boolean = true;
  @Input() play: boolean = true;
  @Input() showList: boolean = false;
  @Input() create_game: boolean = false;
  @Input() edit: boolean = false;

  boygirl_list: BoyGirl[] = SessionsComponent.boygirl_list;
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
  list:any = {id:1,bg_color:this.boygirl_bg_color_container,
    bg_color_b:this.boygirl_bg_color_garcon,bg_color_f:this.boygirl_bg_color_fille,bg_color_m:this.boygirl_bg_color_mot,
    word_f:this.boygirl_word_color_fille,word_b:this.boygirl_word_color_garcon,word_m:this.boygirl_word_color_mot,
    title_f:this.boygirl_title_color_fille,title_b:this.boygirl_title_color_garcon,title_m:this.boygirl_title_color_mot,
    text_f:this.boygirl_text_color_fille,text_b:this.boygirl_text_color_garcon,text_m:this.boygirl_text_color_mot,
    ecri:this.boygirl_type_ecriture};


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

  deleteGameBoyGirl(bg: BoyGirl): void {
    this.onSend_delete(bg.id);
    setTimeout(() => {
      this.data = [];
      this.recup(this.data)
    },200)
  }

  redirectEditBoyGirl(bg: BoyGirl): void {
    window.location.href = '/panel/Fille&Garçon/edit/' + bg.id;
  }


  parseDate(date: Date): string {
    let month: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let index: number = date.getMonth() - 1;
    return date.getUTCDate() + '/' + month[index] + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

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

  setPrevisualiserBoyGirl(prev: boolean): void {
    if (prev == true) {
      this.bg = new BoyGirl(0,'',this.boygirl_listMotsFille, this.boygirl_listMotsGarcon, this.boygirl_bg_color_container, this.boygirl_bg_color_fille, this.boygirl_bg_color_garcon, this.boygirl_bg_color_mot, this.boygirl_word_color_fille, this.boygirl_word_color_garcon, this.boygirl_word_color_mot, this.boygirl_title_color_fille, this.boygirl_title_color_garcon, this.boygirl_title_color_mot, this.boygirl_text_color_fille, this.boygirl_text_color_garcon, this.boygirl_text_color_mot, this.boygirl_type_ecriture);
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
    this.router.navigate(['/panel/Fille&Garçon']);
  }

  save(): void {
    this.bg!.listMotsFille = this.boygirl_listMotsFille;
    this.bg!.listMotsGarcon = this.boygirl_listMotsGarcon;
    this.bg!.bg_color_container = this.boygirl_bg_color_container;
    this.bg!.bg_color_fille = this.boygirl_bg_color_fille;
    this.bg!.bg_color_garcon = this.boygirl_bg_color_garcon;
    this.bg!.bg_color_mot = this.boygirl_bg_color_mot;
    this.bg!.word_color_fille = this.boygirl_word_color_fille;
    this.bg!.word_color_garcon = this.boygirl_word_color_garcon;
    this.bg!.word_color_mot = this.boygirl_word_color_mot;
    this.bg!.title_color_fille = this.boygirl_title_color_fille;
    this.bg!.title_color_garcon = this.boygirl_title_color_garcon;
    this.bg!.title_color_mot = this.boygirl_title_color_mot;
    this.bg!.text_color_fille = this.boygirl_text_color_fille;
    this.bg!.text_color_garcon = this.boygirl_text_color_garcon;
    this.bg!.text_color_mot = this.boygirl_text_color_mot;
    this.bg!.type_ecriture = this.boygirl_type_ecriture;
    this.router.navigate(['/panel/Fille&Garçon']);
  }

}
