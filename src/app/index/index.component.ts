import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionsComponent } from '../sessions/sessions.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router, public login: MatDialog) {
  }

  ngOnInit(): void {
  }

  form(): void {
    if(localStorage.getItem("connect") == "true") {
      this.router.navigate(['panel']);
    }
    else {
      this.login.open(LoginComponent, {
        width: '30%'
      });
    }
  }

  redirect(): void {
    this.router.navigate(['panel']);
  }

  connect(id: string): void {
    if (id != "") {
      window.location.href = '/session/' + id
    }
  }

  connectKey($event: KeyboardEvent): void {
    if ($event.key == 'Enter') {
      this.connect((<HTMLInputElement>$event.target)!.value);
    }
  }

}
