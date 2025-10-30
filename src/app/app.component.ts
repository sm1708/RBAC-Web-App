import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="container">
      <div class="header">
        <div>
          <a routerLink="/dashboard">Dashboard</a> |
          <a routerLink="/users">Users</a> |
          <a routerLink="/roles">Roles</a>
        </div>
        <div>
          <span *ngIf="auth.currentUser" class="badge">{{ auth.currentUser.username }} ({{ auth.currentUser.roleName }})</span>
          <button *ngIf="auth.currentUser" (click)="logout()">Logout</button>
          <a *ngIf="!auth.currentUser" routerLink="/login">Login</a>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
