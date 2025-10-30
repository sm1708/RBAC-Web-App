import { Injectable } from '@angular/core';
import { Role } from '../types';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private key = 'rbac_roles';

  constructor() { this.ensureDefaults(); }

  private ensureDefaults() {
    if (!localStorage.getItem(this.key)) {
      const adminId = 'r_admin';
      const managerId = 'r_manager';
      const employeeId = 'r_employee';
      const roles: Role[] = [
        { id: adminId, name: 'Admin', permissions: { pages: ['dashboard','users','roles'], features: ['create_user','delete_user'] } },
        { id: managerId, name: 'Manager', permissions: { pages: ['dashboard','users'], features: ['create_user'] } },
        { id: employeeId, name: 'Employee', permissions: { pages: ['dashboard'], features: [] } }
      ];
      localStorage.setItem(this.key, JSON.stringify(roles));
    }
  }

  getAll(): Role[] { return JSON.parse(localStorage.getItem(this.key) || '[]') as Role[]; }
  getById(id: string) { return this.getAll().find(r => r.id === id); }

  save(role: Role) {
    const list = this.getAll();
    const idx = list.findIndex(r => r.id === role.id);
    if (idx >= 0) list[idx] = role; else list.push(role);
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  delete(id: string) {
    const list = this.getAll().filter(r => r.id !== id);
    localStorage.setItem(this.key, JSON.stringify(list));
  }
}
