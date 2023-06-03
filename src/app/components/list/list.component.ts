import { Component } from '@angular/core';
import { IUser } from 'src/app/models/USER';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  users: IUser[] = [];
  constructor(private userService: UserService) {}
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
}
