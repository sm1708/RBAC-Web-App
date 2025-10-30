import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { User } from '../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  template: `
    <h2>Users</h2>
    <div class="actions">
      <button *hasPermission="'create_user'" (click)="startAdd()">Add User</button>
    </div>
    <table class="table">
      <thead><tr><th>Username</th><th>Role</th><th>Actions</th></tr></thead>
      <tbody>
        <tr *ngFor="let u of users">
          <td>{{u.username}}</td>
          <td>{{roleMap[u.roleId]}}</td>
          <td>
            <button *hasPermission="'create_user'" (click)="edit(u)">Edit</button>
            <button *hasPermission="'delete_user'" (click)="remove(u.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div *ngIf="editing" class="card">
      <h3>{{ editId ? 'Edit' : 'Add' }} User</h3>
      <div class="form-row"><label>Username</label><input [(ngModel)]="model.username"></div>
      <div class="form-row"><label>Password</label><input [(ngModel)]="model.password"></div>
      <div class="form-row"><label>Role</label>
        <select [(ngModel)]="model.roleId">
          <option *ngFor="let r of roles" [value]="r.id">{{r.name}}</option>
        </select>
      </div>
      <div class="form-row">
        <button (click)="save()">Save</button>
        <button (click)="cancel()">Cancel</button>
      </div>
    </div>
  `
})
export class UsersComponent implements OnInit {
  users: User[] = []; roles: any[] = []; roleMap: any = {};
  editing = false; editId: string | null = null; model: any = { username:'', password:'', roleId:'' };

  constructor(private userService: UserService, private roleService: RoleService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() {
    this.users = this.userService.getAll();
    this.roles = this.roleService.getAll();
    this.roleMap = {}; this.roles.forEach((r:any)=> this.roleMap[r.id]=r.name);
  }

  startAdd() { this.editing = true; this.editId = null; this.model = { username:'', password:'', roleId: this.roles[0]?.id }; }

  edit(u: User) { this.editing = true; this.editId = u.id; this.model = { ...u }; }

  save() {
    if (this.editId) { this.userService.save({ id: this.editId, username: this.model.username, password:this.model.password, roleId:this.model.roleId, roleName: this.roleMap[this.model.roleId] }); }
    else { const id = 'u_' + Date.now(); this.userService.save({ id, username: this.model.username, password:this.model.password, roleId:this.model.roleId, roleName: this.roleMap[this.model.roleId] }); }
    this.cancel(); this.load();
  }

  cancel() { this.editing = false; this.editId = null; }

  remove(id: string) { if (!confirm('Delete user?')) return; this.userService.delete(id); this.load(); }
}
