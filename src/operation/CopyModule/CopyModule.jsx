import React from 'react'
import { message } from 'antd'
import TinyBtn from '../../tool/index'
import { pdcopy } from '../../../api/apiList'
import { getCopy } from '../../../cmd/cmd'

export default function CopyModule() {
  const [messageApi, contextHolder] = message.useMessage()
  // 错误提醒
  const warning = (text) => {
    messageApi.open({
      type: 'warning',
      content: text,
    });
  }

  // 成功提示
  const success = (text) => {
    messageApi.open({
      type: 'success',
      content: text,
    })
  }

  // 异步地复制文本到剪贴板  
  async function copyToClipboard(text) {
    let isCp = false;
    try {
      await navigator.clipboard.writeText(text);
      isCp = true;
    } catch (err) {
      isCp = false;
    }
    return isCp;
  }

  // 获取粘贴板内容
  const pasteTextFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      const copyText = await pdcopy(`echo "${text}" | pbcopy`)
      let { status } = copyText;
      if (status = 200) {
        success(`已复制到电脑粘贴板`)
      }
      // 在这里你可以将文本设置到组件的状态或进行其他操作  
    } catch (err) {
      warning('无法从剪贴板粘贴文本,请允许浏览器访问您的粘贴板！')
    }
  };

  // 获取电脑粘贴板内容
  const copyMac = async () => {
    const copyText = await pdcopy(getCopy)
    let { status, data } = copyText;
    if (status = 200) {
      let isCop = await copyToClipboard(data.data?.stdout)
      if (isCop) {
        success(`获取成功：${data.data?.stdout}`)
      } else {
        warning('浏览器禁止复制，请打开浏览器权限')
      }
    }
  }
  return <>
    {contextHolder}
    <TinyBtn
      title="获取电脑粘贴板内容"
      color={['#f09855', '#cb8149']}
      style={{ margin: "0 30px 20px 0" }}
      onClick={() => copyMac()}
    />
    <TinyBtn
      title="复制粘贴板内容到电脑"
      color={['#cb8149', '#a96b3c']}
      onClick={() => pasteTextFromClipboard()}
    />
  </>
}
