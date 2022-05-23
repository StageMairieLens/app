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
  co: number = 0;
  data: Login[] = [];
  mail: any = "";
  pwd: any = "";
  pseudo:any="";
  list: any = {table:'user', mail: this.mail, pwd: this.pwd, co: this.co,pseudo:this.pseudo };
  domaineAccept: string[] = ["gmail.com"];

  constructor(public dialogRef: MatDialogRef<LoginComponent> | null, private router: Router, private jeuxService: JeuxService) { }

  ngOnInit(): void {
  }

  static logins: Login[] = [];

  recup(donne: any) {
    this.jeuxService.recup_user(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        
        donne.push(new Login(data[i].id_user, data[i].mail_user, data[i].password_user, data[i].connect,data[i].pseudo));
        var inn = 0;
        for (var j = 0; LoginComponent.logins[j]; j++) {
          if (data[i].mail_user == LoginComponent.logins[j]) {
            inn = 1;
          }
        }
        if (inn == 0) {
          LoginComponent.logins.push(new Login(data[i].id_user, data[i].mail_user, data[i].password_user, data[i].connect,data[i].pseudo));
        }

      }

    })


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
        var liste: Login[] = [];
        this.recup(liste);

        setTimeout(() => {
          
          for (var i = 0; liste[i]; i++) {
            
            if (liste[i].email == this.list.mail && liste[i].co == 1) {
              this.login(liste[i].email, liste[i].mdp);
            }
          }
        }, 1000)

      },

    });
  }
  new_password:any={};
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

  onSend_verify_deco(list: any) {

    const formData: FormData = new FormData();
    /*for(var i = 0;i<list.lenght;i++){
      formData.append('list[]',list[i]);
    }*/
    formData.append('user_verify_deco', list);
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
 

  login(email: string, mdp: string): void {
  
    for (var login of LoginComponent.logins) {
      if (login.email == email && login.mdp == mdp) {
        localStorage.setItem("connect", "true");
        localStorage.setItem("id_user", email);
        localStorage.setItem("id_crea",login.id2.toString());
        localStorage.setItem("id_pseudo",login.pseudo);
        this.router.navigate(['panel']);
        this.close();
      }
    }
  }

  enterKeyLogin($event: KeyboardEvent, email: string, mdp: string): void {
    if ($event.key == 'Enter') {
      this.onSend_verify(this.list)
      this.login(email, mdp);

    }
  }

  static logout(): void {
    localStorage.removeItem("connect");
  }

  close(): void {
    this.dialogRef!.close();
  }

  register(email: string, mdp: string, confMdp: string): void {
    if(mdp === confMdp) this.onSend(this.list);
    setTimeout(()=>{
      this.close();
    },200);
    
  }

}
