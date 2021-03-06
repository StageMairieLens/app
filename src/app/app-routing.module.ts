import { NgModule } from '@angular/core';
import { RecopierGameComponent } from './recopier-game/recopier-game.component';
import { RouterModule, Routes } from '@angular/router';
import { ReconnaitreComponent } from './reconnaitre/reconnaitre.component';
import { IndexComponent } from './index/index.component';
import { BoyGirlGameComponent } from './boy-girl-game/boy-girl-game.component'
import { PuzzleComponent } from './puzzle/puzzle.component';

import { AbecedaireComponent } from './abecedaire/abecedaire.component';
import { MemoryComponent } from './memory/memory.component';
import { PanelComponent } from './panel/panel.component';
import { SessionsComponent } from './sessions/sessions.component';
import { ImagesComponent } from './images/images.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { ThemeComponent } from './theme/theme.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'recopier', component: RecopierGameComponent },
  { path: 'reconnaitre', component: ReconnaitreComponent },
  { path: 'boygirl', component: BoyGirlGameComponent },
  { path: 'puzzle', component: PuzzleComponent },
  { path: 'abecedaire', component: AbecedaireComponent },
  { path: 'memory', component: MemoryComponent },
  { path: 'panel', component: PanelComponent, canActivate: [AuthGuardComponent] },
  { path: 'panel/:param1', component: PanelComponent, canActivate: [AuthGuardComponent] },
  { path: 'panel/:param1/:param2', component: PanelComponent, canActivate: [AuthGuardComponent] },
  { path: 'panel/:param1/:param2/:param3', component: PanelComponent, canActivate: [AuthGuardComponent] },
  { path: 'session', component: SessionsComponent },
  { path: 'session/:id', component: SessionsComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'theme', component: ThemeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatDialogModule, BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
