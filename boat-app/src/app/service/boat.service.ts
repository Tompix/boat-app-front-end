
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Boat } from '../model/boat';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BoatService {
  //TODO url should be configurable
  private boatsUrl = 'http://localhost:8080/boats';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json','Authorization': 'Basic ' + sessionStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient,private _snackBar: MatSnackBar) {}

  getBoat(id: number): Observable<Boat> {
    const url = `${this.boatsUrl}/${id}`;
    return this.http.get<Boat>(url,this.httpOptions).pipe(
      tap(_ => this.log(`fetched boat id=${id}`)),
      catchError(this.handleError<Boat>(`getBoat id=${id}`))
    );
  }

  updateBoat(boat: Boat): Observable<any> {
    const url = `${this.boatsUrl}/${boat.id}`;
    return this.http.put(url, boat, this.httpOptions).pipe(
      tap(_ => this.log(`updated boat id=${boat.id}`)),
      catchError(this.handleError<any>('updateBoat'))
    );
  }

  createBoat(boat: Boat): Observable<Boat> {
    return this.http.post<Boat>(this.boatsUrl, boat, this.httpOptions).pipe(
      tap((newBoat: Boat) => this.log(`added boat`)),
      catchError(this.handleError<Boat>('addBoat'))
    );
  }

  deleteBoat(boat: Boat | number): Observable<any> {
    const id = typeof boat === 'number' ? boat : boat.id;
    const url = `${this.boatsUrl}/${id}`;

    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted boat id=${id}`)),
      catchError(this.handleError<Boat>('deleteBoat'))
    );
  }

  getBoatList(): Observable<any> {
    return this.http.get<Boat[]>(this.boatsUrl,this.httpOptions).pipe(
      tap(_ => this.log(`fetched boat list`)),
      catchError(this.handleError<Boat>('getBoatList'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this._snackBar.open('API error', 'An error occurred while calling the API', {
        duration: 5000,
        verticalPosition: 'top'
      });

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
