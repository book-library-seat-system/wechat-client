App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxb0295a71214e7ca7&secret=cc174512a7e111ce41426d0df36a331a&grant_type=authorization_code&js_code=' + res.code,
            header: {
              'content-type': 'application/json' 
            },
            success: function (res) {
              that.globalData.openID = res.data.openid
              console.log(res.data.openid) //获取openid  
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  getOpenid: function () {
    return this.globalData.openID;
  },
  getURL: function() {
    return this.globalData.prefixUrl;
  },
  setSeatArray: function(a) {
    this.globalData.seatArray = a
  },
  getSeatArray: function() {
    return this.globalData.seatArray
  }
  ,
  globalData: {
    userInfo: null,
    openID:null,
      prefixUrl:"http://118.89.50.110:8899",
    //"https://private-anon-a293b97daf-librarybookseatsystem.apiary-mock.com",
    seatArray:null
  }
})