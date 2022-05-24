import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
//Permet de faire le lien entre angular et php
export class JeuxService {

  constructor(private http:HttpClient) { }
  //Lien pour envoyer les données vers le fichier co.php qui permet d'insert, de delete et d'update la base de données
  link_onSend='http://92.154.61.105:8080/~nacer/co.php';
  //Début du lien qui permet de récuperer les données de la base de données vers php et de les envoyer dans angular,il faut ajouter le nom du fichier
  link_recup='http://92.154.61.105:8080/~nacer/';

  
  onSend(formData:any):Observable<any>{//Fonction pour envoyer les données,fonctionne avec toutes les fonctionnalité,jeux
    return this.http.post<any>(this.link_onSend,formData);
  }
  //Récupere les données des jeux, une fonction par jeux, fonctionnalité
  recup_reconnaitre(donne:any){
    return this.http.get<any>(this.link_recup+'vue_reco.php');
  }
  recup_recopier(donne:any){
    return this.http.get<any>(this.link_recup+'vue_recopier.php');
  }
  recup_memory(donne:any){
    return this.http.get<any>(this.link_recup+'vue_memory.php');
  }
  recup_abcd(donne:any){
    return this.http.get<any>(this.link_recup+'vue_abcd.php');
  }
  recup_bg(donne:any){
    return this.http.get<any>(this.link_recup+'vue_bg.php');
  }
  recup_puzzle(donne:any){
    return this.http.get<any>(this.link_recup+'vue_puzzle.php');
  }
  
  recup_image(donne:any){
    return this.http.get<any>(this.link_recup+'vue_image.php');
  }
  recup_image_id(donne:any){
    return this.http.get<any>(this.link_recup+'vue_id_image.php');
  }
  recup_session(donne:any){
    return this.http.get<any>(this.link_recup+'vue_session.php');
  }
  recup_theme(donne:any){
    return this.http.get<any>(this.link_recup+'vue_theme.php');
  }
  recup_user(donne:any){
    return this.http.get<any>(this.link_recup+'vue_user.php');
  }
}
