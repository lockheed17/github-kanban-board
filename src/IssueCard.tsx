// import {useState} from "react";
import {Issue} from "../types";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

interface Props {
    issue: Issue;
}

const IssueCard = ({issue}: Props) => {

    // const [mouseIsOver, setMouseIsOver] = useState(false);
    // const [editMode, setEditMode] = useState(true);

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
        // disabled: editMode, // отключает перемещение
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    // const toggleEditMode = () => {
    //     setEditMode((prev) => !prev);
    //     setMouseIsOver(false);
    // };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
                    opacity-30
                    bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
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
            className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative issue"
        >
            <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
                {issue.title}
            </p>

            <p>
                {issue.number}
                {issue.comments}
            </p>
        </div>
    );

}

export default IssueCard;