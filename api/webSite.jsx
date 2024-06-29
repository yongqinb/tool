// 请求地址
let webSite;
let wsSite;
    // 网络地址
if (window.location.hostname === "yongqi.loophole.site") {
    webSite = "https://yongqiapi.loophole.site"
    wsSite = "https://yongqiws.loophole.site"
}else{
    // 本地访问
    webSite = `http://${window.location.hostname}:7433`
    wsSite = `ws://${window.location.hostname}:8080`
}

export  {
    webSite,
    wsSite
}