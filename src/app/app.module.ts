import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { RecopierGameComponent } from './recopier-game/recopier-game.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component'; // CLI imports AppRoutingModule

@NgModule({
  declarations: [
    AppComponent,
    RecopierGameComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}

