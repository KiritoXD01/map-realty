interface Model {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface Project extends Model {
    uuid: string;
    id: number;
    name: string;
}
