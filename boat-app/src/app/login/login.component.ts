import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from '../service/login.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};

    constructor(private loginService: LoginService) {}

    ngOnInit() {
        sessionStorage.setItem('token', '');
    }

    login() {
      this.loginService.login(this.model.username, this.model.password);
    }
}
