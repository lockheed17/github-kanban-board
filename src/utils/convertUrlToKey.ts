export const convertUrlToKey = (url: string) => {
    return url.split('/').slice(4, 6).join('-');
}