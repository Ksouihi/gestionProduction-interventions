export interface Product {
    id: number;
    objective_fpy: number;
    objective_trg: number;
    name_prog: string;
    item_code: string;
    face: string;
    family: Family;
    sub_family: SubFamily;
    cadence: number;
    line: Line;
}

export interface Family {
    id: number;
    name_family: string;
}

export interface SubFamily {
    id: number;
    name_sub_family: string;
    id_family: number;
}

export interface Line {
    id: number;
    name_line: string;
}