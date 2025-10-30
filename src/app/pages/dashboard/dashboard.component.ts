
import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
  <h2>Dashboard</h2>
  <p>Welcome, {{auth.currentUser.username}} ({{auth.currentUser.role}})</p>
  `
})
export class DashboardComponent {
  constructor(public auth: AuthService) {}
}
