import {
    DndContext,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {arrayMove, SortableContext} from "@dnd-kit/sortable";

import {useState} from "react";
import {createPortal} from "react-dom";

import {useAppDispatch, useAppSelector} from "../hook.ts";
import {changeColumn, reorderIssues} from "../store/issueSlice.ts";

import ColumnContainer from "./ColumnContainer.tsx";
import IssueCard from "./IssueCard.tsx";
import {Column, Issue} from "../../types.ts";


const cols: Column[] = [
    {
        id: "TODO",
        title: "ToDo",
    },
    {
        id: "IN_PROGRESS",
        title: "In Progress",
    },
    {
        id: "DONE",
        title: "Done",
    },
];

const KanbanBoard = () => {

    const columnsId = cols.map((col) => col.id);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

    const dispatch = useAppDispatch();
    const issues = useAppSelector(state => state.issues.currentIssues.mappedIssues);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    )

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Issue") {
            setActiveIssue(event.active.data.current.issue);
            return;
        }
    }

    function onDragOver(event: DragOverEvent) {
        const {active, over} = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAIssue = active.data.current?.type === "Issue";
        const isOverAIssue = over.data.current?.type === "Issue";

        if (!isActiveAIssue) return;

        if (isActiveAIssue && isOverAIssue) {
            const activeIndex = issues.findIndex((issue) => issue.id === +activeId);
            const overIndex = issues.findIndex((issue) => issue.id === +overId);

            if (issues[activeIndex].columnId != issues[overIndex].columnId) {
                dispatch(changeColumn({issueId: activeIndex, columnId: issues[overIndex].columnId as string}))
                return arrayMove(issues, activeIndex, overIndex - 1);
            }

            dispatch(reorderIssues(arrayMove(issues, activeIndex, overIndex)))
        }

        const isOverAColumn = over.data.current?.type === "Column";

        if (isActiveAIssue && isOverAColumn) {
            const activeIndex = issues.findIndex((issue) => issue.id === +activeId);
            dispatch(changeColumn({issueId: activeIndex, columnId: overId as string}))
        }
    }

    return (
        <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
        >
            <div className="flex gap-4 min-w-full min-h-screen">
                <SortableContext items={columnsId}>
                    {cols.map((col) => (
                        <ColumnContainer
                            key={col.id}
                            column={col}
                            issues={issues.filter((issue) => issue.columnId === col.id)}
                        />
                    ))}
                </SortableContext>
            </div>

            {createPortal(
                <DragOverlay>
                    {activeColumn && (
                        <ColumnContainer
                            column={activeColumn}
                            issues={issues.filter(
                                (issue) => issue.columnId === activeColumn.id
                            )}
                        />
                    )}
                    {activeIssue && (
                        <IssueCard
                            issue={activeIssue}
                        />
                    )}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    )
}

export default KanbanBoard;