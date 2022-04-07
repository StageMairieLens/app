import { Component, OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-reconnaitre',
  templateUrl: './reconnaitre.component.html',
  styleUrls: ['./reconnaitre.component.css']
})
export class ReconnaitreComponent implements OnInit {
  constructor() { }
  clicked = false; //Le boutton n'est pas désactiver
  liste_image : String[] = ["../../assets/lion.jpg","../../assets/chat.jpg","../../assets/chien.jpeg","../../assets/souris.jpg"];
  
  prochaine_image = 0;
   //Variable qui contient l'image a trouver
  liste_mot : string[] =["Lion","AZE","chat","pas","test2","4","5","6","8","9"]; //Liste qui contient les noms des images 
  compteur = 0 ; //Compte le nombre d'erreur
  variable : String = this.liste_image[this.prochaine_image];
  ngOnInit(): void {
    this.alea(this.liste_image);
    console.log(this.liste_image);
    this.variable = this.liste_image[this.prochaine_image];

    
  }
  
  alea(li : String[]):void{
    var m = li.length, t, i;
  
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
  change($event: any,varia:string):Boolean{
    this.variable=this.liste_image[this.prochaine_image];
    if(varia == "Lion"){ //Si reponse trouver alert un message et bloque tous les bouttons
      alert("Bien joué");
      this.clicked=false;
      this.prochaine_image+=1;
      if(this.prochaine_image < this.liste_image.length){
        for(var i of this.liste_mot){
          (<HTMLButtonElement>document.getElementById(i)).disabled = false;

        }
        this.variable=this.liste_image[this.prochaine_image];
        
        //($event.target as HTMLButtonElement).disabled = false;
      }
      else{
        this.clicked=true;
      }
      return true;
    }
    else{ //Transforme le boutton et le désactive et incrémente le nombre d'erreurs
      //document.getElementById(varia)!.style.backgroundColor="red";
      ($event.target as HTMLButtonElement).disabled = true;
      this.compteur+=1;
     
      console.log(this.compteur);
      return false;
    }
  }
  
  

}
