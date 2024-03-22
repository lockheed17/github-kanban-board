import { SortableContext, useSortable } from "@dnd-kit/sortable";

import {Column, Issue} from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import IssueCard from "./IssueCard.tsx";
import {ExtendedIssue} from "../types.ts";

interface Props {
    column: Column;
    issues: ExtendedIssue[];
}


const ColumnContainer = ({column, issues}: Props) => {

    const issuesIds = useMemo(() => {
        return issues.map((issue) => issue.id);
    }, [issues]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        // disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
                  bg-columnBackgroundColor
                  opacity-40
                  border-2
                  border-blue-400
                  w-[350px]
                  h-[500px]
                  max-h-[500px]
                  rounded-md
                  flex
                  flex-col
                "
            >
            </div>
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="
              bg-columnBackgroundColor
              w-[350px]
              h-[500px]
              max-h-[500px]
              rounded-md
              flex
              flex-col
            "
        >
            {/* Column title */}
            <div
                {...attributes}
                {...listeners}
                // onClick={() => {
                //     setEditMode(true);
                // }}
                className="
                  bg-mainBackgroundColor
                  text-md
                  h-[60px]
                  cursor-grab
                  rounded-md
                  rounded-b-none
                  p-3
                  font-bold
                  border-columnBackgroundColor
                  border-4
                  flex
                  items-center
                  justify-between
                "
            >
                <div className="flex gap-2">
                    {column.title}
                </div>
            </div>
                {/* Column task container */}
                <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
                    <SortableContext items={issuesIds}>
                        {issues.map((issue) => (
                            <IssueCard
                                key={issue.id}
                                issue={issue}
                            />
                        ))}
                    </SortableContext>
                </div>

            <div>

            </div>
        </div>
    );



}

export default ColumnContainer;