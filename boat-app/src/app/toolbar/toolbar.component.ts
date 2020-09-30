import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  isLoged : boolean;

  constructor(private loginService: LoginService) {
    this.isLoged = sessionStorage.getItem('token') == "" ? false : true;
  }


  logout() {
    this.loginService.logout();
  }
}
