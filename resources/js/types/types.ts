interface Model {
    created_at: string;
    updated_at: string;
}

export interface Project extends Model {
    id: number;
    name: string;
}
