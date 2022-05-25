import { Component, OnInit } from '@angular/core';
import { Image } from '../Image'
import { JeuxService } from '../jeux.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  [x: string]: any;
  constructor(private jeuxService: JeuxService, private router: Router) { }

  static list_image: Image[] = [

  ];
  affiche: boolean = false;
  affiche_image: boolean = false;
  showAlert: boolean = false;
  id_local=Number(localStorage.getItem('id_crea'));
  temps: number = 0;
  test: string = "test";
  test2: number = 1;
  ngOnInit(): void {


  }

  public getListImages(): Image[] {
    return ImagesComponent.list_image;
  }

  files: File[] = [];//La liste de toutes les images

  onSelect(event: { addedFiles: any; }) {//Ajoute les images dans la liste d'images

    for (let i of event.addedFiles) {
      if (i.type.split('/')[0] == 'image') {
        
       
        this.files.push(i);
      
        
      } else {
        this.showAlert = true;
        setTimeout(() =>  {
          this.showAlert = false;
        },3000)
      }
    }


  }

  onRemove(event: File) {//Supprime les images de la listes

    this.files.splice(this.files.indexOf(event), 1);
    
  }
  onSend(pro_img2: number) {//Envoi les images une par une dans la base de données
    var img: Blob = this.files[pro_img2];
    const formData: FormData = new FormData();

    formData.append('image', img);//Envoi l'image
    formData.append('image',localStorage.getItem('id_crea')!);//Envoi l'id de l'utilisateur
    this.jeuxService.onSend(formData).subscribe({
      error: err => {
        this.temps += 1;

        if (this.temps >= this.files.length) {
          this.redirect();
        }
      },
    });
  }
  onSend2() {//Permet d'envoyer toutes les images dans la base de données
    for (var i = 0; i < this.files.length; i++) {
      this.onSend(i);

    }
  }
  redirect() {//Redirect vers les themes après l'ajout des images
    window.location.href = '/panel/themes'
  }

  recup(donne: any) {//Récupere toutes les images depuis la base de données
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        if(data[i].id_crea == this.id_local){
          
          donne.push(new Image(data[i].nom, data[i].id_image,data[i].id_crea));
        }
      }
    })


  }
  onSend_delete(id: any) {//Suprimme les images de la base de données et les envois dans le component Image.ts

    const formData: FormData = new FormData();
    var list={table:'images',id:id,id_table:'id_image'};
    formData.append('delete', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }

  getListImage(): Image[] {//Affiche les images dans l'HTML
    if (this.affiche_image == true) {

      return ImagesComponent.list_image;
    } else {
      return ImagesComponent.list_image = [];
    }
  }
  noImage(): Image[] {//Cache les images dans l'HTML
    return ImagesComponent.list_image = [];
  }
  remove(id: any): any {//Supprime les images dans Images.ts

    for (var i = 0; ImagesComponent.list_image[i] != null; i++) {

      if (ImagesComponent.list_image[i].id == id) {

        ImagesComponent.list_image.splice(i, 1);

      }

    }

  }
}
