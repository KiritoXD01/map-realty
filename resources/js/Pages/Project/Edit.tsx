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
    };

    const [data, setData] = useState(mockData);
    const idRef = useRef(0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {project.name}
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
                    onDoubleClickRow={(e, { row, time }) => {
                        setData((pre) => {
                            const rowIndex = pre.findIndex(
                                (item) => item.id === row.id
                            );

                            const newAction: TimelineAction = {
                                id: `action${idRef.current++}`,
                                start: time,
                                end: time + 0.5,
                                effectId: "effect0",
                            };

                            pre[rowIndex] = {
                                ...row,
                                actions: row.actions.concat(newAction),
                            };

                            return [...pre];
                        });
                    }}
                />
            </div>
        </AuthenticatedLayout>
    );
}
