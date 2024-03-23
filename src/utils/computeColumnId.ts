import {IssueFromApi} from "../../types.ts";

export const computeColumnId = (issue: IssueFromApi) => {
    if (issue.state === "closed") {
        return "DONE";
    } else if (issue.state === "open" && issue.assignee !== null) {
        return "IN_PROGRESS";
    } else {
        return "TODO";
    }
}