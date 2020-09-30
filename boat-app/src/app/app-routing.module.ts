import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoatListComponent } from './boat-list/boat-list.component';
import { BoatComponent } from './boat/boat.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'boats', component: BoatListComponent },
  { path: 'boat/:id', component: BoatComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
