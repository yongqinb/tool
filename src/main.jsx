import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import App from './index.jsx'
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(<ConfigProvider locale={zhCN}>
  <Router>
    <App />
  </Router>
</ConfigProvider>)
