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
  list: any = { mail: this.mail, pwd: this.pwd, co: this.co };

  constructor(public dialogRef: MatDialogRef<LoginComponent> | null, private router: Router, private jeuxService: JeuxService) { }

  ngOnInit(): void {
  }

  static logins: Login[] = [];

  recup(donne: any) {
    this.jeuxService.recup_user(donne).subscribe(data => {

      for (var i = 0; data[i] != null; i++) {
        //console.log(data);
        //donne.push({id:data[i].id_user,mail:data[i].mail_user,pwd:data[i].password_user,co:data[i].connect});
        donne.push(new Login(data[i].id_user, data[i].mail_user, data[i].password_user, data[i].connect));
        var inn = 0;
        for (var j = 0; LoginComponent.logins[j]; j++) {
          if (data[i].mail_user == LoginComponent.logins[j]) {
            inn = 1;
          }
        }
        if (inn == 0) {
          LoginComponent.logins.push(new Login(data[i].id_user, data[i].mail_user, data[i].password_user, data[i].connect));
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
          console.log(liste[0]);
          for (var i = 0; liste[i]; i++) {
            console.log(liste[i]);
            if (liste[i].email == this.list.mail && liste[i].co == 1) {
              this.login(liste[i].email, liste[i].mdp);
            }
          }
        }, 1000)

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
    console.log(LoginComponent.logins);
    for (var login of LoginComponent.logins) {
      if (login.email == email && login.mdp == mdp) {
        localStorage.setItem("connect", "true");
        localStorage.setItem("user", email);
        this.router.navigate(['panel']);
        this.close();
      }
    }
  }

  enterKey($event: KeyboardEvent, email: string, mdp: string): void {
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



}
