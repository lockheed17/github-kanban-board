import {createAsyncThunk, createSlice, PayloadAction, UnknownAction} from "@reduxjs/toolkit";
import axios from "axios";
import {AppDispatch, RootState} from "./index.ts";
import {ExtendedIssue, Issue} from "../../types.ts";

type IssuesState = {
    storedIssues: Record<string, ExtendedIssue[]>,
    currentIssues: ExtendedIssue[],
    currentUrl: string,
    currentRepoName: string,
    loading: boolean;
    error: string | null;
}
const convertUrlToKey = (url: string) => {
    const repoParts = url.split('/').slice(4, 6);
    return repoParts.join('-');
};

function isError(action: UnknownAction) {
    return action.type.endsWith('rejected');
}
export const fetchIssues = createAsyncThunk<
    ExtendedIssue[],
    string,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    'issues/fetchIssues',
    async function (url, {rejectWithValue, getState}) {
        const state = getState();
        const {storedIssues} = state.issues;

        const repoName = convertUrlToKey(url);

        if (storedIssues[repoName]) {
            return storedIssues[repoName];
        } else {
            try {
                const response = await axios.get(url);

                if (response.status !== 200) {
                    return rejectWithValue('Server Error!');
                }

                return response.data.map((issue: Issue) => {
                    const {
                        id,
                        title,
                        number,
                        comments,
                        created_at,
                        user: {type},
                        state,
                        assignee
                    } = issue;

                    const columnId = computeColumnId(issue);

                    return {id, title, number, comments, created_at, type, state, assignee, columnId};
                });
            } catch (error) {
                console.error('Error fetching issues:', error);
                return rejectWithValue('Error fetching issues');
            }
        }
    }
)

const initialState: IssuesState = {
    storedIssues: {},
    currentIssues: [],
    currentUrl: '',
    currentRepoName: '',
    loading: false,
    error: null,
}


const issueSlice = createSlice({
    name: "issues",
    initialState,
    reducers: {
        changeColumn: (state, action: PayloadAction<{ issueId: number, columnId: string }>) => {
            const newColumnId = action.payload.columnId;
            const issueId = action.payload.issueId;

            state.currentIssues[issueId].columnId = newColumnId;

            state.storedIssues[state.currentRepoName] = state.currentIssues;
        },
        reorderIssues: (state, action: PayloadAction<ExtendedIssue[]>) => {
            state.currentIssues = action.payload;
            state.storedIssues[state.currentRepoName] = state.currentIssues;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIssues.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIssues.fulfilled, (state, action) => {
                state.loading = false;

                const url = action.meta.arg;
                const repoName = convertUrlToKey(url);

                state.currentRepoName = repoName;

                state.storedIssues = {...state.storedIssues, [repoName]: action.payload};
                state.currentIssues = action.payload;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export const {changeColumn, reorderIssues} = issueSlice.actions;

export default issueSlice.reducer;



function computeColumnId(issue: Issue) {
    if (issue.state === "closed") {
        return "DONE";
    } else if (issue.state === "open" && issue.assignee !== null) {
        return "IN_PROGRESS";
    } else {
        return "TODO";
    }
}