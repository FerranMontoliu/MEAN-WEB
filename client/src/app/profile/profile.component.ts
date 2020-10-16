import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      response => {
        this.userDetails = response['user'];
      },
      err => { 
        console.log(err);
      }
    );
  }

  onLogout() {
    this.userService.removeToken();
    this.router.navigate(['/signin']);
  }
}
