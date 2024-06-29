import React, { useState, useEffect } from 'react';
import heng from './back.png'
import shu from './backshu.png'
import './videoplayer.scss'

function VideoPlayer({ url, img }) {
  const [anyway, setAnyway] = useState(false) // 横竖屏切换

  useEffect(() => {
    let video = document.getElementById('myVideo')
    video.addEventListener('loadedmetadata', function () {
      // 获取视频的原始宽度和高度  
      var width = this.videoWidth;
      var height = this.videoHeight;
      if (width > height) {
        setAnyway(false)
      } else {
        setAnyway(true)
      }
    }, false);
    return () => {

    }
  }, [])

  return (
    <div
      className='VideoPlayer'
    >
      <div className={anyway ? 'PlayerBodyShu' : 'PlayerBody'}>
        <img src={anyway ? shu : heng} />
        <div className='PlayerBodyShuBox'>
          <video
            src={url} // 替换为你的视频文件路径或URL  
            autoPlay
            id='myVideo'
            muted // （可选）在某些浏览器中，静音视频可以自动播放而无需用户交互 
            controls // （可选）显示默认的浏览器视频控制条  
            width="100%" // （可选）设置视频宽度
            poster={img}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;