export const convertUrlToApiUrl = (url: string) => {
    const urlParts = url.split('/');
    const userName = urlParts[3];
    const repoName = urlParts[4];

    return `https://api.github.com/repos/${userName}/${repoName}/issues?per_page=10`;
}