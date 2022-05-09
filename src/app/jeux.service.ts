import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  constructor(private http:HttpClient) { }
  onSend(formData:any):Observable<any>{
    return this.http.post<any>('http://92.154.61.105:8080/~nacer/co.php',formData);
  }
  recup_reconnaitre(donne:any){
    return this.http.get<any>('http://92.154.61.105:8080/~nacer/vue_reco.php');/*.subscribe(data =>{
      console.log(data);
      for(var i = 0;data[i]!= null;i++){
        donne.push(data[i]);
      }
      //donne.push(data[0]);

    })*/
  }
  recup_recopier(donne:any){
    return this.http.get<any>('http://92.154.61.105:8080/~nacer/vue_recopier.php');/*.subscribe(data =>{
      console.log(data);
      for(var i = 0;data[i]!= null;i++){
        donne.push(data[i]);
      }
      //donne.push(data[0]);

    })*/
  }
  recup_memory(donne:any){
    return this.http.get<any>('http://92.154.61.105:8080/~nacer/vue_memory.php');/*.subscribe(data =>{
      console.log(data);
      for(var i = 0;data[i]!= null;i++){
        donne.push(data[i]);
      }
      //donne.push(data[0]);

    })*/
  }
  recup_abcd(donne:any){
    return this.http.get<any>('http://92.154.61.105:8080/~nacer/vue_abcd.php');/*.subscribe(data =>{
      console.log(data);
      for(var i = 0;data[i]!= null;i++){
        donne.push(data[i]);
      }
      //donne.push(data[0]);

    })*/
  }
  recup_bg(donne:any){
    return this.http.get<any>('http://92.154.61.105:8080/~nacer/vue_bg.php');/*.subscribe(data =>{
      console.log(data);
      for(var i = 0;data[i]!= null;i++){
        donne.push(data[i]);
      }
      //donne.push(data[0]);

    })*/
  }
  recup_puzzle(donne:any){
    return this.http.get<any>('http://92.154.61.105:8080/~nacer/vue_puzzle.php');/*.subscribe(data =>{
      console.log(data);
      for(var i = 0;data[i]!= null;i++){
        donne.push(data[i]);
      }
      //donne.push(data[0]);

    })*/
  }
  /*getImage(): Observable<Blob> {
    return this.http.get( 'http://localhost:4000/vue_image.php', { responseType: 'blob' });
 }*/
 recup_image(donne:any){
  return this.http.get<any>('http://92.154.61.105:8080/~nacer/vue_image.php');/*.subscribe(data =>{
    console.log(data);
    for(var i = 0;data[i]!= null;i++){
      donne.push(data[i]);
    }
    //donne.push(data[0]);

  })*/
}
recup_image_id(donne:any){
  return this.http.get<any>('http://92.154.61.105:8080/~nacer/vue_id_image.php');/*.subscribe(data =>{
    console.log(data);
    for(var i = 0;data[i]!= null;i++){
      donne.push(data[i]);
    }
    //donne.push(data[0]);

  })*/
}
recup_session(donne:any){
  return this.http.get<any>('http://92.154.61.105:8080/~nacer/vue_session.php');/*.subscribe(data =>{
    console.log(data);
    for(var i = 0;data[i]!= null;i++){
      donne.push(data[i]);
    }
    //donne.push(data[0]);

  })*/
}
recup_theme(donne:any){
  return this.http.get<any>('http://92.154.61.105:8080/~nacer/vue_theme.php');/*.subscribe(data =>{
    console.log(data);
    for(var i = 0;data[i]!= null;i++){
      donne.push(data[i]);
    }
    //donne.push(data[0]);

  })*/
}
}
