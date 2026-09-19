export interface Notification {
    Id: number;
    Type: number;
    TypeId: number;
    RoleId: number;
    Message: string;
    IsProcessed: number;
    ProcessedBy: number;
    CreatedOn: number;
    UpdatedOn: number;
}
