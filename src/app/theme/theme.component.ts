import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Image } from '../Image'
import { JeuxService } from '../jeux.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecopierGameComponent } from '../recopier-game/recopier-game.component';
import { Recopier } from '../recopier-game/Recopier';
import { MemoryComponent } from '../memory/memory.component';
import { Memory } from '../memory/Memory';
import { ReconnaitreComponent } from '../reconnaitre/reconnaitre.component';
import { AbecedaireComponent } from '../abecedaire/abecedaire.component';
import { Reconnaitre } from '../reconnaitre/Reconnaitre';
import { Abecedaire } from '../abecedaire/Abecedaire';
import { Puzzle } from '../puzzle/Puzzle';
import { PuzzleComponent } from '../puzzle/puzzle.component';

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
  id_crea = localStorage.getItem('id_crea');
  nouveau_theme: any = { id_crea: Number(this.id_crea), id_jeux: '' };
  list: any = { nom: this.nom, id: this.liste_id.toString(), id_crea: Number(this.id_crea) };


  create_recopier: boolean = false;
  create_reconnaitre: boolean = false;
  create_memory: boolean = false;
  create_abecedaire: boolean = false;
  create_puzzle: boolean = false;

  edit_create_recopier: string | null = null;
  edit_create_reconnaitre: string | null = null;
  edit_create_memory: string | null = null;
  edit_create_abecedaire: string | null = null;
  edit_create_puzzle: string | null = null;
  cpt_jeux: number = 0;
  showAlert: boolean = false;
  cpt: number = 0;

  constructor(private route: ActivatedRoute, private jeuxService: JeuxService, private router: Router) { }
  static list_image: Image[] = [];
  ngOnInit(): void {
    this.recup2(this.data);
    console.log(this.id_crea);



  }

  edit(element: any): void {
    this.recup_image = element;
    this.create_theme = true;
    for (let i = 0; i < element.id.length; i++) {
      this.n_theme.push(element.id[i])
    }

    for (let j of this.recup_image.id_jeux.split(';')) {
      switch (j.split(',')[0]) {
        case 'Recopier':
          this.create_recopier = true;
          this.edit_create_recopier = j;
          break;
        case 'Memory':
          this.create_memory = true;
          this.edit_create_memory = j;
          break;
        case 'Reconnaitre':
          this.create_reconnaitre = true;
          this.edit_create_reconnaitre = j;
          break;
        case 'Abécédaire':
          this.create_abecedaire = true
          this.edit_create_abecedaire = j;
          break;
        case 'Puzzle':
          this.create_puzzle = true;
          this.edit_create_puzzle = j;
          break;
      }
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
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          donne.push(new Image(data[i].nom, data[i].id_image, data[i].id_crea));
        }
      }
    })


  }
  recup2(donne: any) {
    this.jeuxService.recup_theme(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          donne.push({ id: data[i].id_theme, nom: data[i].nom_theme, id_image: data[i].id_image, id_crea: data[i].id_crea, id_jeux: data[i].id_jeux });
          var a = data[i].id_image.split(',');
          this.test.push({ id_theme: data[i].id_theme, id: a, nom: data[i].nom_theme, id_crea: data[i].id_crea, id_jeux: data[i].id_jeux });
        }
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

  create(): void {
    this.nouveau_theme['id'] = this.n_theme;

    if (this.create_recopier) {
      this.cpt_jeux++;
      let recopier: RecopierGameComponent = new RecopierGameComponent(this.route, this.jeuxService, this.router);
      let recopier_list: Recopier[] = [];
      recopier.list['image'] = this.n_theme.toString();
      recopier.onSend(recopier.list);

      setTimeout(() => {
        recopier.recup(recopier_list);
      }, 300)

      setTimeout(() => {
        for (let i = recopier_list.length - 1; recopier_list[i] != null; i--) {
          if (recopier_list[i].id_crea == +localStorage.getItem('id_crea')!) {
            this.nouveau_theme['id_jeux'] += 'Recopier,' + recopier_list[i].id + ';'
            break;
          }
        }

      }, 500)

    }

    if (this.create_memory) {
      this.cpt_jeux++;
      let memory: MemoryComponent = new MemoryComponent(this.route, this.jeuxService, this.router);
      let memory_list: Memory[] = [];
      memory.list['image'] = this.n_theme.toString();
      memory.onSend(memory.list);

      setTimeout(() => {
        memory.recup(memory_list);
      }, 300)

      setTimeout(() => {
        for (let i = memory_list.length - 1; memory_list[i] != null; i--) {
          if (memory_list[i].id_crea == +localStorage.getItem('id_crea')!) {
            this.nouveau_theme['id_jeux'] += 'Memory,' + memory_list[i].id + ';'
            break;
          }
        }

      }, 500)

    }
    if (this.create_reconnaitre) {
      this.cpt_jeux++;
      let reconnaitre: ReconnaitreComponent = new ReconnaitreComponent(this.route, this.jeuxService, this.router);
      let reconnaitre_list: Reconnaitre[] = [];
      reconnaitre.list['image'] = this.n_theme.toString();
      reconnaitre.onSend(reconnaitre.list);

      setTimeout(() => {
        reconnaitre.recup(reconnaitre_list);
      }, 300)

      setTimeout(() => {
        for (let i = reconnaitre_list.length - 1; reconnaitre_list[i] != null; i--) {
          if (reconnaitre_list[i].id_crea == +localStorage.getItem('id_crea')!) {
            this.nouveau_theme['id_jeux'] += 'Reconnaitre,' + reconnaitre_list[i].id + ';'
            break;
          }
        }

      }, 500)

    }

    if (this.create_abecedaire) {
      this.cpt_jeux++;
      let abecedaire: AbecedaireComponent = new AbecedaireComponent(this.route, this.jeuxService, this.router);
      let abecedaire_list: Abecedaire[] = [];
      abecedaire.list['image'] = this.n_theme.toString();
      abecedaire.onSend(abecedaire.list);

      setTimeout(() => {
        abecedaire.recup(abecedaire_list);
      }, 300)

      setTimeout(() => {
        for (let i = abecedaire_list.length - 1; abecedaire_list[i] != null; i--) {
          if (abecedaire_list[i].id_crea == +localStorage.getItem('id_crea')!) {
            this.nouveau_theme['id_jeux'] += 'Abécédaire,' + abecedaire_list[i].id + ';'
            break;
          }
        }

      }, 500)

    }

    if (this.create_puzzle) {
      this.cpt_jeux++;
      let puzzle: PuzzleComponent = new PuzzleComponent(this.route, this.jeuxService, this.router);
      let puzzle_list: Puzzle[] = [];
      puzzle.list['image'] = this.n_theme.toString();
      puzzle.onSend(puzzle.list);

      setTimeout(() => {
        puzzle.recup(puzzle_list);
      }, 300)

      setTimeout(() => {
        for (let i = puzzle_list.length - 1; puzzle_list[i] != null; i--) {
          if (puzzle_list[i].id_crea == +localStorage.getItem('id_crea')!) {
            this.nouveau_theme['id_jeux'] += 'Puzzle,' + puzzle_list[i].id + ';'
            break;
          }
        }

      }, 500)

    }

    this.showAlert = true;

    setInterval(() => {
      this.cpt++;
    }, 1000)

    setTimeout(() => {
      this.onSend(this.nouveau_theme);
      this.showAlert = false;
    }, 1000 * this.cpt_jeux)

  }

  save(): void {

    if (this.edit_create_recopier != null && !this.create_recopier) {
      this.cpt_jeux++;
      let recopier: RecopierGameComponent = new RecopierGameComponent(this.route, this.jeuxService, this.router);
      recopier.onSend_delete(this.edit_create_recopier.split(',')[1])

      setTimeout(() => {
        let index = -1;
        for (let j of this.recup_image.id_jeux.split(';')) {
          if (j == this.edit_create_recopier) {
            index = this.recup_image.id_jeux.split(';').indexOf(j);
          }
        }

        if (index > -1) {
          this.recup_image.id_jeux.split(';').splice(index, 1);
          console.log(this.recup_image.id_jeux.split(';'))
          console.log(index)
        }
      }, 200)
    }
    else if (this.edit_create_recopier == null && this.create_recopier) {
      this.cpt_jeux++;
      let recopier: RecopierGameComponent = new RecopierGameComponent(this.route, this.jeuxService, this.router);
      let recopier_list: Recopier[] = [];
      recopier.list['image'] = this.n_theme.toString();
      recopier.onSend(recopier.list);

      setTimeout(() => {
        recopier.recup(recopier_list);
      }, 300)

      setTimeout(() => {
        for (let i = recopier_list.length - 1; recopier_list[i] != null; i--) {
          if (recopier_list[i].id_crea == +localStorage.getItem('id_crea')!) {
            this.nouveau_theme['id_jeux'] += 'Recopier,' + recopier_list[i].id + ';'
            break;
          }
        }

      }, 200)
    }

    this.showAlert = true;

    setInterval(() => {
      this.cpt++;
    }, 1000)

    setTimeout(() => {
      this.recup_image.nom = this.nouveau_theme['nom'];
      this.recup_image.id = this.n_theme;
      console.log(this.recup_image)
      // this.onSend_update(this.recup_image)
      this.showAlert = false;
    }, 1000 * this.cpt_jeux)

    // this.recup_image.nom = this.nouveau_theme['nom'];
    // this.recup_image.id = this.n_theme;
    // this.onSend_update(this.recup_image)
  }
}
