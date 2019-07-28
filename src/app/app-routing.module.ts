import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GalleryComponent} from './gallery/gallery.component';
import {NavbarComponent} from './navbar/navbar.component';

const routes: Routes = [
  {path: '', component: NavbarComponent},
  {path: ':photo', component: GalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
