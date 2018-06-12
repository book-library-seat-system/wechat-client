// pages/firstLogin/firstLogin.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolArray: ['请选择学校','中山大学', '华南理工大学', '广东外语外贸大学'],
    schoolInDatabase: ['', 'testsunyetsenuniversity', 'testsunyetsenuniversity','testsunyetsenuniversity'],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          let promise = new Promise(function (resolve, reject) {
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxb0295a71214e7ca7&secret=cc174512a7e111ce41426d0df36a331a&grant_type=authorization_code&js_code=' + res.code,
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                app.setOpenid(res.data.openid)
                console.log(res.data.openid) //获取openid
                wx.request({
                  url: app.getURL() + "/v1/users?openID=" + app.getOpenid(),
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  method: "GET",
                  complete: function (res) {
                    console.log(res)
                    if (res == null || res.data == null) {
                      console.error('网络请求失败');
                      return;
                    }
                    if (res.data.errorcode == 0) {
                      wx.switchTab({
                        url: '../mainPage/mainPage',
                      })
                    }
                  }
                })
              }
            })

          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var netid = e.detail.value.netid
    var pw = e.detail.value.pw
    if (netid == "") {
      wx.showModal({
        title: '绑定失败',
        content: 'netid不能为空',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    }
    if (pw == "") {
      wx.showModal({
        title: '绑定失败',
        content: 'password不能为空',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    }
    if (this.data.index == 0) {
      wx.showModal({
        title: '绑定失败',
        content: '请选择学校',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    }
    var utilMd5 = require('../../utils/md5.js');
    pw = utilMd5.hexMD5(pw)
    var school = this.data.schoolInDatabase[this.data.index]
    //var school = "testsunyetsenuniversity"
    wx.request({
      url: app.getURL() + "/v1/users",
      method:"POST",
      data: {
        openID: app.getOpenid(),
        netID: netid,
        password: pw,
        school: school
      },

      complete: function (res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        if (res.data.errorcode == 0) {
          wx.switchTab({
            url: '../mainPage/mainPage',
          })
        }
        else {
          wx.showModal({
            title: '绑定失败',
            //content: res.data.errorinformation,
            content:'记得改！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  nextPage: function() {
    wx.redirectTo({
      url: '../mainPage/mainPage',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})