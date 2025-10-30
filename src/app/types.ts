export interface RolePermissions { pages: string[]; features: string[]; }
export interface Role { id: string; name: string; permissions: RolePermissions; }
export interface User { id: string; username: string; password: string; roleId: string; roleName?: string; }
