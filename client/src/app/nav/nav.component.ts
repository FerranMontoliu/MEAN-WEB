import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.removeToken();
    this.router.navigate(['/signin']);
  }
}
