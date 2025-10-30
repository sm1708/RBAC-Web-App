import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  template: `
    <h2>Roles</h2>
    <div class="actions">
      <button (click)="startAdd()">Add Role</button>
    </div>
    <table class="table">
      <thead><tr><th>Name</th><th>Pages</th><th>Features</th><th>Actions</th></tr></thead>
      <tbody>
        <tr *ngFor="let r of roles">
          <td>{{r.name}}</td>
          <td>{{r.permissions.pages.join(', ')}}</td>
          <td>{{r.permissions.features.join(', ')}}</td>
          <td><button (click)="startEdit(r)">Edit</button><button (click)="remove(r.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>

    <div *ngIf="editing" class="card">
      <h3>{{ isEdit ? 'Edit' : 'Add' }} Role</h3>
      <div class="form-row"><label>Name</label><input [(ngModel)]="model.name"></div>
      <div class="form-row"><label>Pages (comma separated)</label><input [(ngModel)]="model.pages"></div>
      <div class="form-row"><label>Features (comma separated)</label><input [(ngModel)]="model.features"></div>
      <div class="form-row"><button (click)="save()">Save</button><button (click)="cancel()">Cancel</button></div>
    </div>
  `
})
export class RolesComponent implements OnInit {
  roles: any[] = []; editing=false; isEdit=false; model:any={name:'', pages:'', features:''}; editingId:string|null=null;
  constructor(private roleService: RoleService) {}
  ngOnInit() { this.load(); }
  load(){ this.roles = this.roleService.getAll(); }
  startAdd(){ this.editing=true; this.isEdit=false; this.model={name:'',pages:'',features:''}; }
  startEdit(r:any){ this.editing=true; this.isEdit=true; this.editingId=r.id; this.model={name:r.name,pages:r.permissions.pages.join(','),features:r.permissions.features.join(',')}; }
  save(){ const id = this.editingId ?? ('r_'+Date.now()); const role = { id, name:this.model.name, permissions:{ pages:(this.model.pages||'').split(',').map((s:string)=>s.trim()).filter(Boolean), features:(this.model.features||'').split(',').map((s:string)=>s.trim()).filter(Boolean) } }; this.roleService.save(role); this.cancel(); this.load(); }
  cancel(){ this.editing=false; this.editingId=null; }
  remove(id:string){ if(!confirm('Delete role?')) return; this.roleService.delete(id); this.load(); }
}
