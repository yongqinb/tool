import React, { useState } from 'react'
import { Button, Slider, Spin, Row, Col } from 'antd'
import { stateTime } from '../../../api/apiList'
import './lockScreen.scss'

export default function LockScreen() {
    const [volume, setVolume] = useState(0)
    const [spinning, setSpinning] = useState(false)

    const changeSlider = (e) => {
        setVolume(e)
    }

    const setSlider = () => {
        setSpinning(true)
        stateTime(volume).then(() => {
            setSpinning(false)
        }).catch(() => {
            setSpinning(false)
        })
    }

    return (
        <div className='lockScreen'>
            <Spin spinning={spinning}>
                <Slider
                    value={volume}
                    onChange={changeSlider}
                    max={60}
                    className='volumeSlider'
                />
                <Row>
                    <Col span={18}>
                        <div className='lockScreentext'>电脑将在{volume}分钟之后锁屏</div>
                    </Col>
                    <Col span={6}>
                        <Button onClick={setSlider}>设置</Button>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}
