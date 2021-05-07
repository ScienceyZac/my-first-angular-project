import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserLogInService } from './user-log-in.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private userService: UserLogInService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let usr;
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    let [accessToken, tokenType] = [
      fragment.get('access_token'),
      fragment.get('token_type'),
    ];
    window.onload = () => {
      if (sessionStorage.getItem('user')) {
        usr = JSON.parse(sessionStorage.getItem('user'));
        console.log(usr, 'user');
      } else {
        if (!accessToken) return;
        fetch('https://discord.com/api/users/@me', {
          headers: {
            authorization: `${tokenType} ${accessToken}`,
          },
        })
          .then((result) => result.json())
          .then((response) => {
            console.log(response);
            usr = response;
            sessionStorage.setItem('user', JSON.stringify(usr));
          })
          .catch(console.error);
        fetch('https://discord.com/api/users/@me/guilds', {
          headers: {
            authorization: `${tokenType} ${accessToken}`,
          },
        })
          .then((result) => result.json())
          .then((response) => {
            console.log(response);
            response.forEach((guild) => {
              guild.iconUrl = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
            });
            usr.guilds = response;
            sessionStorage.setItem('user', JSON.stringify(usr));
          })
          .catch(console.error);
        let notDone = true;
        while (notDone == true) {
          if (usr.guilds.length) {
            notDone = false;
          }
        }
      }
    };

    if ((usr && usr.guilds) || accessToken || sessionStorage.getItem('user'))
      return true;
    else return this.router.parseUrl('/login');
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let usr;
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    let [accessToken, tokenType] = [
      fragment.get('access_token'),
      fragment.get('token_type'),
    ];
    window.onload = () => {
      if (sessionStorage.getItem('user')) {
        usr = JSON.parse(sessionStorage.getItem('user'));
        console.log(usr, 'user');
      } else {
        if (!accessToken) return;
        fetch('https://discord.com/api/users/@me', {
          headers: {
            authorization: `${tokenType} ${accessToken}`,
          },
        })
          .then((result) => result.json())
          .then((response) => {
            console.log(response);
            usr = response;
            sessionStorage.setItem('user', JSON.stringify(usr));
          })
          .catch(console.error);
        fetch('https://discord.com/api/users/@me/guilds', {
          headers: {
            authorization: `${tokenType} ${accessToken}`,
          },
        })
          .then((result) => result.json())
          .then((response) => {
            console.log(response);
            response.forEach((guild) => {
              guild.iconUrl = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
            });
            usr.guilds = response;
            sessionStorage.setItem('user', JSON.stringify(usr));
          })
          .catch(console.error);
        let notDone = true;
        while (notDone == true) {
          if (usr.guilds.length) {
            notDone = false;
          }
        }
      }
    };

    if ((usr && usr.guilds) || accessToken || sessionStorage.getItem('user'))
      return true;
    else return this.router.parseUrl('/login');
  }
}
