import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  constructor(private http:HttpClient) { }
  onSendReco(formData:any):Observable<any>{
    return this.http.post<any>('http://',formData);
  }
}
