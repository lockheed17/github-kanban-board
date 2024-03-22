import {Col} from "antd";

type Props = {

}

const columnStyle: React.CSSProperties = {
    border: '1px solid black',
    flex: '1 1 calc((100% / 3) - 2rem)',
}

const ColumnIssue = () => {


    return (
        <Col span={8} style={columnStyle}>

        </Col>
    )
}