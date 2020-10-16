import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IncidenceService } from '../shared/incidence/incidence.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-incidences',
  templateUrl: './my-incidences.component.html',
  styleUrls: ['./my-incidences.component.css']
})
export class MyIncidencesComponent implements OnInit {
  incidences;
  displayedColumns: string[] = ['level', 'state', 'title', 'description', 'creationDate', 'updateDate', 'edit'];

  editId: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private incidenceService: IncidenceService, private router: Router) { }

  ngOnInit(): void {
    this.incidenceService.finalIncidence.subscribe(editId => this.editId = editId);

    this.incidenceService.getOwnIncidences().subscribe(
      response => {        
        this.incidences = new MatTableDataSource(Object.keys(response['incidences']).map(key => {
          return response['incidences'][key];
        }));

        this.incidences.sort = this.sort;
        this.incidences.paginator = this.paginator;
      },
      err => {
        console.log(err);
      }
    );
  }

  onClickEdit(id: string) {
    this.incidenceService.onEditIncidence(id);
    this.router.navigateByUrl('/edit-incidence');
  }

}
