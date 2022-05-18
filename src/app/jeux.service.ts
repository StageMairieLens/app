import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  constructor(private http:HttpClient) { }
  link_onSend='http://92.154.61.105:8080/~nacer/co.php';
  onSend(formData:any):Observable<any>{
    return this.http.post<any>(this.link_onSend,formData);
  }
  link_recup='http://92.154.61.105:8080/~nacer/';
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
