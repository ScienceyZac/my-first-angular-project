import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  user;
  filterIt;
  constructor() {
    this.getUser();
  }
  getUser = () => {
    window.onload = () => {
      const fragment = new URLSearchParams(window.location.hash.slice(1));
      const [accessToken, tokenType] = [
        fragment.get('access_token'),
        fragment.get('token_type'),
      ];

      if (!accessToken) {
        return (this.user = 'not-in');
      }

      fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      })
        .then((result) => result.json())
        .then((response) => {
          console.log(response);
          this.user = response;
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
          this.user.guilds = response;
        })
        .catch(console.error);
    };
  };
  featureExpand = (guild) => {
    alert(guild.features.join(', ').replace(/_/g, ' ').toLowerCase());
  };
  filter = () => {
    this.filterIt ? (this.filterIt = false) : (this.filterIt = true);
  };
}
