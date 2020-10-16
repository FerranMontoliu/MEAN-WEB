import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

import { environment } from '../../../environments/environment';
import { Incidence } from './incidence.model';


@Injectable({
  providedIn: 'root'
})
export class IncidenceService {
  selectedIncidence: Incidence = {
    title: '',
    description: '',
    creationDate: '',
    updateDate: '',
    level: '',
    state: ''
  };

  private editingIncidence = new BehaviorSubject<string>("");
  finalIncidence = this.editingIncidence.asObservable();
    
  constructor(private http: HttpClient) { }

  // HTTP METHODS
  getAllIncidences() {
    return this.http.get(`${environment.apiBaseUrl}/incidences`);
  }

  getOwnIncidences() {
    return this.http.get(`${environment.apiBaseUrl}/my-incidences`);
  }

  addIncidence(incidence: Incidence) {
    return this.http.post(`${environment.apiBaseUrl}/add-incidence`, incidence);
  }

  updateIncidence(incidence: Incidence) {
    return this.http.put(`${environment.apiBaseUrl}/edit-incidence`, incidence);
  }

  getIncidenceById(id: string) {
    return this.http.post(`${environment.apiBaseUrl}/get-incidence-by-id`, {'incidenceId': id});
  }


  // AUX METHODS
  onEditIncidence(id: string) {
    this.editingIncidence.next(id);
  }
}
