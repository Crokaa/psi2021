import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegistoComponent } from './registo/registo.component';
import { LoginComponent } from './login/login.component';
import { FotosRecentesComponent } from './fotos-recentes/fotos-recentes.component';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';
import { FotoDetailsComponent } from './foto-details/foto-details.component';
import { ProfileComponent } from './profile/profile.component';
import { NavComponent } from './nav/nav.component';
import { MultipleUploadComponent } from './multiple-upload/multiple-upload.component';
import { ChooseUploadComponent } from './choose-upload/choose-upload.component';
import { FotosFavoritasComponent } from './fotos-favoritas/fotos-favoritas.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistoComponent,
    LoginComponent,
    UploadComponent,
    FotosRecentesComponent,
    FotoDetailsComponent,
    ProfileComponent,
    NavComponent,
    MultipleUploadComponent,
    ChooseUploadComponent,
    FotosFavoritasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
