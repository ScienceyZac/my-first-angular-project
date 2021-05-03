import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { FourOFourPageComponent } from './four-o-four-page/four-o-four-page.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  {
    path: 'login',
    component: LogInComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: 'acc',
    redirectTo: '/account',
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    component: FourOFourPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
