import axios from "axios";
import {Button, Input, Layout} from 'antd';
import {useState} from "react";

const { Header, Content } = Layout;

function App() {
    const [repoUrl, setRepoUrl] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepoUrl(e.target.value);
    };

    const fetchIssues = async (url: string) => {
        try {
            const response = await axios.get(url);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleLoadIssuesButton = () => {
        const urlParts = repoUrl.split('/');
        const owner = urlParts[3];
        const repo = urlParts[4];

        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;
        fetchIssues(apiUrl);
    }

    // STYLES
    const layoutStyle = {
        borderRadius: 8,
        overflow: 'hidden',
        width: 'calc(100%)',
        maxWidth: 'calc(100%)',
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
                        placeholder="Enter repo URL"
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
                owner repo stars
            </Content>

        </Layout>


    )
}

export default App
