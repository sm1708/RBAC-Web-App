import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <div style="max-width:360px;margin:24px auto;">
      <h2>Login</h2>
      <div class="form-row">
        <label>Username</label>
        <input [(ngModel)]="username" placeholder="username">
      </div>
      <div class="form-row">
        <label>Password</label>
        <input type="password" [(ngModel)]="password" placeholder="password">
      </div>
      <div class="form-row">
        <button (click)="doLogin()">Login</button>
      </div>
      <p class="small">Demo: admin/admin123 or user/user123</p>
      <p *ngIf="error" style="color:red">{{ error }}</p>
    </div>
  `
})
export class LoginComponent {
  username = ''; password = ''; error = '';
  constructor(private auth: AuthService, private router: Router) {}
  doLogin() {
    const ok = this.auth.login(this.username, this.password);
    if (!ok) { this.error = 'Invalid credentials'; return; }
    this.router.navigate(['/dashboard']);
  }
}
