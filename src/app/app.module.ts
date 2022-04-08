import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { RecopierGameComponent } from './recopier-game/recopier-game.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component';
import { ReconnaitreComponent } from './reconnaitre/reconnaitre.component'; // CLI imports AppRoutingModule
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoyGirlGameComponent } from './boy-girl-game/boy-girl-game.component';

@NgModule({
  declarations: [
    AppComponent,
    RecopierGameComponent,
    IndexComponent,
    ReconnaitreComponent,
    BoyGirlGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}

