const openDouYin = "open -a /Applications/抖音.app"  // 打开抖音
const pkillDouyin = "pkill -f /Applications/抖音.app" // 关闭抖音
const lianbo = `osascript -e 'tell application "System Events" to keystroke "k"'` // 自动连播
const houtui = `osascript -e 'tell application "System Events" to keystroke "a"'` // 后退
const qianjin = `osascript -e 'tell application "System Events" to keystroke "d"'` // 前进
const shangyige = `osascript -e 'tell application "System Events" to keystroke "w"'` // 上一个
const xiayige = `osascript -e 'tell application "System Events" to keystroke "s"'` // 下一个
const zanting = `osascript -e 'tell application "System Events" to keystroke " "'` // 暂停
const dianzan = `osascript -e 'tell application "System Events" to keystroke "z"'` // 点赞
const quxiaodianzan = `osascript -e 'tell application "System Events" to keystroke "zz"'` // 取消点赞
const pinlui = `osascript -e 'tell application "System Events" to keystroke "x"'` // 评论区
const danmu = `osascript -e 'tell application "System Events" to keystroke "b"'` // 弹幕
const shoucang = `osascript -e 'tell application "System Events" to keystroke "c"'` // 收藏
const fenxiang = `osascript -e 'tell application "System Events" to keystroke "v"'` // 分享口令
const qingping = `osascript -e 'tell application "System Events" to keystroke "j"'` // 清屏
const buganxq = `osascript -e 'tell application "System Events" to keystroke "r"'` // 不感兴趣
const zuozhezy = `osascript -e 'tell application "System Events" to keystroke "f"'` // 作者主页
const quxiaogz = `osascript -e 'tell application "System Events" to keystroke "g"'` // 取消关注
const quanping = `osascript -e 'tell application "System Events" to keystroke "h"'` // 全屏
const tuichuqp = `osascript -e 'tell application "System Events" to key code 53'` // 退出主页
const getCopy = `pbpaste` // 获取电脑粘贴板内容
const openUrl = `open -a "Google Chrome"` // 打开网址
const getVolume = `osascript -e 'output volume of (get volume settings)'` // 获取系统音量
const setVolumeCmd = `osascript -e "set volume output volume ` // 设置系统音量
export {
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
    tuichuqp,
    getCopy,
    openUrl,
    getVolume,
    setVolumeCmd
}