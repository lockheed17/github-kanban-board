import {test, expect, describe} from 'vitest';
import {parseGithubApiUrl} from "../../src/utils/parseGithubApiUrl";

describe('parseGithubApiUrl function', () => {
    test('returns correct data for a valid GitHub API URL', () => {
        const url = 'https://api.github.com/repos/facebook/react';
        const { userName, userUrl, repoName, repoUrl } = parseGithubApiUrl(url);

        expect(userName).toBe('facebook');
        expect(userUrl).toBe('https://github.com/facebook/');
        expect(repoName).toBe('react');
        expect(repoUrl).toBe('https://github.com/facebook/react/');
    });

    test('returns correct data for a GitHub API URL with a trailing slash', () => {
        const url = 'https://api.github.com/repos/facebook/react/';
        const { userName, userUrl, repoName, repoUrl } = parseGithubApiUrl(url);

        expect(userName).toBe('facebook');
        expect(userUrl).toBe('https://github.com/facebook/');
        expect(repoName).toBe('react');
        expect(repoUrl).toBe('https://github.com/facebook/react/');
    });

    test('returns correct data for a GitHub API URL with a different casing', () => {
        const url = 'https://api.github.com/repos/FACEBOOK/REACT';
        const { userName, userUrl, repoName, repoUrl } = parseGithubApiUrl(url);

        expect(userName).toBe('FACEBOOK');
        expect(userUrl).toBe('https://github.com/FACEBOOK/');
        expect(repoName).toBe('REACT');
        expect(repoUrl).toBe('https://github.com/FACEBOOK/REACT/');
    });
});
