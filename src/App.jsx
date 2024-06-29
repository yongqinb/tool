import { useState } from 'react'
import { Modal } from 'antd'
import Douyin from './douyin/douyin'
import Operation from './operation/operation'
import FileImg from './FileImg/FileImg'
import Screen from './screen/screen'
import {
  HeartIcon,
  OperationIcon,
  FileImgIcon,
  FallpingmuImg
} from './img/index'
import './css/App.css'

function App() {
  // 抖音弹出框状态
  const [isModalDouyin, setIsModalDouyin] = useState(false);
  const [listIndex, setListIndex] = useState(0);
  const list = [
    { title: "抖音操作", const: <Douyin /> },
    { title: "系统操作", const: <Operation /> },
    { title: "文件夹", const: <FileImg /> },
    { title: "屏幕", const: <FileImg /> }
  ]

  const gaiModal = (id) => {
    setListIndex(id)
    setIsModalDouyin(true)
  }

  return (
    <>
      <Modal
        title={list[listIndex].title}
        open={isModalDouyin}
        onCancel={() => setIsModalDouyin(false)}
        footer={null}
        destroyOnClose
        maskClosable={false}
      >
        {
          list[listIndex].const
        }
      </Modal>
      <div className='appBody'>
        <HeartIcon onClick={() => gaiModal(0)} className="appIcon" />
        <OperationIcon onClick={() => gaiModal(1)} className="appIcon" />
        <FileImgIcon onClick={() => gaiModal(2)} className="appIcon" />
        <FallpingmuImg onClick={() => gaiModal(3)} className="appIcon" />
      </div>
    </>
  )
}

export default App
