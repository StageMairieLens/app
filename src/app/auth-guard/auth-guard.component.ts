import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-guard',
  templateUrl: './auth-guard.component.html',
  styleUrls: ['./auth-guard.component.css']
})
@Injectable({ providedIn: 'root' })
export class AuthGuardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  canActivate(): boolean {
    if(localStorage.getItem("connect") == "true") {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

}
