export interface User {
    id: number;
    username: string;
    nom: string;
    prenom: string;
    role: UserRole;
    active: boolean;
    password: string;
    isAdmin?: boolean
}

export interface UserRole {
    id: number;
    role: string;
}