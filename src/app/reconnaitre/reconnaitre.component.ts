import { Component, OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-reconnaitre',
  templateUrl: './reconnaitre.component.html',
  styleUrls: ['./reconnaitre.component.css']
})
export class ReconnaitreComponent implements OnInit {
  constructor() { }
  clicked = false;
  variable : String = "../../assets/lion.jpg";
  liste : string[] =["Lion","AZE","test","pas"];
  compteur = 0 ;
  ngOnInit(): void {
  }
  change($event: MouseEvent,varia:string):Boolean{
    if(varia == "Lion"){
      return true;
    }
    else{
      document.getElementById(varia)!.style.backgroundColor="red";
      ($event.target as HTMLButtonElement).disabled = true;
      this.compteur+=1;
      var button = document.getElementById(varia);
      console.log(this.compteur);
      return false;
    }
  }
  
  

}
