// 下载数据流文件
export var downloadFile = (data, fileName = '文件') => {
  const fileReader = new FileReader()
  fileReader.readAsDataURL(data)
  console.log('97897')
  fileReader.onload = e => {
    console.log('23154')
    const a = document.createElement('a')
    a.download = fileName
    a.href = e.target.result
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}

export var reImgUrl = url => {
  if (url.indexOf('http') == -1) {
    return () => Promise.resolve(require(`${url}`).default)
  } else {
    return url
  }
}
