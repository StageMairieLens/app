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
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { CdkTableModule } from '@angular/cdk/table';
import { UsersComponent } from './users/users.component';
import { SessionsComponent } from './sessions/sessions.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JeuxService } from './jeux.service';
import { LoginComponent } from './index/login/login.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';


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
    ImagesComponent,
    UsersComponent,
    SessionsComponent,
    LoginComponent,
    AuthGuardComponent,
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
    MatDividerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatChipsModule,
    FormsModule,
    MatBadgeModule,
    CdkTableModule,
    MatTooltipModule,
    HttpClientModule,
    NgxDropzoneModule,
    MatCheckboxModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
   
  },
  JeuxService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}

