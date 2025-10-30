import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userKey = 'rbac_user';
  private currentUserSub = new BehaviorSubject<User | null>(this.load());

  private load(): User | null {
    const s = localStorage.getItem(this.userKey);
    return s ? JSON.parse(s) as User : null;
  }

  get currentUser() { return this.currentUserSub.value; }
  get currentUserObservable() { return this.currentUserSub.asObservable(); }

  login(username: string, password: string): boolean {
    const usersRaw = localStorage.getItem('rbac_users');
    if (!usersRaw) return false;
    const users = JSON.parse(usersRaw) as User[];
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) return false;
    localStorage.setItem(this.userKey, JSON.stringify(found));
    this.currentUserSub.next(found);
    return true;
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this.currentUserSub.next(null);
  }
}
