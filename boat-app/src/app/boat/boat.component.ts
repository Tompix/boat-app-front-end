import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BoatService } from '../service/boat.service';
import { LoginService } from '../service/login.service';
import { Boat } from '../model/boat';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.css']
})
export class BoatComponent implements OnInit {
  boat: Boat = {
    id: 0,
    name: '',
    description:''
  }

  id: number;

  constructor(private _router: Router, private route: ActivatedRoute,private location: Location,
    private boatService: BoatService, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getBoat();
  }

  getBoat(): void {
    if (this.id != 0) {
      this.boatService.getBoat(this.id)
      .subscribe(boat => this.boat = boat);
    }
 }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.id == 0) {
      this.boatService.createBoat(this.boat).subscribe(()=>this._router.navigateByUrl('/boats'));
    } else {
      this.boatService.updateBoat(this.boat).subscribe(()=>this._router.navigateByUrl('/boats'));
    }
  }

  delete(): void {
    this.boatService.deleteBoat(this.id).subscribe(()=>this._router.navigateByUrl('/boats'));
  }

  logout() {
    this.loginService.logout();
  }
}
