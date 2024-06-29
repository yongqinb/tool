import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.scss'; // 引入你的CSS样式文件  

const MusicPlayer = ({ audioUrl,musicName }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [volume]);

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const updateDuration = () => {
    setDuration(audioRef.current.duration);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} src={audioUrl} autoPlay={false} />
      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? '暂停' : '播放'}</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <a href={audioUrl} target='_blank'>{musicName}</a>
      <div className="progress-bar">
        <progress
          value={currentTime}
          max={duration}
          className="progress"
        />
        <span className="current-time">{formatTime(currentTime)}</span>
        <span className="duration">{formatTime(duration)}</span>
      </div>
    </div>
  );

  // 辅助函数：格式化时间  
  function formatTime(seconds) {
    const date = new Date(seconds * 1000);
    return date.toISOString().substr(11, 8);
  }
};

export default MusicPlayer;