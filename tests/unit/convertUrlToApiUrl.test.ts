import {test, expect, describe} from 'vitest';
import {convertUrlToApiUrl} from "../../src/utils/convertUrlToApiUrl";

describe('convertUrlToApiUrl function', () => {
    test('returns a correct API URL for a valid GitHub repository URL', () => {
        const url = 'https://github.com/facebook/react';
        const apiUrl = convertUrlToApiUrl(url);
        expect(apiUrl).toBe('https://api.github.com/repos/facebook/react/issues?per_page=10');
    });

    test('returns a correct API URL for a GitHub repository URL with a trailing slash', () => {
        const url = 'https://github.com/facebook/react/';
        const apiUrl = convertUrlToApiUrl(url);
        expect(apiUrl).toBe('https://api.github.com/repos/facebook/react/issues?per_page=10');
    });

    test('returns a correct API URL for a GitHub repository URL with a different casing', () => {
        const url = 'https://github.com/FACEBOOK/REACT';
        const apiUrl = convertUrlToApiUrl(url);
        expect(apiUrl).toBe('https://api.github.com/repos/FACEBOOK/REACT/issues?per_page=10');
    });
});

