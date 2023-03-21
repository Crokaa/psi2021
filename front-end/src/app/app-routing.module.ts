import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RegistoComponent } from './registo/registo.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { FotosRecentesComponent } from './fotos-recentes/fotos-recentes.component';
import { FotoDetailsComponent } from './foto-details/foto-details.component';
import { ProfileComponent } from './profile/profile.component';
import { MultipleUploadComponent } from './multiple-upload/multiple-upload.component';
import { ChooseUploadComponent } from './choose-upload/choose-upload.component';
import {FotosFavoritasComponent } from './fotos-favoritas/fotos-favoritas.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'registo', component: RegistoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'upload', component: ChooseUploadComponent },
  { path : 'feed', component: FotosRecentesComponent },
  { path: 'foto/:id', component: FotoDetailsComponent },
  { path: 'singleUpload', component: UploadComponent },
  { path: 'multipleUpload', component: MultipleUploadComponent },
  { path: 'favoritas', component: FotosFavoritasComponent },
];


@NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
