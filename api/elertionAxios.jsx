import axios from 'axios'
import { webSite } from './webSite'

const api = axios.create({
    baseURL: webSite,
    timeout: 20000, // 请求超时时间 当请求时间超过20秒还未取得结果时 提示用户请求超时
})

export default api