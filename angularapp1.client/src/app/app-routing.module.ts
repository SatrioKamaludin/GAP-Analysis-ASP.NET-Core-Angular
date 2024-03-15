import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersModule } from './players/players.module';


const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes), PlayersModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
