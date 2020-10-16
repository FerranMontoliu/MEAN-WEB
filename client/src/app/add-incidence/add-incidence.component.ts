import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IncidenceService } from '../shared/incidence/incidence.service';


@Component({
  selector: 'app-add-incidence',
  templateUrl: './add-incidence.component.html',
  styleUrls: ['./add-incidence.component.css']
})
export class AddIncidenceComponent implements OnInit {
  levels: string[] = ['LOW', 'MEDIUM', 'HIGH'];

  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(public incidenceService: IncidenceService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.incidenceService.addIncidence(form.value).subscribe(
      response => {
        this.showSuccessMessage = true;
        this.resetForm(form);
        setTimeout(() => this.showSuccessMessage = false, 5000);
      },
      err => {
        this.serverErrorMessages = 'Ooops...Something went wrong.'
      }
    );
  }

  resetForm(form: NgForm) {
    this.incidenceService.selectedIncidence = {
      title: '',
      description: '',
      creationDate: '',
      updateDate: '',
      level: '',
      state: ''
    };

    form.resetForm();
    this.serverErrorMessages = '';
  }
}
