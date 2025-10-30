import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RoleService } from './services/role.service';

@Directive({ selector: '[hasPermission]' })
export class HasPermissionDirective {
  private hasView = false;
  @Input('hasPermission') feature!: string;

  constructor(private tpl: TemplateRef<any>, private vc: ViewContainerRef, private auth: AuthService, private roleService: RoleService) {}

  ngOnInit() {
    const user = this.auth.currentUser;
    if (!user) { this.vc.clear(); return; }
    const role = this.roleService.getById(user.roleId);
    if (role && role.permissions.features.includes(this.feature)) {
      if (!this.hasView) { this.vc.createEmbeddedView(this.tpl); this.hasView = true; }
    } else {
      this.vc.clear();
      this.hasView = false;
    }
  }
}
