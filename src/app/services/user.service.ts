import { Injectable } from '@angular/core';
import { IUser } from '../models/USER';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUser[] = [
    {
      id: '1',
      firstName: 'Богдан',
      secondName: 'Дембицкий',
      username: 'Bogdan',
      password: '392311',
      roles: ['ANT'],
      workBorders: [{ id: '1', name: 'Белгатой' }],
    },
    {
      id: '2',
      firstName: 'Максим',
      secondName: 'Горбунов',
      username: 'Maxim',
      password: '392311',
      roles: ['ANT'],
      workBorders: [{ id: '1', name: 'Белгатой' }],
    },
    {
      id: '3',
      firstName: 'Анна',
      secondName: 'Маркина',
      username: 'Anna',
      password: '392311',
      roles: ['ANT'],
      workBorders: [{ id: '1', name: 'Белгатой' }],
    },
  ];
  addUser(user: IUser) {
    this.users.push(user);
    console.log('Пользователь успешно добавлен в список!');
  }
  getUser(id: string) {
    return this.users.find(item => item.id == id);
  }
  removeUser(id: string) {
    this.users = this.users.filter(item => item.id !== id);
    console.log('Пользователь успешно удалён из списка!');
  }
  editUser(user: IUser) {
    this.users = this.users.map(item => {
      if (item.id == user.id) {
        item = user;
      }
      return item;
    });
    console.log('Пользователь успешно отредактирован!');
  }
}
