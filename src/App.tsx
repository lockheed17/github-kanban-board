import {ChangeEvent, useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "./hook.ts";
import {fetchIssues} from "./store/issueSlice.ts";

import KanbanBoard from "./components/KanbanBoard.tsx";
import {convertUrlToApiUrl} from "./utils/convertUrlToApiUrl.ts";
import {parseGithubApiUrl} from "./utils/parseGithubApiUrl.ts";
import toast, {Toaster} from "react-hot-toast";


function App() {
    const [inputRepoUrl, setInputRepoUrl] = useState('');
    const REPO_URL_REGEX = /^(https:\/\/)?(www\.)?github\.com\/[^/]+\/[^/]+$/;

    const currentApiUrl = useAppSelector(state => state.issues.currentIssues.repoUrl);
    const error = useAppSelector(state => state.issues.error);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (error) {
            toast.error('Repository not found.');
        }
    }, [error]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputRepoUrl(e.target.value);
    }

    const handleLoadIssuesButton = () => {
        const isValidUrl = !!inputRepoUrl && REPO_URL_REGEX.test(inputRepoUrl);

        if (isValidUrl) {
            const apiRepoUrl = convertUrlToApiUrl(inputRepoUrl);
            dispatch(fetchIssues(apiRepoUrl))
        } else {
            toast.error('Please enter a valid GitHub repository URL.');
        }
    }

    const {userName, userUrl, repoName, repoUrl} = parseGithubApiUrl(currentApiUrl);

    return (
        <>
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
            <Toaster/>
        </>
    )
}

export default App;
