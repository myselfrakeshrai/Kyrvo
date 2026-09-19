export interface User {
    Id?: string;
    Email?: string;
    FirstName?: string;
    LastName?: string;
    PhoneNumber?: string;
    Pwd?: string;
    RoleId?:string;
    IsNew?: number;
    IsVerified?: number;
    VerificationToken?: string;
    CreatedOn?: number;
    UpdatedOn?: number;
    Confirm?:string;
}
