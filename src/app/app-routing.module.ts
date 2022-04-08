import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecopierGameComponent} from './recopier-game/recopier-game.component';
import {AppComponent} from './app.component'
import {RouterModule,Routes} from '@angular/router';
import { ReconnaitreComponent } from './reconnaitre/reconnaitre.component';
import { IndexComponent } from './index/index.component';
import {BoyGirlGameComponent} from './boy-girl-game/boy-girl-game.component'


const routes: Routes = [
  {path : '' ,component: IndexComponent},
  {path : 'recopier', component : RecopierGameComponent},
  { path: 'reconnaitre', component : ReconnaitreComponent},
  { path: 'boygirl', component : BoyGirlGameComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
