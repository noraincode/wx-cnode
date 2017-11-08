//index.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js')
const rp = require('../../utils/wx-request-promise.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    open: false,
    articleList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },
  onLoad: function () {
    const url = `${app.globalData.baseUrl}/topics`
    const rq_data = {
      page: 1,
      tab: 'all',
      limit: 10,
      mdrender: false
    }
    const options = {
      method: 'GET'
    }
    rp.wxRequest(`${app.globalData.baseUrl}/topics`, rq_data, options)
      .then((res) => {
        let dealList = []
        for (let item of res.data) {
          let tmp = item
          tmp.create_at = util.formatTime(new Date(tmp.create_at))
          tmp.last_reply_at = util.getDateDiff(Date.parse(tmp.last_reply_at));
          dealList.push(tmp)
        }
        this.setData({
          articleList: dealList
        })
        console.log(dealList)
      })
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
