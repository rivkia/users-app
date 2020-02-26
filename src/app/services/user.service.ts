import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { map, } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    const usersUrl = this.baseUrl + `/users`;

    return this.httpClient.get<User[]>(usersUrl).pipe(map(users => {
      localStorage.setItem('users', JSON.stringify(users));
      return users;
    }));
  }


  saveUser(user: User): Observable<User[]> {
    const users = JSON.parse(localStorage.getItem('users'));
    const index = users.findIndex((obj => obj.index === user.index));
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
    return of(users);
  }

}
