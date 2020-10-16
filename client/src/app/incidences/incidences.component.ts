import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IncidenceService } from '../shared/incidence/incidence.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-incidences',
  templateUrl: './incidences.component.html',
  styleUrls: ['./incidences.component.css']
})
export class IncidencesComponent implements OnInit {
  incidences;
  displayedColumns: string[] = ['level', 'state', 'title', 'description', 'creationDate', 'updateDate'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private incidenceService: IncidenceService, private router: Router) { }

  ngOnInit(): void {    
    this.incidenceService.getAllIncidences().subscribe(
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
}