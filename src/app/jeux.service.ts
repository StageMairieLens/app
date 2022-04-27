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
}
