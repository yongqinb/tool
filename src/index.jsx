import React from 'react';  
import { Route, Routes } from 'react-router-dom';  
import AppIndex from './App.jsx';
import VideoMac from './screen/screen.jsx'
  
function App() {  
  return (  
    <div>
      <Routes>  
        <Route exact path="/" element={<AppIndex />} />  
        <Route path="/mac" element={<VideoMac />} />  
        {/* 你可以添加更多的 Route 组件 */}  
      </Routes>  
    </div>  
  );  
}  
  
export default App;