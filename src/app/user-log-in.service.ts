import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserLogInService {
  getUser = () => {
    let user;
    if (sessionStorage.getItem('user')) {
      let sessionUser = sessionStorage.getItem('user');
      if (sessionUser) {
        user = JSON.parse(sessionUser);
        return user;
      }
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
}
