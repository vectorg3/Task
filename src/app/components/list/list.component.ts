import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/USER';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users: IUser[] = [];
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.users = this.userService.users;
  }
  removeUser(id: string) {
    this.userService.removeUser(id);
    this.getUsers();
  }
  openUser(id: string) {
    this.router.navigate([`/form/${id}`]);
  }
}
