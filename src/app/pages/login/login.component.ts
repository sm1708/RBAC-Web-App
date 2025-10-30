
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
  <h2>Login</h2>
  <select #role>
    <option>Admin</option>
    <option>Manager</option>
    <option>Employee</option>
  </select>
  <button (click)="login(role.value)">Login</button>
  `
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}
  login(role: string) {
    this.auth.login(role);
    this.router.navigate(['/dashboard']);
  }
}
