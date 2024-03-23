import {createAsyncThunk, createSlice, PayloadAction, UnknownAction} from "@reduxjs/toolkit";
import axios from "axios";
import {AppDispatch, RootState} from "./index.ts";
import {Issue, IssueFromApi, IssueObj} from "../../types.ts";
import {computeColumnId} from "../utils/computeColumnId.ts";
import {convertUrlToKey} from "../utils/convertUrlToKey.ts";
import {formatShortDate} from "../utils/formatShortDate.ts";

type IssuesState = {
    storedIssues: Record<string, IssueObj>,
    currentIssues: IssueObj,
    loading: boolean;
    error: string | null;
}

function isError(action: UnknownAction) {
    return action.type.endsWith('rejected');
}

export const fetchIssues = createAsyncThunk<
    IssueObj,
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
                const response = await axios.get(url, {
                    headers: {
                        Accept: 'application/vnd.github+json'
                    }
                });

                if (response.status !== 200) {
                    return rejectWithValue('Server Error!');
                } // мб лишнее

                const repoUrl = response.data[0].repository_url;

                const mappedIssues = response.data.map((issue: IssueFromApi) => {
                    const {
                        id,
                        repository_url,
                        title,
                        number,
                        comments,
                        created_at,
                        user: {type},
                        state,
                        assignee
                    } = issue;

                    const columnId = computeColumnId(issue);

                    return {id, repository_url, title, number, comments, created_at: formatShortDate(created_at), user: type, state, assignee, columnId};
                });

                return {repoUrl, mappedIssues};

            } catch (error) {
                console.error('Error fetching issues:', error);
                return rejectWithValue('Error fetching issues');
            }
        }
    }
)

const initialState: IssuesState = {
    storedIssues: {},
    currentIssues: {repoUrl: '', mappedIssues: []},
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

            state.currentIssues.mappedIssues[issueId].columnId = newColumnId;

            // state.storedIssues[state.currentRepoName] = state.currentIssues;
        },
        reorderIssues: (state, action: PayloadAction<Issue[]>) => {
            state.currentIssues.mappedIssues = action.payload;

            // state.storedIssues[state.currentRepoName] = state.currentIssues;
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

                // state.currentRepoName = repoName;

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