import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/USER';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Вы уверены?',
      text: 'После удаления пользователь навсегда исчезнет из списка!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Да, удалить!',
      cancelButtonText: 'Нет',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire(
          'Удалено!',
          'Пользователь успешно удалён из списка',
          'success'
        );
        this.userService.removeUser(id);
        this.getUsers();
      }
    });
  }
  openUser(id: string) {
    this.router.navigate([`/form/${id}`]);
  }
}
