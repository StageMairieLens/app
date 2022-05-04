import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Login } from './Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inscript = false;
  oublie = false;

  constructor( public dialogRef: MatDialogRef<LoginComponent>, private router: Router) {}

  ngOnInit(): void {
  }

  login(email: string, mdp: string): void {
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
