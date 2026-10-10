import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { ForgotPassword } from './features/forgot-password/forgot-password';
import { Profile } from './features/profile/profile';
import { Feed } from './features/feed/feed';
import { Notification } from './features/notification/notification';
import { ChangePassword } from './features/change-password/change-password';
import { NotFound } from './features/not-found/not-found';
import { authGuard } from './core/auth/guards/auth-guard';
import { guestGuard } from './core/auth/guards/guest-guard';
import { Details } from './features/details/details';

export const routes: Routes = [
  {path : '', redirectTo : 'login' , pathMatch : 'full'},
  {
    path: '',
    component: AuthLayout,
    canActivate:[guestGuard],
    children: [
      { path: 'login', component: Login, title : 'Login Page' },
      { path: 'register', component: Register, title : 'Register Page' },
      { path: 'forgetPassword', component: ForgotPassword, title : 'ForegtPassword Page' },
    ],
  },
  {
    path: '',
    component: MainLayout,
    canActivate:[authGuard],
    children: [
      { path: 'profile', component: Profile, title : 'Profile Page' },
      { path: 'feed', component: Feed, title : 'TimeLine Page' },
      { path: 'notification', component: Notification, title : 'Notification Page' },
      { path: 'change-password', component: ChangePassword, title : 'ChangePassword Page' },
      { path: 'details/:id', component: Details, title : 'Details Page' },
    ],
  },
  { path: '**', component: NotFound, title : 'NotFound Page' },
];
