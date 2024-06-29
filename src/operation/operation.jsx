import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { deleteFolder } from '../../api/apiList'
import TinyBtn from '../tool/index'
// 粘贴板功能
import CopyModule from './CopyModule/CopyModule'
// 打开指定网址
import OpenWeb from './OpenWeb/OpenWeb'
// 控制音量
import Volume from './volume/volume'
// 定时锁屏
import LockScreen from './lockScreen/lockScreen'
import './operation.scss'

export default function Operation() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalId, setModalId] = useState(0)

  // 清除图片缓存
  const DeleteImgFolder = () => <div>
    <Button
      onClick={() => deleteFolder()
      .then(res => alert(res.msg || "清除成功"))
      .catch(err => alert(err || "没有网络"))
      }>
      清除
    </Button>
  </div>

  const moduleList = [
    { title: "粘贴板", color: ['#55eed3', '#44bda8'], module: <CopyModule /> },
    { title: "电脑打开指定网址", color: ['#e9ed3d', '#c3c631', '#959724'], module: <OpenWeb /> },
    { title: "调整系统音量", color: ["#f153e6", "#d949cf", "#c040b7"], module: <Volume /> },
    { title: "定时锁屏", color: ["#928cf2", "#807bd3", "#6d69b3"], module: <LockScreen /> },
    { title: "清除图片缓存", color: ["#f29ca0", "#ce8487"], module: <DeleteImgFolder /> },
  ]

  const showModal = (id) => {
    setIsModalOpen(true);
    setModalId(id)
  }

  return (
    <div className='operation'>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        closable={false}
        footer={null}
        destroyOnClose
      >
        {moduleList[modalId]?.module}
      </Modal>
      {
        moduleList.map((son, index) => {
          let { title, color } = son;
          return <TinyBtn
            title={title}
            color={color}
            className="TinyBtn"
            key={title}
            onClick={() => { showModal(index) }}
          />
        })
      }
    </div>
  )
}
