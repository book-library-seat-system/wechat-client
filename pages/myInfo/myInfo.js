// pages/myInfo/myInfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum: 0,
    voil:1,
    reserved:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
    var that = this
    wx.request({
      url: app.getURL() + "/v1/users?openID=" + app.getOpenid(),
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      complete: function (res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        console.log(res)
        var count = 0
        var len = res.data.bookseatinfos.length
        for(var i = 0; i < len; i++) {
          if (res.data.bookseatinfos[i].seatinfo == '1') count++
        }
        //that,setData异步执行，刷新界面
        that.setData({
          voil: res.data.voilation,
          reserved:count,
          sum:len
        })
        
      }
      
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  viewHistory: function() {
    wx.navigateTo({
      url: '../viewHistory/viewHistory',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getUserInfo: function () {
    var that = this
    _getUserInfo();
    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            userInfo: res.userInfo
          })
          that.update()
        }
      })
    }
  }
})