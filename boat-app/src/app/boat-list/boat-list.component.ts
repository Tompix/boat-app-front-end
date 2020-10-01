import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { BoatService } from '../service/boat.service';
import { Boat } from '../model/boat';

@Component({
  selector: 'boat-list',
  styleUrls: ['./boat-list.component.css'],
  templateUrl: './boat-list.component.html',
})
export class BoatListComponent {
  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource: MatTableDataSource<Boat>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private boatService: BoatService, private _router: Router, private loginService: LoginService) {
      boatService.getBoatList().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     });
   }

  public createBoat() {
    this._router.navigateByUrl('/boat/0');
  }

  public updateBoat(item) {
    this._router.navigateByUrl('/boat/'+item.id);
  }
}
