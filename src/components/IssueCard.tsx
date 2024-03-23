import {Issue} from "../../types.ts";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

interface Props {
    issue: Issue;
}

const IssueCard = ({issue}: Props) => {

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: issue.id,
        data: {
            type: "Issue",
            issue,
        },
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
                    opacity-30
                     p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-gray-500
                "
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="gap-2 bg-[#fff] items-baseline shadow p-4 h-[120px] min-h-[120px] flex flex-col text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-gray-400 cursor-grab relative issue"
        >
            <p className="min-h-6 w-full font-semibold overflow-hidden text-ellipsis" title={issue.title}>
                {issue.title}
            </p>
            <p>
                #{issue.number} {issue.created_at}
            </p>
            <p>
                {issue.user} | Comments: {issue.comments}
            </p>
        </div>
    );

}

export default IssueCard;