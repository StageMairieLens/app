import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Index';

  constructor() {
    // subscribe to authentication state changes
  }

  async ngOnInit() {
    // get authentication state for immediate use
  }

}




