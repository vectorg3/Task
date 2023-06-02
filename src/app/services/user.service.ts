import { Injectable } from '@angular/core';
import { IUser } from '../models/USER';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: IUser[] = [];
  addUser(user: IUser) {
    this.users.push(user);
    console.log('Пользователь успешно добавлен в список!');
    console.log(this.users);
  }
  getUser(id: string) {
    return this.users.find(item => item.id == id);
  }
}
