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
  affiche_image:Boolean=false;
  pro_img=0;
  affiche:Boolean=false;
  temps:number=0;
  test:any=[];
  data:any=[];

  nom:string="";
  liste_id=[];
  list:any={nom:this.nom,id:this.liste_id.toString()};
  constructor(private jeuxService: JeuxService,private router: Router) { }
  static list_image: Image[] = [];
  ngOnInit(): void {
    this.recup2(this.data);
    
  }
  
  public getListImages(): Image[] {
    return ThemeComponent.list_image;
  }
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
  recup(donne: any) {
    this.jeuxService.recup_image_id(donne).subscribe(data => {
  
      for (var i = 0; data[i] != null; i++) {
        //console.log(data);
        donne.push(new Image(data[i].nom,data[i].id_image));
      }
    })
  
  
  }
  recup2(donne: any) {
    this.jeuxService.recup_theme(donne).subscribe(data => {
  
      for (var i = 0; data[i] != null; i++) {
        //console.log(data);
        donne.push({id:data[i].id_theme,nom:data[i].nom_theme,id_image:data[i].id_image});
        var a=data[i].id_image.split(',');
        this.test.push({id:a,nom:data[i].nom_theme});
        
      }
      console.log(this.test);
    })
  
  
  }
  
  getListImage() : Image[] {
    if(this.affiche_image == true){
      
      return ThemeComponent.list_image;
      
    }else{
      return ThemeComponent.list_image = [];
    }
  }
  noImage():Image[]{
    return ThemeComponent.list_image = [];
  }

  onSend(pro_img2:number){
    var img:Blob=this.files[pro_img2];
    const formData : FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('theme',img);
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next:res=>{
        console.log(res.name);
  
  
      },
  
      error  :err =>{
        console.log(err);
        //this.temps+=1;
        //console.log(this.temps);
       
        /*if(this.temps>=this.files.length){
          this.redirect();
        }*/
      },
  
    });
  }
  onSend2(){
    for(var i=0;i<this.files.length;i++){
      this.onSend(i);
  
    }
  }
  aff(test:any){
    console.log(test);
  }
}
