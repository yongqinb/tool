import React, { useState, useEffect } from 'react'
import {
    Row,
    Col,
    Input,
    Empty,
    Upload,
    Breadcrumb,
    Image,
    Modal,
    message,
    Spin
} from 'antd'
import {
    FileImgIcon,
    PauseIcon,
    MusicIcon
} from '../img/index'
import UnknownIcon from '../img/fileimg.png'
import { StaticFolder } from '../../api/apiList'
import VideoPlayer from './VideoPlayer/VideoPlayer'
import MusicPlayer from './MusicPlayer/MusicPlayer'
import TinyBtn from '../tool/index'
import { webSite } from '../../api/webSite'
import './FileImg.scss'

export default function FileImg() {
    // 打开视频音乐弹出框
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMusicOpen, setIsMusicOpen] = useState(false)
    // 视频音乐地址
    const [videoUrl, setVideoUrl] = useState("")
    const [videoImg, setVideoImg] = useState("")
    const [musicUrl, setMusicUrl] = useState("")
    const [musicName, setMusicName] = useState("")
    // 请求状态
    const [loading, setLoading] = useState(false)
    // 上传按钮状态
    const [upBtnState, setUpBtnState] = useState(false)
    // 文件夹列表
    const [file, setFile] = useState([])
    // 导航条
    const [BreadcrumbList, setBreadcrumbList] = useState([])
    // 上传文件地址
    const [fileLocal, setFileLocal] = useState("")
    // 上传文件名字
    const [fileName, setFileName] = useState("")
    const [messageApi, contextHolder] = message.useMessage()
    const { Search } = Input;

    useEffect(() => {
        onSearch('/', "catalogue")
        return () => {
        }
    }, [])

    const handleUpload = async (info) => {
        if (info.file.status === 'done') {
            messageApi.success(`${info.file.name} 上传成功`);
            // 你可以在这里处理文件上传成功后的逻辑，比如更新fileList
            openCatalogue(fileLocal)
            setUpBtnState(false)
        } else if (info.file.status === 'error') {
            messageApi.error(`${info.file.name} 上传失败`);
            setUpBtnState(false)
        }
    };

    const beforeUpload = (file) => {
        setFileName(file.name)
        const isLt2M = file.size / 1024 / 1024 < 1024; // 限制文件大小
        if (!isLt2M) {
            messageApi.error('文件大小不能超过 1G!');
            return false;
        }
        setUpBtnState(true)
        return true;
    };

    const warning = (text) => {
        messageApi.open({
            type: 'warning',
            content: text,
        });
    }

    // 点击面包屑去指定文件夹
    const clickBreadcrumb = (link) => {
        openCatalogue("/" + link)
    }

    // 设置面包屑格式
    const getBreadcrumbList = (str) => {
        let arr = str.split('/');
        arr = arr.filter(item => item !== "")
        let newArr = arr.map((item, index) => {
            let clickArr = arr.slice(0, index + 1)
            let strArr = clickArr.join('/')
            return { title: <a onClick={() => clickBreadcrumb(strArr)}>{item}</a> }
        })
        setFileLocal(str)
        setBreadcrumbList(newArr)
    }

    // 获取文件请求
    const onSearch = async (val, type) => {
        if (!val) {
            return;
        }
        setLoading(true)
        let list = await StaticFolder(val).catch(err => {
            messageApi.error('网速过慢！')
            setLoading(false)
        })
        if (!list) {
            return;
        }
        let { code, fileList } = list.data
        setLoading(false)
        if (code === 200) {
            if (type !== "catalogue") {
                getBreadcrumbList(val)
            }
            // 文件夹为空时
            if (fileList.length === 0) {
                return setFile([{ type: "null", name: "" }])
            }
            // 隐藏隐藏文件
            let filteredArray = fileList.filter(obj => !obj.name.startsWith('.'))
            setFile(filteredArray)
        } else {
            if (type !== "catalogue") {
                warning("没有这样的地址")
            } else {
                warning("网络缓慢")
            }
        }
    }

    // 设置视频地址
    const setVideoLink = (url, img) => {
        setVideoUrl(url)
        setVideoImg(img)
        setIsModalOpen(true)
    }

    // 设置音乐链接
    const setMusicLink = (url, name) => {
        setMusicUrl(url)
        setIsMusicOpen(true)
        setMusicName(name)
    }

    // 点击打开深层文件夹
    const openCatalogue = (loca) => {
        getBreadcrumbList(loca)
        onSearch(loca, "catalogue")
    }

    const setFileConten = ({ type, url, pic, name, loca }) => {
        switch (type) {
            case "catalogue":
                return <div className='fileImageBody'>
                    <FileImgIcon className="fileImg" onClick={() => openCatalogue(loca)} />
                </div>;
            case "image":
                return <div className='fileImageBody image-container'>
                    <Image
                        className='imgImg'
                        src={webSite + url}
                        fallback='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAwRJREFUeF7tm91xwjAMgO3uwSyEUUpXgGfgGVaAjlI6S/YgPQUr56TYsWTHsYN56vXyY32WZP1Fisx+52t9lFKsm0b87r9WR9/lS98HxL7/cqt/QHgpxWG3XXmv3/sBsQGcv+tKNgIgnN5SA0IDz04DCoDABJw0AOxu/7m6B353Eo9zAnC51U0Ij5uExINFWAHAzouHqMSHeO7+Q1QhPG9KIOwArvVRFx7+XpopFBNwUce3d4ImSCoqOwghKheQE1xz980JnEzg1cIhJof/N1Kc5vIL6KQhL2ik2HDWwQIAGRkIn8qJgPkB56gmA0hNeNROTJN329WGYmrLAfDMEiFFnhZAm4/PaPe23TVFrLqzHqbRZA3IEQAWUcBnDde/eAC4+2gaQx+2eABgMqgBEMqDn9Bjh2gAMJqEHTAdny7XcHwA3NMVUwf+KxoADJxgMSZPjYu0XcMFYLovGgAlHKifsZjpck3WAED1rSagzIObfHEKN9E0gBKdca8tABilu6IBVHXLMRK0yVg0YA4NwONOe3dbdfZNspJ3gqZzvlfZ8Wh6pg9gpMOEILiVpuQBUM2Nen0BUOIAeg+zHIMMO8uuJph1IKR3qMcaH4tyglolV6ipsDW04GwdoMUAME2CjRVMFgHAZQxOL3Pr9p09ABfhB62wXlM0awAU4f9BUPlDtgA4wncQVE+QOz4bLBBqjytomRPH6XyE1+0fHSS1Re4NQD+u1IIq1zneUMIjiOgmYBLA5KV7OxZ46Fm1wMjzjGwNgJlB22iKbWChA8ccazGFttE0ABcwVsJ6FbhMJXxUDaD07rT6XzdrPAaOmqDN5gMoC+WeEpR3RDOBqXaQIuyrawuAGCWxZMfkYk2J+Qwl+qq47X7uxpDjAFiEadxkSgGnEB6eyQKgQYBB6XZgeQ7h4QNKeK/PwDQbgJ6NtV+VzPFTX7JQEzB9qd4A5pA75DsLgJA0rY5K1QtUEtXarv7r+ZGI3yZF0QCI0DiguR9BUN4VBYDW/8edNznN56AEnCqRtOAPrPhQbsZGsd0AAAAASUVORK5CYII='
                    />
                </div>;
            case "video":
                return <div className='fileImageBody image-container' onClick={() => setVideoLink(webSite + url, webSite + pic)}>
                    <PauseIcon className="PauseIcon" />
                    <Image
                        className='VideoImg'
                        src={webSite + pic}
                        preview={false}
                        fallback='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA15JREFUeF7tW8tSJCEQhNmL/tIaG443/Sr1q/RmG4b7S3rZYQNmIBiGarJoqh9298XQpqFIMosqKLVa8PPy+fVkzddKPyqtOmPM+8PNtfsb+mi04dza2cm7iSePUeaZA8IiAXj5+NrrnX6jFuX+5gqeF9xwTgx4/fv9pozarxIAivoxGGIMsNSzAz38ue6mYESJ+s4mrbr731d3qH2QBC4Gth73n3keEwiJyR/xAp7Xz2+TbTYiECXdW/vMwdxxF6UIAII8d+sBMD9rgui+1oYyAMR+ezEJITYgC8DVfWx7OwB8r0wnVGIDKb/oQ47XT8crAmA/QIy4iMgq9Jj2IaV7FgNsY4iGuaUcIAtJ3bMB8B8gK5LDgeugIMAbSQ2SQDwpZ9wv/dgXig7dMhGga7a8PElLXoh4j1CUAqIvUkP6bTV5OBDqwwhZLUoW6qDOQ+qd2udS3Ph7rpxK60tKIBw2aH3Lpntp1LHe6yPANmy3P3NR4gUACAXHsr/1ODn2BACqnVtrK6X7S7bmAECtlqXtFek/2kIdAD+Z9hSAXg4aCjpElmH6Tm0OsWoALAv0qrSfkG71ALhIsCbVnV697SzYANgYQJ34tmPZrHtqJgHrUcNMT1le3/0dBxXXt88cbcZoEzSX5dDXY2j/fABO19BugIPq+s7hW0SYpfTX31a5Q5oKUGAASoZQiA+NM2pOfDnAQwDUTt6CMgUAnPwGA2DAEffQXab2+AtlAQYAs+qCswKIs6oBAU3yIABKV0/OEe2OHtl56AbeOQuMP+Iy5t3vCpQTRqWHAeBmdixC8oaJThShRdwmPvvzC5GpH8p1iwPANWoh7TcAhnrphSw0aebGgI0BUtmg3zUOqqOSInckRW2bwPct5CcmgTh8zkVlcXBT877F5EWPxFoCgAY1NaCIMSCNHs98Taa4oe/9MgFQSsWprL97pEra4/fpOYOko5ZjgDuw4ZWu5ygsufqiPsBPpg8EX4NA1fejKW2N9kNOI0mvYNjpSjr87s/1fNaYXFmf/SfIkNkB34pKABh/8iYbAKNIYPJ1pg3YGLBqBmjV6TG2mtkqYO0A2ITMFUmtVQYBgDXKIFSJeX1Kx9yz8gNpnaA1bvWVon6FfrIcemuFY4oOvXOfE9194QaVcf4HoM2eqVsXfVcAAAAASUVORK5CYII='
                    />
                </div>;
            case "file":
                return <div className='fileImageBody'>
                    <a href={webSite + url} target='_blank' download={name}>
                        <img src={UnknownIcon} className='unknownImg' />
                        <div className='UnknownIconText'>{name}</div>
                    </a>
                </div>;
            case "music":
                return <div className='fileImageBody' onClick={() => setMusicLink(webSite + url, name)}>
                    <MusicIcon className='unknownImg' />
                </div>;
            case "null":
                return <div className='nullFlie'>
                    空
                </div>;
            default:
                break;
        }
    }

    return (
        <div id='fileId'>
            {contextHolder}
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                closable={false}
                destroyOnClose
                footer={null}
                getContainer={document.getElementById("fileId")}
                className='MusicOpen'
            >
                <VideoPlayer url={videoUrl} img={videoImg} />
            </Modal>
            <Modal
                open={isMusicOpen}
                onCancel={() => setIsMusicOpen(false)}
                closable={false}
                destroyOnClose
                footer={null}
                getContainer={document.getElementById("fileId")}
                className='MusicOpen'
            >
                <MusicPlayer audioUrl={musicUrl} musicName={musicName} />
            </Modal>
            <Row gutter={24} align="middle">
                <Col span={19}>
                    <Search
                        placeholder="输入文件地址"
                        enterButton="转到"
                        allowClear
                        onSearch={onSearch}
                        loading={loading}
                        size="large" />
                </Col>
                <Col span={5}>
                    <Upload
                        name="file"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleUpload}
                        action={`${webSite}/upload?fileLocal=${fileLocal}&name=${fileName}`}
                    >
                        <TinyBtn
                            title={!upBtnState ? "上传" : " "}
                            disabled={upBtnState | !file.length}
                            loading={upBtnState}
                            color={["#5df559", "#50d74d"]}
                        />
                    </Upload>
                </Col>
            </Row>
            <Spin spinning={loading} size="large">
                {
                    !file.length ? <Empty className='EmptyBody' image={Empty.PRESENTED_IMAGE_SIMPLE} /> : <div className='fileImgBody'>
                        <Breadcrumb
                            items={BreadcrumbList}
                        />
                        <div className='body'>
                            {
                                file.map(item => {
                                    return <div className='fileImage' key={item.name}>
                                        {
                                            setFileConten(item)
                                        }
                                        <div className='fileImageText'>{item.name}</div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                }
            </Spin>
        </div>
    )
}
