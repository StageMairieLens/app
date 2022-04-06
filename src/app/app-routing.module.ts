import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecopierGameComponent} from './recopier-game/recopier-game.component';
import {AppComponent} from './app.component'
import {RouterModule,Routes} from '@angular/router';
import { IndexComponent } from './index/index.component';



const routes: Routes = [
  {path : '' ,component: IndexComponent},
  {path : 'recopier', component : RecopierGameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
