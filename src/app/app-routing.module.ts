import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecopierGameComponent} from './recopier-game/recopier-game.component';
import {AppComponent} from './app.component'
import {RouterModule,Routes} from '@angular/router';
import { ReconnaitreComponent } from './reconnaitre/reconnaitre.component';
import { IndexComponent } from './index/index.component';
import {BoyGirlGameComponent} from './boy-girl-game/boy-girl-game.component'
import { PuzzleComponent } from './puzzle/puzzle.component';

import { AbecedaireComponent } from './abecedaire/abecedaire.component';
import { MemoryComponent } from './memory/memory.component';
import { PanelComponent } from './panel/panel.component';
import { SessionsComponent } from './sessions/sessions.component';


const routes: Routes = [
  {path : '' ,component: IndexComponent},
  {path : 'recopier', component : RecopierGameComponent},
  { path: 'reconnaitre', component : ReconnaitreComponent},
  { path: 'boygirl', component : BoyGirlGameComponent},
  { path: 'puzzle', component: PuzzleComponent},
  {path: 'abecedaire', component : AbecedaireComponent},
  {path: 'memory', component : MemoryComponent},
  {path: 'panel', component : PanelComponent},
  {path: 'panel/:param1', component : PanelComponent},
  {path: 'panel/:param1/:param2', component : PanelComponent},
  {path: 'panel/:param1/:param2/:param3', component : PanelComponent},
  {path : 'session', component : SessionsComponent},
  {path : 'session/:id', component : SessionsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
