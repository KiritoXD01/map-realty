import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Project } from "@/types/types";
import {
    Timeline,
    TimelineAction,
    TimelineEffect,
    TimelineRow,
} from "@xzdarcy/react-timeline-editor";
import { useRef, useState } from "react";

export default function Edit({
    auth,
    project,
}: PageProps<{ project: Project }>) {
    const mockData: TimelineRow[] = [
        {
            id: "0",
            actions: [
                {
                    id: "action00",
                    start: 0,
                    end: 2,
                    effectId: "effect0",
                },
            ],
        },
        {
            id: "1",
            actions: [
                {
                    id: "action10",
                    start: 1.5,
                    end: 5,
                    effectId: "effect1",
                },
            ],
        },
    ];

    const mockEffect: Record<string, TimelineEffect> = {
        effect0: {
            id: "effect0",
            name: "test0",
        },
        effect1: {
            id: "effect1",
            name: "test1",
        },
        effect2: {
            id: "effect2",
            name: "test2",
        },
    };

    const customScale = (scale: number): string => {
        const min = parseInt(scale / 60 + "");
        const second = ((scale % 60) + "").padStart(2, "0");
        return `${min}:${second}`;
    };

    const createAction = (row: TimelineRow, time: number): void => {
        setData((pre) => {
            const rowIndex = pre.findIndex((item) => item.id === row.id);

            const newAction: TimelineAction = {
                id: `action${idRef.current++}`,
                start: time,
                end: time + 1,
                effectId: "effect0",
            };

            pre[rowIndex] = {
                ...row,
                actions: row.actions.concat(newAction),
            };

            return [...pre];
        });
    };

    const [data, setData] = useState(mockData);
    const idRef = useRef(0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Editing: {project.name}
                </h2>
            }
        >
            <div className="timeline-editor-container">
                <Timeline
                    onChange={setData}
                    editorData={data}
                    effects={mockEffect}
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
