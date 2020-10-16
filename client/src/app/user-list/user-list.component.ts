import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { UserService } from '../shared/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users;
  displayedColumns: string[] = ['username', 'email', 'name', 'surname', 'delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      response => {        
        this.users = new MatTableDataSource(Object.keys(response['users']).map(key => {
          return response['users'][key];
        }));

        this.users.sort = this.sort;
        this.users.paginator = this.paginator;
      },
      err => {
        console.log(err);
      }
    );
  }

  onClickDelete(username: string) {
    this.userService.deleteUser(username).subscribe(
      response => {
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }
}
