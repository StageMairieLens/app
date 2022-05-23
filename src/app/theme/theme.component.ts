import { Component, OnInit } from '@angular/core';
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
import { SessionsComponent } from '../sessions/sessions.component';
import { Session } from '../sessions/Session';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  affiche_image: Boolean = false; // Pour afficher les images
  affiche_image2: Boolean = false;//Pour afficher les images
  create_theme: Boolean = false;//Pour crée le thème
  n_theme: any = [];//Récupere les id des images

  math = Math;

  //pro_img = 0;
  affiche: Boolean = false;
  temps: number = 0;
  test: any = [];
  data: any = [];
  recup_image: any | null = null;
  nom: string = "";
  liste_id = [];
  id_crea = localStorage.getItem('id_crea');
  nouveau_theme: any = { table:'Theme',id_crea: Number(this.id_crea), id_jeux: '', id_session: null };
  list: any = { table:'Theme',nom: this.nom, id: this.liste_id.toString(), id_crea: Number(this.id_crea), id_jeux: '', id_session: null };

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

  edit_session : boolean = false;

  cpt_jeux: number = 0;
  showAlert: boolean = false;
  cpt: number = 0;

  constructor(private route: ActivatedRoute, private jeuxService: JeuxService, private router: Router) { }
  static list_image: Image[] = [];
  ngOnInit(): void {
    this.recup2(this.data);
  }

  edit(element: any): void {
    this.recup_image = element;
    this.create_theme = true;
    this.edit_session = true;
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
  files: File[] = [];//Listes des images/fichiers

  onSelect(event: { addedFiles: any; }) {//Insere les images dans la liste

    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {//Retire les images de la liste
    this.files.splice(this.files.indexOf(event), 1);
  }
  recup(donne: any) {//Recupère les images crée par l'utilisateur
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          donne.push(new Image(data[i].nom, data[i].id_image, data[i].id_crea));
        }
      }
    })


  }
  recup2(donne: any) {//Recupère les thèmes crée par l'utilisateur
    this.jeuxService.recup_theme(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          donne.push({ id: data[i].id_theme, nom: data[i].nom_theme, id_image: data[i].id_image, id_crea: data[i].id_crea, id_jeux: data[i].id_jeux, id_session: data[i].id_session });
          var a = data[i].id_image.split(',');
          this.test.push({ id_theme: data[i].id_theme, id: a, nom: data[i].nom_theme, id_crea: data[i].id_crea, id_jeux: data[i].id_jeux, id_session: data[i].id_session });
        }
      }
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
    const formData: FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('theme', JSON.stringify(list2));
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
    const formData: FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('theme_update', JSON.stringify(list2));
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        console.log(res.name);
      },

      error: err => {
        console.log(err);
      },
    });
  }
  ajoute(id: any, liste: any): any {
    if (!liste.includes(id)) {
      liste.push(id.toString());
    }
  }
  remove(id: any, liste: any): any {
    for (var i = 0; liste[i] != null; i++) {
      if (liste[i] == id) {
        liste.splice(i, 1);
        return;
      }
    }
  }
  reloadCurrentPage() {
    window.location.reload();
  }
  remove2(id: any): any {
    console.log(id);

    let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);
    let session_list: Session[] = []
    ses.recup(session_list);

    let t : any;
    for (var i = 0; this.test[i] != null; i++) {
      if (this.test[i].id_theme == id) {
        t = this.test[i];
        this.test.splice(i, 1);
      }
    }

    setTimeout(() => {
      for(let s of session_list) {
        if(s.id == t.id_session) {
          ses.onSend_delete(s.id);
        }
      }


    }, 300)




  }

  create(): void {
    this.nouveau_theme['id'] = this.n_theme;

    if (this.create_recopier) {
      this.cpt_jeux++;
      let recopier: RecopierGameComponent = new RecopierGameComponent(this.route, this.jeuxService, this.router);
      let recopier_list: Recopier[] = [];
      recopier.list['id_image'] = this.n_theme.toString();
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
      memory.list['id_image'] = this.n_theme.toString();
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
      reconnaitre.list['id_images'] = this.n_theme.toString();
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
      abecedaire.list['id_image'] = this.n_theme.toString();
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
      puzzle.list['id_images'] = this.n_theme.toString();
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

    setTimeout(() => {
    let ses = new SessionsComponent(this.router, this.route, this.jeuxService);
    ses.list['nom'] = 'Session à thème | ' + this.nouveau_theme['nom'];
    ses.list['jeux_id'] = this.nouveau_theme['id_jeux'];
    ses.onSend(ses.list);

    let session_list: Session[] = [];
    setTimeout(() => {
      ses.recup(session_list);
    }, 300)

    setTimeout(() => {
      console.log(session_list)
      for (let i = session_list.length - 1; session_list[i] != null; i--) {
        if (session_list[i].id_crea == +localStorage.getItem('id_crea')!) {
          this.nouveau_theme['id_session'] = session_list[i].id
          break;
        }
      }
    }, 500)
    },1000)

    this.showAlert = true;

    setInterval(() => {
      this.cpt += 2;
    }, 20)

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
      recopier.deleteSessionRecopier(+this.edit_create_recopier.split(',')[1])
      let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);
      let array = ses.getJeuSession(this.recup_image.id_jeux);

      let index_recopier = -1;
      for (let j of array) {
        if (j.type == this.edit_create_recopier!.split(',')[0]) {
          if (j.id_jeu == +this.edit_create_recopier!.split(',')[1]) {
            index_recopier = array.indexOf(j);
          }
        }
      }

      if (index_recopier > -1) {
        array.splice(index_recopier, 1);
        this.recup_image.id_jeux = ses.setJeuSession(array);
      }
    }
    else if (this.edit_create_recopier == null && this.create_recopier) {
      this.cpt_jeux++;
      let recopier: RecopierGameComponent = new RecopierGameComponent(this.route, this.jeuxService, this.router);
      let recopier_list: Recopier[] = [];
      recopier.list['id_image'] = this.n_theme.toString();
      recopier.onSend(recopier.list);

      setTimeout(() => {
        recopier.recup(recopier_list);
      }, 100)

      setTimeout(() => {
        for (let i = recopier_list.length - 1; recopier_list[i] != null; i--) {
          if (recopier_list[i].id_crea == +localStorage.getItem('id_crea')!) {
            this.recup_image.id_jeux += 'Recopier,' + recopier_list[i].id + ';'
            break;
          }
        }

      }, 300)
    }



    if (this.edit_create_memory != null && !this.create_memory) {
      this.cpt_jeux++;
      let memory: MemoryComponent = new MemoryComponent(this.route, this.jeuxService, this.router);
      memory.onSend_delete(this.edit_create_memory.split(',')[1])
      let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);
      let array = ses.getJeuSession(this.recup_image.id_jeux);

      let index_memory = -1;
      for (let j of array) {
        if (j.type == this.edit_create_memory!.split(',')[0]) {
          if (j.id_jeu == +this.edit_create_memory!.split(',')[1]) {
            index_memory = array.indexOf(j);
          }
        }
      }

      if (index_memory > -1) {
        array.splice(index_memory, 1);
        this.recup_image.id_jeux = ses.setJeuSession(array);
      }
    }
    else if (this.edit_create_memory == null && this.create_memory) {
      this.cpt_jeux++;
      let memory: MemoryComponent = new MemoryComponent(this.route, this.jeuxService, this.router);
      let memory_list: Memory[] = [];
      memory.list['id_image'] = this.n_theme.toString();
      memory.onSend(memory.list);

      setTimeout(() => {
        memory.recup(memory_list);
      }, 100)

      setTimeout(() => {
        for (let i = memory_list.length - 1; memory_list[i] != null; i--) {
          if (memory_list[i].id_crea == +localStorage.getItem('id_crea')!) {
            this.recup_image.id_jeux += 'Memory,' + memory_list[i].id + ';'
            break;
          }
        }

      }, 300)
    }

    // Reconnaitre
    if (this.edit_create_reconnaitre != null && !this.create_reconnaitre) {
      this.cpt_jeux++;
      let reconnaitre: ReconnaitreComponent = new ReconnaitreComponent(this.route, this.jeuxService, this.router);
      reconnaitre.onSend_delete(this.edit_create_reconnaitre.split(',')[1])
      let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);
      let array = ses.getJeuSession(this.recup_image.id_jeux);

      let index_reconnaitre = -1;
      for (let j of array) {
        if (j.type == this.edit_create_reconnaitre!.split(',')[0]) {
          if (j.id_jeu == +this.edit_create_reconnaitre!.split(',')[1]) {
            index_reconnaitre = array.indexOf(j);
          }
        }
      }

      if (index_reconnaitre > -1) {
        array.splice(index_reconnaitre, 1);
        this.recup_image.id_jeux = ses.setJeuSession(array);
      }
    }
    else if (this.edit_create_reconnaitre == null && this.create_reconnaitre) {
      this.cpt_jeux++;
      let reconnaitre: ReconnaitreComponent = new ReconnaitreComponent(this.route, this.jeuxService, this.router);
      let reconnaitre_list: Reconnaitre[] = [];
      reconnaitre.list['id_images'] = this.n_theme.toString();
      reconnaitre.onSend(reconnaitre.list);

      setTimeout(() => {
        reconnaitre.recup(reconnaitre_list);
      }, 100)

      setTimeout(() => {
        for (let i = reconnaitre_list.length - 1; reconnaitre_list[i] != null; i--) {
          if (reconnaitre_list[i].id_crea == +localStorage.getItem('id_crea')!) {
            this.recup_image.id_jeux += 'Reconnaitre,' + reconnaitre_list[i].id + ';'
            break;
          }
        }

      }, 300)
    }

    // Abécédaire
    if (this.edit_create_abecedaire != null && !this.create_abecedaire) {
      this.cpt_jeux++;
      let abecedaire: AbecedaireComponent = new AbecedaireComponent(this.route, this.jeuxService, this.router);
      abecedaire.onSend_delete(this.edit_create_abecedaire.split(',')[1])
      let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);
      let array = ses.getJeuSession(this.recup_image.id_jeux);

      let index_abecedaire = -1;
      for (let j of array) {
        if (j.type == this.edit_create_abecedaire!.split(',')[0]) {
          if (j.id_jeu == +this.edit_create_abecedaire!.split(',')[1]) {
            index_abecedaire = array.indexOf(j);
          }
        }
      }

      if (index_abecedaire > -1) {
        array.splice(index_abecedaire, 1);
        this.recup_image.id_jeux = ses.setJeuSession(array);
      }
    }
    else if (this.edit_create_abecedaire == null && this.create_abecedaire) {
      this.cpt_jeux++;
      let abecedaire: AbecedaireComponent = new AbecedaireComponent(this.route, this.jeuxService, this.router);
      let abecedaire_list: Abecedaire[] = [];
      abecedaire.list['id_image'] = this.n_theme.toString();
      abecedaire.onSend(abecedaire.list);

      setTimeout(() => {
        abecedaire.recup(abecedaire_list);
      }, 100)

      setTimeout(() => {
        for (let i = abecedaire_list.length - 1; abecedaire_list[i] != null; i--) {
          if (abecedaire_list[i].id_crea == +localStorage.getItem('id_crea')!) {
            this.recup_image.id_jeux += 'Abécédaire,' + abecedaire_list[i].id + ';'
            break;
          }
        }

      }, 300)
    }

    // Puzzle
    if (this.edit_create_puzzle != null && !this.create_puzzle) {
      this.cpt_jeux++;
      let puzzle: PuzzleComponent = new PuzzleComponent(this.route, this.jeuxService, this.router);
      puzzle.onSend_delete(this.edit_create_puzzle.split(',')[1])
      let ses: SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);
      let array = ses.getJeuSession(this.recup_image.id_jeux);

      let index_puzzle = -1;
      for (let j of array) {
        if (j.type == this.edit_create_puzzle!.split(',')[0]) {
          if (j.id_jeu == +this.edit_create_puzzle!.split(',')[1]) {
            index_puzzle = array.indexOf(j);
          }
        }
      }

      if (index_puzzle > -1) {
        array.splice(index_puzzle, 1);
        this.recup_image.id_jeux = ses.setJeuSession(array);
      }
    }
    else if (this.edit_create_puzzle == null && this.create_puzzle) {
      this.cpt_jeux++;
      let puzzle: PuzzleComponent = new PuzzleComponent(this.route, this.jeuxService, this.router);
      let puzzle_list: Puzzle[] = [];
      puzzle.list['id_images'] = this.n_theme.toString();
      puzzle.onSend(puzzle.list);

      setTimeout(() => {
        puzzle.recup(puzzle_list);
      }, 100)

      setTimeout(() => {
        for (let i = puzzle_list.length - 1; puzzle_list[i] != null; i--) {
          if (puzzle_list[i].id_crea == +localStorage.getItem('id_crea')!) {
            this.recup_image.id_jeux += 'Puzzle,' + puzzle_list[i].id + ';'
            break;
          }
        }

      }, 300)
    }



    this.showAlert = true;

    setInterval(() => {
      this.cpt += 2;
    }, 20)

    setTimeout(() => {


      let ses : SessionsComponent = new SessionsComponent(this.router, this.route, this.jeuxService);
      ses.list['id'] = this.recup_image.id_session;
      ses.list['jeux_id'] = this.recup_image.id_jeux;
      ses.onSend_update(ses.list);

      this.recup_image.nom = this.nouveau_theme['nom'];
      this.recup_image.id = this.n_theme;
      console.log(this.recup_image)
      this.onSend_update(this.recup_image)
      setTimeout(() => {
        this.reloadCurrentPage();
      }, 100)
      this.showAlert = false;
    }, 1000 * this.cpt_jeux)
  }


  quitEdit(): void {
    this.create_theme = false;
    this.edit_session = false;
    this.recup_image = null;
    this.nouveau_theme['nom'] = ''; this.n_theme = [];

    this.create_recopier = false;
    this.create_reconnaitre = false;
    this.create_memory = false;
    this.create_abecedaire = false;
    this.create_puzzle = false;

    this.edit_create_recopier = null;
    this.edit_create_reconnaitre = null;
    this.edit_create_memory = null;
    this.edit_create_abecedaire = null;
    this.edit_create_puzzle = null;
  }
}
