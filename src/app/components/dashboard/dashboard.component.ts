import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h2>Dashboard</h2>
    <p>Welcome, <strong>{{ auth.currentUser?.username }}</strong></p>
    <p>Your role: <strong>{{ auth.currentUser?.roleName }}</strong></p>
    <div class="form-row">
      <button *hasPermission="'create_user'" (click)="onCreate()">Create Sample User</button>
    </div>
  `
})
export class DashboardComponent {
  constructor(public auth: AuthService) {}
  onCreate() {
    alert('Create action (demo)');
  }
}
