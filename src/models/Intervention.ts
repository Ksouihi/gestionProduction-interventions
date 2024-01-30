import { Line } from "./Product";
import { User } from "./User";

export interface RapportIntervention {
    id: string;
    comment: string;
    date_debut: string;
    date_fin: string;
    user: User;

}

export interface Comment {
    id: string;
    comment: string;
    user: User;
    date: string;
    idIntervention: string;
}

export interface Action {
    id: string;
    action: string;
    user: User;
    idIntervention: string;
}

export interface Intervention {
    id: number;
    type_intervention: TypeIntervention;
    detail_intervention?: string;
    line: Line;
    date_debut: string;
    date_fin?: string;
    is_open: boolean;
    rapportInterventions?: RapportIntervention[];
    user?: User;
}

export interface TypeIntervention {
    id: number;
    name_discontinue: string;
}


