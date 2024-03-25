import {test, expect, describe} from 'vitest';
import {formatShortDate} from "../../src/utils/formatShortDate";

describe('formatShortDate function', () => {
    test('returns a formatted date for a valid date string', () => {
        const dateString = '2023-11-16T00:00:00.000Z';
        const formattedDate = formatShortDate(dateString);
        expect(formattedDate).toBe('Nov 16, 2023');
    });
});