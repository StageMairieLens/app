import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecopierGameComponent} from './recopier-game/recopier-game.component';
import {AppComponent} from './app.component'
import {RouterModule,Routes} from '@angular/router';
import { ReconnaitreComponent } from './reconnaitre/reconnaitre.component';
import { IndexComponent } from './index/index.component';
import {BoyGirlGameComponent} from './boy-girl-game/boy-girl-game.component';
import { AbecedaireComponent } from './abecedaire/abecedaire.component';
import { MemoryComponent } from './memory/memory.component';


const routes: Routes = [
  {path : '' ,component: IndexComponent},
  {path : 'recopier', component : RecopierGameComponent},
  { path: 'reconnaitre', component : ReconnaitreComponent},
<<<<<<< HEAD
  { path: 'boygirl', component : BoyGirlGameComponent},
  {path: 'abecedaire', component : AbecedaireComponent},
  {path: 'memory', component : MemoryComponent}
=======
  { path: 'boygirl', component : BoyGirlGameComponent}, 
>>>>>>> 83de06b8a623a617f8c4d75663897f51ea3b4dd4
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
