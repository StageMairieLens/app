import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Image } from '../Image'
import { JeuxService } from '../jeux.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  affiche_image: Boolean = false;
  affiche_image2: Boolean = false;
  create_theme: Boolean = false;
  n_theme: any = [];

  pro_img = 0;
  affiche: Boolean = false;
  temps: number = 0;
  test: any = [];
  data: any = [];
  recup_image: any | null = null;
  nom: string = "";
  liste_id = [];
  hover_edit : boolean = false;
  id_crea = localStorage.getItem('id_crea');
  nouveau_theme: any = { id_crea: Number(this.id_crea) };
  list: any = { nom: this.nom, id: this.liste_id.toString(), id_crea: Number(this.id_crea) };


  create_recopier : boolean = false;
  create_reconnaitre : boolean = false;
  create_memory : boolean = false;
  create_abecedaire : boolean = false;
  create_boygirl : boolean = false;
  create_puzzle : boolean = false;

  constructor(private jeuxService: JeuxService, private router: Router) { }
  static list_image: Image[] = [];
  ngOnInit(): void {
    this.recup2(this.data);
    console.log(this.id_crea);



  }

  edit(element: any): void {
    this.recup_image = element;
    this.create_theme = true;
    for(let i = 0 ; i<element.id.length ; i++) {
      this.n_theme.push(element.id[i])
    }
    this.nouveau_theme['nom'] = element.nom;
  }

  public getListImages(): Image[] {
    return ThemeComponent.list_image;
  }
  files: File[] = [];

  onSelect(event: { addedFiles: any; }) {
    if (this.pro_img < 0) {
      this.pro_img = 0;
    }
    console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files[this.pro_img].type);
    //this.pro_img+=1;
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.pro_img -= 1;
  }
  recup(donne: any) {
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        //console.log(data);
        donne.push(new Image(data[i].nom, data[i].id_image));
      }
    })


  }
  recup2(donne: any) {
    this.jeuxService.recup_theme(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        //console.log(data);
        donne.push({ id: data[i].id_theme, nom: data[i].nom_theme, id_image: data[i].id_image, id_crea: data[i].id_crea });
        var a = data[i].id_image.split(',');
        this.test.push({ id_theme: data[i].id_theme, id: a, nom: data[i].nom_theme, id_crea: data[i].id_crea });

      }
      console.log(this.test);
    })


  }

  getListImage(): Image[] {
    if (this.affiche_image == true || this.affiche_image2 == true) {

      return ThemeComponent.list_image;

    } else {
      return ThemeComponent.list_image = [];
    }
  }
  noImage(): Image[] {
    return ThemeComponent.list_image = [];
  }

  onSend(list: any) {
    var list2 = list;
    list2.id = list2.id.toString();
    console.log(list2);
    const formData: FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('theme', JSON.stringify(list2));
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        console.log(res);

      },

      error: err => {
        console.log(err);
        this.reloadCurrentPage();
      },

    });
  }
  onSend_delete(id: any) {

    const formData: FormData = new FormData();
    /*for(var i = 0;i<id.lenght;i++){
      formData.append('id[]',id[i]);
    }*/
    formData.append('theme_delete', id);
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
    var list2 = list;
    list2.id = list2.id.toString();
    console.log(list2);
    const formData: FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('theme_update', JSON.stringify(list2));
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        console.log(res.name);

      },

      error: err => {
        console.log(err);
        this.reloadCurrentPage();
      },

    });
  }
  aff(test: any) {
    console.log(test);
  }
  ajoute(id: any, liste: any): any {
    if (!liste.includes(id)) {
      liste.push(id.toString());
    }
  }
  remove(id: any, liste: any): any {
    //console.log(liste);
    for (var i = 0; liste[i] != null; i++) {
      //console.log(liste);
      if (liste[i] == id) {
        //console.log(liste[i]);
        liste.splice(i, 1);
        return;

      }
      console.log(liste);
    }
  }
  reloadCurrentPage() {
    window.location.reload();
  }
  remove2(id: any): any {
    //console.log(liste);
    console.log(id);
    for (var i = 0; this.test[i] != null; i++) {
      //console.log(liste);
      if (this.test[i].id_theme == id) {
        //console.log(liste[i]);
        this.test.splice(i, 1);

      }
      console.log(this.test);
    }
  }

  create() : void {
    this.nouveau_theme['id']=this.n_theme;
    this.onSend(this.nouveau_theme);
  }
}
