import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IncidenceService } from '../shared/incidence/incidence.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-incidence',
  templateUrl: './edit-incidence.component.html',
  styleUrls: ['./edit-incidence.component.css']
})
export class EditIncidenceComponent implements OnInit {
  levels: string[] = ['LOW', 'MEDIUM', 'HIGH'];
  states: string[] = ['OPEN', 'CLOSED'];

  showSuccessMessage: boolean;
  serverErrorMessages: string;

  editId: string;

  constructor(public incidenceService: IncidenceService, private router: Router) { }

  ngOnInit(): void {
    this.incidenceService.finalIncidence.subscribe(editId => this.editId = editId);
        
    this.incidenceService.getIncidenceById(this.editId).subscribe(
      response => {
        this.incidenceService.selectedIncidence = response['incidence'];
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit(form: NgForm) {
    this.incidenceService.updateIncidence(this.incidenceService.selectedIncidence).subscribe(
      response => {
        this.router.navigateByUrl('/my-incidences');
      },
      err => {
        this.serverErrorMessages = 'Ooops...Something went wrong.'
      }
    );
  }

}
