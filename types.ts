export type IssueFromApi = {
    id: number;
    repository_url: string
    title: string;
    number: number;
    comments: number;
    created_at: string;
    user: {type: string};
    state: string;
    assignee: string | null;
}

export type Issue = {
    id: number;
    title: string;
    number: number;
    comments: number;
    created_at: string;
    user: string;
    state: string;
    assignee: string | null;
    columnId: string | number | null;
}

export type IssueObj = {
    mappedIssues: Issue[];
    repoUrl: string;
}

export type Column = {
    id: string;
    title: string;
}