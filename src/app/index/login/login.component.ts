import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Login } from './Login';
import { JeuxService } from '../../jeux.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  inscript = false;
  oublie = false;

  data:any=[];
  mail:any="";
  pwd:any="";
  list: any = {mail:this.mail,pwd:this.pwd };

  constructor( public dialogRef: MatDialogRef<LoginComponent>, private router: Router,private jeuxService: JeuxService) {}
  
  ngOnInit(): void {
  }
  
  onSend(list: any) {

    const formData: FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('user', JSON.stringify(list));
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
  onSend_verify(list: any) {

    const formData: FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('user_verify', JSON.stringify(list));
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
  onSend_delete(id: any) {

    const formData: FormData = new FormData();
    /*for(var i = 0;i<id.lenght;i++){
      formData.append('id[]',id[i]);
    }*/
    formData.append('user_delete', id);
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
  onSend_update(list: any) {

    const formData: FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('user_update', JSON.stringify(list));
    console.log(formData);
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        console.log(res.name);
        
      },

      error: err => {
        console.log(err);
      },

    });
  }

  login(email: string, mdp: string): void {
    console.log(this.list);
    for(var login of LoginComponent.logins) {
      if(login.email == email && login.mdp == mdp) {
        localStorage.setItem("connect", "true");
        this.router.navigate(['panel']);
        this.close();
      }
    }
  }

  enterKey($event: KeyboardEvent, email: string, mdp: string): void {
    if ($event.key == 'Enter') {
      this.login(email, mdp);
    }
  }

  static logout(): void {
    localStorage.removeItem("connect");
  }

  close(): void {
    this.dialogRef.close();
  }

  static logins: Login[] = [
    new Login("root", ""),
  ];

}
