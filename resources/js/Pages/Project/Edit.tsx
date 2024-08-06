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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shadcn/ui/form"
import { Button } from "@/shadcn/ui/button"
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
        setActionData({
            rowId: row.id,
            time,
        });
    };

    const createAction = (data: z.infer<typeof CreateActionSchema>) => {
        const payload = JSON.stringify({
            ...actionData,
            effectId: data.effectId
        });

        window.Echo.connector.pusher.send_event('SendMessage', payload, 'channel.name')

        setActionData({
            rowId: "",
            time: 0,
        });

        setShowCreateDialog(false);
    };

    const CreateActionSchema = z.object({
        effectId: z.string({
            required_error: "An effect is required",
        }).uuid(),
    });

    const createActionForm = useForm<z.infer<typeof CreateActionSchema>>({
        resolver: zodResolver(CreateActionSchema),
    });

    const [data, setData] = useState(project.rows.map((row) => camelcaseKeys(row as unknown as Record<string, unknown>, { deep: true })) as unknown as TimelineRow[]);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [actionData, setActionData] = useState({
        rowId: "",
        time: 0,
    });

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
                    <Form {...createActionForm}>
                        <form onSubmit={createActionForm.handleSubmit(createAction)}>
                            <FormField control={createActionForm.control} name="effectId" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Choose an Effect</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an Effect" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(effects).map((effect) => (
                                                <SelectItem key={effect.id} value={effect.id}>
                                                    {effect.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit">Add to Timeline</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
