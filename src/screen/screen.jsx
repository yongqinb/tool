import React, { useEffect } from 'react'
import { wsSite } from '../../api/webSite'
import './screen.scss'
let peer = new RTCPeerConnection();
let pcVideo = new MediaStream()

const transformVideo = () => { // 用手机看时全屏显示
    let remoteVideo = document.querySelector('video')
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    if (windowWidth < windowHeight) {
        remoteVideo.style.transform = 'rotate(90deg)'
    }
}

export default function screen() {
    const fillVideo = (event) => {
        if (event.target.requestFullscreen) {
            event.target.requestFullscreen().catch(err => {
                alert(`浏览器不支持全屏显示`);
            });
        } else if (event.target.msRequestFullscreen) { // IE/Edge  
            event.target.msRequestFullscreen().catch(err => {
                alert(`浏览器不支持全屏显示`);
            });
        } else {
            alert('你的浏览器不支持全屏API');
        }
    }

    useEffect(() => {
        window.onload = () => {
            transformVideo()
        }

        const ws = new WebSocket(wsSite);
        peer.ontrack = function (event) {
            pcVideo.addTrack(event.track)
            // 处理接收到的远程媒体流  
            // 将远程视频显示在video元素中  
            let remoteVideo = document.querySelector('video')
            remoteVideo.srcObject = pcVideo;
            remoteVideo.addEventListener('canplay', function() {  
                // 当视频准备好播放时调用
                remoteVideo.play();  
            }, false)
        }

        ws.onopen = function () {  // 网页加载完成去请求获取视频
            ws.send(JSON.stringify({ type: "no", data: '' }))
        }

        ws.onmessage = function incoming(message) {
            let data = JSON.parse(message.data)
            if (data.type === "admin") {
                let offer = data.data;
                peer.setRemoteDescription(offer)
                    .then(() => {
                        // 创建并发送answer  
                        return peer.createAnswer();
                    })
                    .then(answer => {
                        return peer.setLocalDescription(answer).then(() => {
                            ws.send(JSON.stringify({ type: "file", data: answer }))
                        })
                    })
            }
        };
        return () => {
            ws.close();
        }
    }, [])

    return (
        <div className='screen'>
            <video autoPlay muted id='myVideo' onClick={fillVideo}>
            </video>
        </div>
    )
}
