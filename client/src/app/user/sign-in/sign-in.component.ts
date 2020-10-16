import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    public userService: UserService, 
    private router: Router) { }

  model = {
    username: '',
    password: ''
  };

  serverErrorMessages: string;
  

  ngOnInit(): void {
    if(this.userService.isLoggedIn())
      this.router.navigateByUrl('/incidences');
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      response => {
        this.userService.setToken(response['token']);
        this.router.navigateByUrl('/incidences');
      },
      err => {
        if(err.status == 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
          this.serverErrorMessages = 'Ooops...Something went wrong.'
        }
      }
    );
  }

}
