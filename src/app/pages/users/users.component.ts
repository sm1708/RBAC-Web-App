
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `
  <h2>Users</h2>
  <button appHasPermission="add_user">Add User</button>
  <button appHasPermission="edit_user">Edit</button>
  <button appHasPermission="delete_user">Delete</button>
  `
})
export class UsersComponent {}
