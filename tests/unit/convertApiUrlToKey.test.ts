import { describe, test, expect } from 'vitest';
import {convertApiUrlToKey} from "../../src/utils/convertApiUrlToKey";

describe('convertApiUrlToKey function', () => {
    test('returns a key for a valid URL', () => {
        const url = 'https://api.github.com/repos/facebook/react/issues/';
        const key = convertApiUrlToKey(url);
        expect(key).toBe('facebook-react');
    });

    test('returns the key for a URL with additional path parts', () => {
        const url = 'https://api.github.com/repos/facebook/react/issues/test/test/test';
        const key = convertApiUrlToKey(url);
        expect(key).toBe('facebook-react');
    });
});