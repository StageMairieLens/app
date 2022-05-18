import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
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
  pro_img = 0;
  constructor(private jeuxService: JeuxService, private router: Router) { }

  static list_image: Image[] = [

  ];
  affiche: boolean = false;
  affiche_image: boolean = false;
  showAlert: boolean = false;

  temps: number = 0;
  test: string = "test";
  test2: number = 1;
  ngOnInit(): void {


  }

  public getListImages(): Image[] {
    return ImagesComponent.list_image;
  }


  addImage(i: Image): void {
    console.log(i);
  }


  files: File[] = [];

  onSelect(event: { addedFiles: any; }) {

    for (let i of event.addedFiles) {
      if (i.type.split('/')[0] == 'image') {
        if (this.pro_img < 0) {
          this.pro_img = 0;
        }
        console.log(event);
        this.files.push(i);
        console.log(this.files[this.pro_img].type);
        //this.pro_img+=1;
      } else {
        this.showAlert = true;
        setTimeout(() =>  {
          this.showAlert = false;
        },3000)
      }
    }


  }

  onRemove(event: File) {

    this.files.splice(this.files.indexOf(event), 1);
    this.pro_img -= 1;
  }
  onSend(pro_img2: number) {
    var img: Blob = this.files[pro_img2];
    const formData: FormData = new FormData();

    formData.append('image', img);

    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        console.log(res.name);


      },

      error: err => {
        console.log(err);
        this.temps += 1;


        if (this.temps >= this.files.length) {
          this.redirect();
        }
      },

    });
  }
  onSend2() {
    for (var i = 0; i < this.files.length; i++) {
      this.onSend(i);

    }
  }
  redirect() {
    this.router.navigate(['/theme']);
  }

  recup(donne: any) {
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {

        donne.push(new Image(data[i].nom, data[i].id_image));
      }
    })


  }
  onSend_delete(id: any) {

    const formData: FormData = new FormData();

    formData.append('image_delete', id);
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

  getListImage(): Image[] {
    if (this.affiche_image == true) {

      return ImagesComponent.list_image;
    } else {
      return ImagesComponent.list_image = [];
    }
  }
  noImage(): Image[] {
    return ImagesComponent.list_image = [];
  }
  remove(id: any): any {

    for (var i = 0; ImagesComponent.list_image[i] != null; i++) {

      if (ImagesComponent.list_image[i].id == id) {

        ImagesComponent.list_image.splice(i, 1);

      }

    }

  }
}
