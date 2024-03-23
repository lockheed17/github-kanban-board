export function formatShortDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { dateStyle: 'medium' });
}