import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Image } from '../Image'
import { JeuxService } from '../jeux.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  [x: string]: any;
  pro_img=0;
  constructor(private jeuxService: JeuxService) {}

  static list_image: Image[] = [
    new Image('Fleur', '../../assets/fleur.jpg'),
    new Image('Chat', '../../assets/chat.jpg'),
    new Image('Voiture', '../../assets/voiture.png'),
    new Image('Elephant', '../../assets/elephant.jpg'),
    new Image('Chien', '../../assets/chien.jpeg'),
    new Image('Lapin', '../../assets/lapin.webp'),
    new Image('Panda', '../../assets/panda.png'),
    new Image('Souris', '../../assets/souris.jpg'),
    new Image('Maison', '../../assets/house.svg'),
    new Image('Orange', '../../assets/orange.jpg'),
    new Image('Lion', '../../assets/lion.jpg'),
  ];


  ngOnInit(): void {

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
  if(this.pro_img<0){
    this.pro_img=0;
  }
  console.log(event);
  this.files.push(...event.addedFiles);
  console.log(this.files[this.pro_img].type);
  //this.pro_img+=1;
}

onRemove(event: File) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
  this.pro_img-=1;
}
onSend(pro_img2:number){
  var img:Blob=this.files[pro_img2];
  const formData : FormData = new FormData();
  /*for(var i = 0;i<list.lenght;i++){
    formData.append('list[]',list[i]);
  }*/
  formData.append('image',img);
  console.log(formData);
  this.jeuxService.onSend(formData).subscribe({
    next:res=>{
      console.log(res.name);
      
    },
  
    error  :err =>{
      console.log(err);
    },
    
  });
}
onSend2(){
  
  for(var i=0;i<this.files.length;i++){
    this.onSend(i);
  }
}
}
