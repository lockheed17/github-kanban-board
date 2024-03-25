export const parseGithubApiUrl = (url: string) => {
    const urlParts = url.split('/');

    const userName = urlParts[4];
    const repoName = urlParts[5];

    const userUrl = `https://github.com/${userName}/`;
    const repoUrl = `https://github.com/${userName}/${repoName}/`;

    return {userName, userUrl, repoName, repoUrl};
}