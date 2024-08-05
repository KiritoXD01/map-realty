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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/shadcn/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"
import { Button } from "@/shadcn/ui/button"

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

    const openCreateDialogForm = (row: TimelineRow, time: number): void => {
        setShowCreateDialog(true);
        setCurrentRow(row);
    };

    const createAction = () => {

    }

    const [data, setData] = useState(project.rows.map((row) => camelcaseKeys(row as unknown as Record<string, unknown>, { deep: true })) as unknown as TimelineRow[]);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [currentRow, setCurrentRow] = useState<TimelineRow | null>(null);

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
                        openCreateDialogForm(row, time)
                    }
                />
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Action</DialogTitle>
                    </DialogHeader>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose an Effect" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(effects).map((effect) => (
                                <SelectItem key={effect.id} value={effect.id}>
                                    {effect.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <DialogFooter>
                        <Button type="button">Add to Timeline</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
