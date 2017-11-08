const defaultOptions = {
  header: {'content-type': 'application/json'},
  datatype: 'json',
  method: 'GET'
}

const wxRequest = (url, data, options = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      header: options.header || defaultOptions.header,
      method: options.method || defaultOptions.method,
      dataType: options.dataType || defaultOptions.datatype,
      success: (res) => {
        resolve(res.data)
      },
      fail: (e) => {
        reject(e)
      }
    })
  })
}

module.exports = {
  wxRequest: wxRequest
}