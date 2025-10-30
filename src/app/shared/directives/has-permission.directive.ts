
import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RoleService } from '../../core/services/role.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  @Input('appHasPermission') requiredFeature!: string;

  constructor(
    private el: ElementRef,
    private auth: AuthService,
    private roles: RoleService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const role = this.auth.currentUser?.role;
    const roleData = this.roles.getRoles().find(r => r.name === role);
    if (!roleData?.permissions.features.includes(this.requiredFeature)) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
