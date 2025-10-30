
import { Component } from '@angular/core';
import { RoleService } from '../../core/services/role.service';

@Component({
  selector: 'app-roles',
  template: `
  <h2>Roles</h2>
  <ul>
    <li *ngFor="let r of roles.getRoles()">
      {{r.name}}
    </li>
  </ul>
  `
})
export class RolesComponent {
  constructor(public roles: RoleService) {}
}
