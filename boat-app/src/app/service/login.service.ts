import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private _snackBar: MatSnackBar,private _router: Router,) { }

  login(username,password) {
    let url = 'http://localhost:8080/login';
    this.http.post<Observable<boolean>>(url, {
        userName: username,
        password: password
    }).subscribe(isValid => {
        if (isValid) {
            sessionStorage.setItem('token', btoa(username + ':' + password));
            this._router.navigateByUrl('/boats');
        } else {
             this._snackBar.open('Authentification failed', 'Bad user or password', {
               duration: 5000,
               verticalPosition: 'top'
           });
        }
    });
    }

    logout() {
        sessionStorage.setItem('token', '');
        this._router.navigateByUrl('/login');
    }
}
