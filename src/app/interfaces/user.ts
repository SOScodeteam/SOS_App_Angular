export interface Roles { 
    admin?: boolean;
    instructor?: boolean;
    sos?: boolean;
    student?: boolean;
 }
  
export interface User {
    uid: string,
    email: string,
    displayName: string,
    photoUrl: string,
    isAnonymous: boolean,
    roles: Roles;
}