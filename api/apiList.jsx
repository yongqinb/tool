import api from './elertionAxios'

// 控制抖音
export const DouYinApi = (cmdCode) => {
    return api.post("/process", {cmdCode})
}

// 控制粘贴板
export const pdcopy = (cmdCode) => {
    return api.post("/pdcopy", {cmdCode})
}

// 获取静态资源目录
export const StaticFolder = (cmdCode) => {
    return api.post("/StaticFolder", {cmdCode})
}

// 启动定时器
export const stateTime = (time) => {
    return api.post("/timing", {time})
}

// 清理视频图片缓存
export const deleteFolder = (time) => {
    return api.post("/deleteFolder", {time})
}
