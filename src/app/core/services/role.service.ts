
import { Injectable } from '@angular/core';

export interface Role {
  name: string;
  permissions: { pages: string[]; features: string[] };
}

@Injectable({ providedIn: 'root' })
export class RoleService {
  roles: Role[] = [
    {
      name: 'Admin',
      permissions: {
        pages: ['dashboard', 'users', 'roles'],
        features: ['add_user', 'edit_user', 'delete_user'],
      },
    },
  ];

  getRoles() { return this.roles; }
  addRole(role: Role) { this.roles.push(role); }
}
