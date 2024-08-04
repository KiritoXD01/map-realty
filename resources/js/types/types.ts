import { TimelineRow } from "@xzdarcy/react-timeline-editor";

interface Model {
    id: number | string;
    uuid?: string;
    created_at: string;
    updated_at: string;
}

export interface Project extends Model {
    name: string;
    rows: TimelineRow[]
}
