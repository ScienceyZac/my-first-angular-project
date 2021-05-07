import { Component } from '@angular/core';
import { UserLogInService } from 'src/app/user-log-in.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  user;
  constructor(private userService: UserLogInService) {
    this.user = userService.getUser();
  }
}
