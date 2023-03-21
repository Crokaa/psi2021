import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import {Utilizador} from './utilizador';


@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {

  // parte link bd
  private urlBD = 'bd/utilizador';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

/*  private log(message: string) {
  this.messageService.add(`UtilizadorService: ${message}`);
}*/


/** POST: add a new user to the server */
addUtilizador(user: Utilizador): Observable<Utilizador> {

  return this.http.post<Utilizador>(this.urlBD, user, this.httpOptions);
}

updateUser(user: Utilizador): Observable<any> {
	
	const url = `${this.urlBD}/${user._id}`;
	
	return this.http.put<Utilizador>(url, user, this.httpOptions);
}

getUtilizador(nickname: string): Observable<Utilizador> {

    const url = `${this.urlBD}/${nickname}`;

    return this.http.get<Utilizador>(url);
}



}
