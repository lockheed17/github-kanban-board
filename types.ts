export type Issue = {
    id: number;
    title: string;
    number: number;
    comments: number;
    created_at: string;
    user: {type: string};
    state: string;
    assignee: string | null;
}

export type ExtendedIssue = Issue & {
    columnId: string | number | null;
}


export type Column = {
    id: string;
    title: string;
}