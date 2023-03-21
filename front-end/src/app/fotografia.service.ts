import { Injectable } from '@angular/core';
import { Fotografia } from './fotografia';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FotografiaService {

  // parte link bd
  private urlBD = 'bd/foto';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getFotosMaisRecentes(): Observable<Fotografia[]> {

    const url = this.urlBD + "/recent";

    return this.http.get<Fotografia[]>(url);
  }

  getFotosMaisGostos(): Observable<Fotografia[]> {

    const url = this.urlBD + "/popular";

    return this.http.get<Fotografia[]>(url);
  }

  getFotosUtilizador(id: String): Observable<Fotografia[]> {

    const url = `${this.urlBD}/user/${id}`;

    return this.http.get<Fotografia[]>(url);
  }

  uploadFoto(foto: Fotografia) {
    const url = this.urlBD;

    return this.http.post(url, foto, this.httpOptions).pipe(
      catchError(this.handleError<any>()));
  }

  likeFoto(foto: Fotografia, user_nick: String): Observable<any> {

    const id = foto._id;

    const url = `${this.urlBD}/like/${id}/add/?user=${user_nick}`;

    return this.http.put<Fotografia>(url, foto, this.httpOptions);
  }

  dislikeFoto(foto: Fotografia, user_nick: String): Observable<any> {

    const id = foto._id;

    const url = `${this.urlBD}/like/${id}/remove/?user=${user_nick}`;

    return this.http.put<Fotografia>(url, foto, this.httpOptions);
  }

  likeStatusFoto(foto: Fotografia, user_nick: String): Observable<any> {

    const id = foto._id;

    const url = `${this.urlBD}/like/${id}/?user=${user_nick}`;

    return this.http.get<Fotografia>(url);
  }

  favoriteFoto(foto: Fotografia, user_nick: String): Observable<any> {

    const id = foto._id;

    const url = `${this.urlBD}/fav/${id}/add/?user=${user_nick}`;

    return this.http.put<Fotografia>(url, foto, this.httpOptions);
  }

  unfavoriteFoto(foto: Fotografia, user_nick: String): Observable<any> {

    const id = foto._id;

    const url = `${this.urlBD}/fav/${id}/remove/?user=${user_nick}`;

    return this.http.put<Fotografia>(url, foto, this.httpOptions);
  }

  favoriteStatusFoto(foto: Fotografia, user_nick: String): Observable<any> {

    const id = foto._id;

    const url = `${this.urlBD}/fav/${id}/?user=${user_nick}`;

    return this.http.get<Fotografia>(url);
  }

  getFoto(id: Fotografia["_id"]): Observable<Fotografia> {

    const url = `${this.urlBD}/show/${id}`;

    return this.http.get<Fotografia>(url);

  }

  getFotosFavoritasUtilizador(id : String): Observable<Fotografia[]> {
	  
    const url = `${this.urlBD}/user/fav/${id}`;

    return this.http.get<Fotografia[]>(url);
  }

  deleteFoto(id: Fotografia["_id"]): Observable<Fotografia> {

    const url = `${this.urlBD}/${id}`;

    return this.http.delete<Fotografia>(url);

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      /* console.log("handling error");
      console.error(error.status); */

      return of(error as T);
    };
  }





}
