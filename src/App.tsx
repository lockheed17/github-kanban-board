import {Button, Input, Layout} from 'antd';
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "./hook.ts";

import {fetchIssues} from "./store/issueSlice.ts";
import KanbanBoard from "./KanbanBoard.tsx";

const {Header, Content} = Layout;

function App() {
    const [inputRepoUrl, setInputRepoUrl] = useState('');


    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputRepoUrl(e.target.value);
    }

    const handleLoadIssuesButton = () => {
        // Check if inputRepoUrl is valid
        const isValidUrl = !!inputRepoUrl && inputRepoUrl.includes('github.com/');

        if (isValidUrl) {
            const urlParts = inputRepoUrl.split('/');

            const apiRepoUrl = `https://api.github.com/repos/${urlParts[3]}/${urlParts[4]}/issues?per_page=10`;
            // dispatch(fetchIssues(apiRepoUrl));
            dispatch(fetchIssues(apiRepoUrl))
        } else {
            // Handle invalid URL case (e.g., display an error message)
            console.error('Please enter a valid GitHub repository URL.');
        }
    }

    // STYLES
    const layoutStyle = {
        borderRadius: 8,
        padding: '0 0.5rem',
        overflow: 'hidden',
        width: 'calc(100%)',
        maxWidth: 'calc(100%)',
        background: '#fff'
    };

    const headerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0',
        background: '#fff'
    }

    const inputStyle: React.CSSProperties = {
        width: '85%'
    }

    const buttonStyle: React.CSSProperties = {
        width: '15%'
    }

    // const contentStyle: React.CSSProperties = {
    //     textAlign: 'center',
    //     minHeight: 120,
    //     lineHeight: '120px',
    //     color: '#fff',
    //     backgroundColor: '#0958d9',
    // };


    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <Input
                    style={inputStyle}
                    placeholder="Enter repo URL: (https://github.com/facebook/docusaurus)"
                    size="large"
                    onChange={handleChange}
                />
                <Button
                    style={buttonStyle}
                    type="primary"
                    size="large"
                    onClick={handleLoadIssuesButton}
                >
                    Load Issues
                </Button>
            </Header>
            <Content>
                <div>
                    {/*owner repo stars*/}
                    {/*<Link href={`https://github.com/${owner}`} target="_blank" rel="noopener noreferrer">*/}
                    {/*    {owner}*/}
                    {/*</Link>*/}
                    {/*&nbsp;&nbsp;&gt;&nbsp;&nbsp;*/}
                    {/*<Link href={inputRepoUrl} target="_blank" rel="noopener noreferrer">*/}
                    {/*    {repoName}*/}
                    {/*</Link>*/}
                </div>

                <KanbanBoard
                    // issues={currentIssues}
                />
            </Content>
        </Layout>
    )
}

export default App
