import {ChangeEvent, useState} from "react";

import {useAppDispatch, useAppSelector} from "./hook.ts";
import {fetchIssues} from "./store/issueSlice.ts";

import KanbanBoard from "./components/KanbanBoard.tsx";


function App() {
    const [inputRepoUrl, setInputRepoUrl] = useState('');

    const currentApiUrl = useAppSelector(state => state.issues.currentIssues.repoUrl);
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputRepoUrl(e.target.value);
    }

    const handleLoadIssuesButton = () => {
        const isValidUrl = !!inputRepoUrl && inputRepoUrl.includes('github.com/');

        if (isValidUrl) {
            const urlParts = inputRepoUrl.split('/');
            const username = urlParts[3];
            const repoName = urlParts[4];

            const apiRepoUrl = `https://api.github.com/repos/${username}/${repoName}/issues?per_page=10`;
            dispatch(fetchIssues(apiRepoUrl))
        } else {
            console.error('Please enter a valid GitHub repository URL.');
        }
    }

    function parseGithubApiUrl(apiUrl: string) {
        const urlParts = apiUrl.split('/');

        const userName = urlParts[4];
        const repoName = urlParts[5];

        const userUrl = `https://github.com/${userName}/`;
        const repoUrl = `https://github.com/${userName}/${repoName}/`;

        return {userName, userUrl, repoName, repoUrl};
    }

    const {userName, userUrl, repoName, repoUrl} = parseGithubApiUrl(currentApiUrl);

    return (
        <div className="p-4 lg:px-5 flex flex-col gap-2 min-h-screen">
            <div className="flex items-center justify-between">
                <div className="flex-1 mr-2">
                    <input
                        type="text"
                        id="link"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter repo URL: (https://github.com/facebook/react)"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                        onClick={handleLoadIssuesButton}
                    >
                        Load Issues
                    </button>
                </div>
            </div>

            <div className="min-h-6">
                {currentApiUrl && (
                    <div className="flex items-center gap-2 text-sky-600">
                        <a href={userUrl} target="_blank" rel="noopener noreferrer">{userName}</a>
                        <span>&gt;</span>
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer">{repoName}</a>
                    </div>
                )}
            </div>

            <div className="min-h-screen">
                <KanbanBoard/>
            </div>

        </div>
    )
}

export default App
