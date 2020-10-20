export interface Roles { 
    admin?: boolean;
    player?: boolean;
    user?: boolean;
    anonymous?: boolean;
 }
  
export interface User {
    uid: string,
    email: string,
    displayName: string,
    photoUrl: string,
    roles: Roles;
}