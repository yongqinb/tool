import React, { useState } from 'react';
import { Button, Col, Row, notification, Spin } from 'antd';
import {
  openDouYin,
  pkillDouyin,
  lianbo,
  houtui,
  qianjin,
  shangyige,
  xiayige,
  zanting,
  dianzan,
  quxiaodianzan,
  pinlui,
  danmu,
  shoucang,
  fenxiang,
  qingping,
  buganxq,
  zuozhezy,
  quxiaogz,
  quanping,
  tuichuqp
} from '../../cmd/cmd'
import { DouYinApi } from '../../api/apiList'
import TinyBtn from '../tool/index'
import './douyin.scss'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification();
  // 错误提醒
  const errNotification = () => {
    api.info({
      message: `网络较慢，稍后再试`
    });
  }

  const DyFunCmd = async (cmd) => {
    setLoading(true)
    await DouYinApi(cmd).then(() => {
      setLoading(false)
    }).catch(() => {
      setLoading(false)
      errNotification()
    })
  }

  return (
    <Spin spinning={loading} size="large">
      <div className='douyinbody'>
        {contextHolder}
        <Row gutter={24}>
          <Col span={8}>
            <Button
              block
              type="primary"
              size='large'
              className='leftbtn'
              onClick={() => DyFunCmd(houtui)}
            >
              后退
            </Button>
            <Button
              block
              type="primary"
              size='large'
              className='leftbtn'
              onClick={() => DyFunCmd(qianjin)}
            >
              前进
            </Button>
            <Button
              block
              type="primary"
              size='large'
              className='leftbtn'
              onClick={() => DyFunCmd(shangyige)}
            >
              上一个
            </Button>
            <Button
              block
              type="primary"
              size='large'
              className='leftbtn'
              onClick={() => DyFunCmd(xiayige)}
            >
              下一个
            </Button>
            <Button
              block
              type="primary"
              size='large'
              className='leftbtn'
              onClick={() => DyFunCmd(zanting)}
            >
              暂停继续
            </Button>
          </Col>
          <Col span={16}>
            <TinyBtn title="开抖音" className="tiny" onClick={() => DyFunCmd(openDouYin)} />
            <TinyBtn title="关抖音" className="tiny" onClick={() => DyFunCmd(pkillDouyin)} />
            <TinyBtn title="自动连播" className="tiny" onClick={() => DyFunCmd(lianbo)} />
            <TinyBtn title="点赞" className="tiny" onClick={() => DyFunCmd(dianzan)} />
            <TinyBtn title="取消点赞" className="tiny" onClick={() => DyFunCmd(quxiaodianzan)} />
            <TinyBtn title="评论区" className="tiny" onClick={() => DyFunCmd(pinlui)} />
            <TinyBtn title="弹幕开关" className="tiny" onClick={() => DyFunCmd(danmu)} />
            <TinyBtn title="收藏" className="tiny" onClick={() => DyFunCmd(shoucang)} />
            <TinyBtn title="分享口令" className="tiny" onClick={() => DyFunCmd(fenxiang)} />
            <TinyBtn title="清屏" className="tiny" onClick={() => DyFunCmd(qingping)} />
            <TinyBtn title="不感兴趣" className="tiny" onClick={() => DyFunCmd(buganxq)} />
            <TinyBtn title="作者主页" className="tiny" onClick={() => DyFunCmd(zuozhezy)} />
            <TinyBtn title="关注取消" className="tiny" onClick={() => DyFunCmd(quxiaogz)} />
            <TinyBtn title="全屏" className="tiny" onClick={() => DyFunCmd(quanping)} />
            <TinyBtn title="退出主页" className="tiny" onClick={() => DyFunCmd(tuichuqp)} />
          </Col>
        </Row>
      </div>
    </Spin>
  );
};
export default App;