import {test, expect, describe} from 'vitest';
import { IssueFromApi } from '../../types.ts';
import { computeColumnId } from '../../src/utils/computeColumnId';

describe('computeColumnId function', () => {
    test('returns DONE for closed issues', () => {
        const issue: IssueFromApi = {
            id: 2204198721,
            repository_url: "In react fiber, is didReceiveUpdate related to dirty checking?",
            title: 'Some title',
            number: 28622,
            comments: 0,
            created_at: '2024-03-24T06:12:01Z',
            user: {type: "User"},
            state: 'closed',
            assignee: null,
        }

        const columnId = computeColumnId(issue);

        expect(columnId).toBe('DONE');
    });

    test('returns IN_PROGRESS for open issues with assignee', () => {
        const issue: IssueFromApi = {
            id: 2204198721,
            repository_url: "In react fiber, is didReceiveUpdate related to dirty checking?",
            title: 'Some title',
            number: 28622,
            comments: 0,
            created_at: '2024-03-24T06:12:01Z',
            user: {type: "User"},
            state: 'open',
            assignee: 'test',
        }

        const columnId = computeColumnId(issue);

        expect(columnId).toBe('IN_PROGRESS');
    });

    test('returns TODO for open issues without assignee', () => {
        const issue: IssueFromApi = {
            id: 2204198721,
            repository_url: "In react fiber, is didReceiveUpdate related to dirty checking?",
            title: 'Some title',
            number: 28622,
            comments: 0,
            created_at: '2024-03-24T06:12:01Z',
            user: {type: "User"},
            state: 'open',
            assignee: null,
        }

        const columnId = computeColumnId(issue);

        expect(columnId).toBe('TODO');
    });
})

