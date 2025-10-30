import { Injectable } from '@angular/core';
import { User } from '../types';

@Injectable({ providedIn: 'root' })
export class UserService {
  private key = 'rbac_users';

  constructor() { this.ensureDefaults(); }

  private ensureDefaults() {
    if (!localStorage.getItem(this.key)) {
      const defaultUsers: User[] = [
        { id: 'u_admin', username: 'admin', password: 'admin123', roleId: 'r_admin', roleName: 'Admin' },
        { id: 'u_user', username: 'user', password: 'user123', roleId: 'r_employee', roleName: 'Employee' }
      ];
      localStorage.setItem(this.key, JSON.stringify(defaultUsers));
    }
  }

  getAll(): User[] { return JSON.parse(localStorage.getItem(this.key) || '[]') as User[]; }
  getById(id: string) { return this.getAll().find(u => u.id === id); }
  save(u: User) {
    const list = this.getAll();
    const idx = list.findIndex(x => x.id === u.id);
    if (idx >= 0) list[idx] = u; else list.push(u);
    localStorage.setItem(this.key, JSON.stringify(list));
  }
  delete(id: string) {
    const list = this.getAll().filter(x => x.id !== id);
    localStorage.setItem(this.key, JSON.stringify(list));
  }
}
