import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import {Column, Issue} from "../../types.ts";
import {useMemo} from "react";
import IssueCard from "./IssueCard.tsx";

interface Props {
    column: Column;
    issues: Issue[];
}

const ColumnContainer = ({column, issues}: Props) => {

    const issuesIds = useMemo(() => {
        return issues.map((issue) => issue.id.toString());
    }, [issues]);

    const {
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="
              bg-[#e9ecef]
              w-1/3
              rounded-md
              flex
              flex-col
              overflow-y-auto
            "
        >
            <div
                className="
                  bg
                  text-md
                  h-[60px]
                  rounded-md
                  rounded-b-none
                  p-3
                  font-semibold
                  flex
                  items-center
                  justify-between
                "
            >
                <div className="flex gap-2">
                    {column.title}
                </div>
            </div>
            <div className="flex flex-grow flex-col gap-4 p-2 overflow-y-auto h-dvh">
                <SortableContext items={issuesIds}>
                    {issues.map((issue) => (
                        <IssueCard
                            key={issue.id}
                            issue={issue}
                        />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}

export default ColumnContainer;