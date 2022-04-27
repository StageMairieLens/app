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
    this.login.open(LoginComponent, {
      width: '30%'
    });
  }

  redirect(): void {
    this.router.navigate(['panel']);
  }

  connect(id: string): void {
    if (id != "") {
      let id_connect = +id;
      for (let s of SessionsComponent.data) {
        if (s.id === id_connect) {
          this.router.navigate(['/session/' + s.id]);
        }
      }
    }
  }

  connectKey($event: KeyboardEvent): void {
    if ($event.key == 'Enter') {
      this.connect((<HTMLInputElement>$event.target)!.value);
    }
  }

}
