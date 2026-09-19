
export interface Permission {
    Id?:string;
    RoleId: string;
    FeatureId: string;
    PermissionLevel: number;
    CreatedOn?: number;
    UpdatedOn?: number;
}