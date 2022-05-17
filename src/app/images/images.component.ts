import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Image } from '../Image'
import { JeuxService } from '../jeux.service';
import { Router } from '@angular/router';
//import { DomSanitizer } from '@angular/platform-browser';

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
    //this.recup(ImagesComponent.list_image);
    console.log(this.test + this.test2.toString());
    console.log(this.files.length);
    console.log(ImagesComponent.list_image);
  }

  public getListImages(): Image[] {
    return ImagesComponent.list_image;
  }


  addImage(i: Image): void {
    console.log(i);
  }

  /*	//url; //Angular 8
    url: any; //Angular 11, for stricter type
    msg = "";

    //selectFile(event) { //Angular 8
    selectFile(event: any) { //Angular 11, for stricter type
      if(!event.target.files[0] || event.target.files[0].length == 0) {
        this.msg = 'You must select an image';
        return;
        }

      var mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*//*) == null) {
    this.msg = "Only images are supported";
    return;
  }

  var reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);

  reader.onload = (_event) => {
    this.msg = "";
    this.url = reader.result;
    console.log(reader.result);
  }
}*/
  files: File[] = [];

  onSelect(event: { addedFiles: any; }) {

    for (let i of event.addedFiles) {
      if (i.type.split('/')[0] == 'image') {
        if (this.pro_img < 0) {
          this.pro_img = 0;
        }
        console.log(event);
        this.files.push(...event.addedFiles);
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
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.pro_img -= 1;
  }
  onSend(pro_img2: number) {
    var img: Blob = this.files[pro_img2];
    const formData: FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('image', img);
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        console.log(res.name);


      },

      error: err => {
        console.log(err);
        this.temps += 1;
        console.log(this.temps);

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
  /*imageUrl:any = null;
  showImage(){

    this.jeuxService.getImage().subscribe((res) => {
      var img:Blob = res;
      var myReader:FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.imageUrl = this._DomSanitizationService.bypassSecurityTrustUrl(<string>myReader.result);
      }
      myReader.readAsDataURL(img);
    });
  }*/
  recup(donne: any) {
    this.jeuxService.recup_image_id(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        //console.log(data);
        donne.push(new Image(data[i].nom, data[i].id_image));
      }
    })


  }
  onSend_delete(id: any) {

    const formData: FormData = new FormData();
    /*for(var i = 0;i<id.lenght;i++){
      formData.append('id[]',id[i]);
    }*/
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
    console.log(ImagesComponent.list_image);
    console.log(id);
    for (var i = 0; ImagesComponent.list_image[i] != null; i++) {
      //console.log(liste);
      if (ImagesComponent.list_image[i].id == id) {
        console.log(ImagesComponent.list_image[i]);
        ImagesComponent.list_image.splice(i, 1);

      }

    }
    console.log(ImagesComponent.list_image);
  }
}
