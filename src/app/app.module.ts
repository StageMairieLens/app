import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RecopierGameComponent } from './recopier-game/recopier-game.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component';
import { ReconnaitreComponent } from './reconnaitre/reconnaitre.component'; // CLI imports AppRoutingModule
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoyGirlGameComponent } from './boy-girl-game/boy-girl-game.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { AbecedaireComponent } from './abecedaire/abecedaire.component';
import { MemoryComponent } from './memory/memory.component';
import { PanelComponent } from './panel/panel.component';
import { TileComponent } from './memory/tile/tile.component';
import { ImagesComponent } from './images/images.component';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    AppComponent,
    RecopierGameComponent,
    IndexComponent,
    ReconnaitreComponent,
    BoyGirlGameComponent,
    PuzzleComponent,
    AbecedaireComponent,
    MemoryComponent,
    PanelComponent,
    TileComponent,
    ImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatCardModule,
    MatDividerModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
  }],
  bootstrap: [AppComponent]
})

export class AppModule {

}

