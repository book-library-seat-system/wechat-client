var app = getApp()
Page({
  data: {
    pos:null,
    time:null,
    s:null,
    e:null,
    seatid:null
  },

  onLoad: function (options) {
    var trans = require('../../utils/seatid_trans.js');
    this.setData({
      pos: trans.seatid_to_seatPos(options.seatID),
      time:options.begintime+' ~ '+options.endtime,
      s:options.begintime,
      e:options.endtime,
      seatid: options.seatID
    })
  },

  reserveSuccess: function() {
    wx.request({
      url: app.getURL() + "/v1/seat/book",
      method: "POST",
      data: {
        openID: app.getOpenid(),
        seatID: parseInt(this.data.seatid),
        begintime: this.data.s,
        endtime: this.data.e
      },

      complete: function (res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        if (res.data.errorcode == 0) {
          wx.showModal({
            title: '',
            content: '预约成功',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({
                  url: '../mainPage/mainPage',
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '预约失败',
            content: res.data.errorinformation,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      }
    })
  }
})