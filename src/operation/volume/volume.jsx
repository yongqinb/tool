import React, { useEffect, useState } from 'react'
import { Slider, Spin } from 'antd'
import { DouYinApi } from '../../../api/apiList'
import { getVolume, setVolumeCmd } from '../../../cmd/cmd'
import './volume.scss'

export default function volume() {
    const [volume, setVolume] = useState(0)
    const [spinning, setSpinning] = useState(false)
    useEffect(() => {
        setSpinning(true)
        DouYinApi(getVolume).then((data) => {
            let { stdout } = data.data
            if (stdout) {
                setVolume(Number(stdout))
            }
            setSpinning(false)
        })
    }, [])

    const changeSlider = (e) => {
        setVolume(e)
        setSpinning(true)
        DouYinApi(`${setVolumeCmd}${e}"`).then((data) => {
            let { stdout } = data.data
            if (stdout) {
                setVolume(Number(stdout))
            }
            setSpinning(false)
        })
    }

    return (
        <div className='volume'>
            <Spin spinning={spinning}>
                <Slider
                    value={volume}
                    onChange={changeSlider}
                    className='volumeSlider'
                />
            </Spin>
        </div>
    )
}
