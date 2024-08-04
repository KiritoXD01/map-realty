import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Project } from "@/types/types";
import {
    Timeline,
    TimelineEffect,
    TimelineRow,
} from "@xzdarcy/react-timeline-editor";
import { useState } from "react";
import camelcaseKeys from 'camelcase-keys';
import { v4 as uuidv4 } from 'uuid';

export default function Edit({
    auth,
    project,
    effects,
}: PageProps<{ project: Project, effects: Record<string, TimelineEffect> }>) {
    const customScale = (scale: number): string => {
        const min = parseInt(scale / 60 + "");
        const second = ((scale % 60) + "").padStart(2, "0");
        return `${min}:${second}`;
    };

    const createAction = (row: TimelineRow, time: number): void => {
        setData((pre) => {
            const rowIndex = pre.findIndex(({ id }) => id === row.id);

            pre[rowIndex] = {
                ...row,
                actions: row.actions.concat({
                    id: uuidv4(),
                    start: time,
                    end: time + 5,
                    effectId: Object.values(effects)[0].id,
                }),
            };

            return [...pre];
        });
    };

    const [data, setData] = useState(project.rows.map((row) => camelcaseKeys(row as unknown as Record<string, unknown>, { deep: true })) as unknown as TimelineRow[]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="timeline-editor-container">
                <Timeline
                    onChange={setData}
                    editorData={data}
                    effects={effects}
                    autoScroll={true}
                    hideCursor={false}
                    scale={10}
                    scaleSplitCount={10}
                    getScaleRender={(scale) => customScale(scale)}
                    onDoubleClickRow={(e, { row, time }) =>
                        createAction(row, time)
                    }
                />
            </div>
        </AuthenticatedLayout>
    );
}
