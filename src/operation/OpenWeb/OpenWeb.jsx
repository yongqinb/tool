import React, { useState } from 'react'
import { Row, Col, Input, message } from 'antd'
import TinyBtn from '../../tool/index'
import { DouYinApi } from '../../../api/apiList'
import { openUrl } from '../../../cmd/cmd'

const isValidURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol  
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension  
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address  
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path  
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string  
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator  

    return !!pattern.test(str);
}

export default function OpenWeb() {
    const [messageApi, contextHolder] = message.useMessage();
    const [url, setUrl] = useState("")

    const warning = (text) => {
        messageApi.open({
            type: 'warning',
            content: text,
        });
    }

    const openUrlfun = async () => {
        if (!url) {
            return warning("请输入一个网址！");
        }
        if (!isValidURL(url)) {
            return warning("输入的网址格式不正确！");
        }
        let isUrl = await DouYinApi(`${openUrl} ${url}`)
        let { code, msg } = isUrl.data;
        if (code === 404) {
            warning(msg)
        }
    }

    return (
        <Row gutter={24} align="middle">
            {contextHolder}
            <Col span={19}>
                <Input
                    placeholder='输入链接地址'
                    size="large"
                    onChange={(e) => setUrl(e.target.value)}
                    allowClear
                />
            </Col>
            <Col span={5}>
                <TinyBtn title="打开" onClick={openUrlfun} />
            </Col>
        </Row>
    )
}
