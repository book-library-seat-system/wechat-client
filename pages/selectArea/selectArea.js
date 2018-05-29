// pages/selectArea/selectArea.js
app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    valid_1:null,
    valid_2:null,
    valid_3:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that  = this
    console.log(options)
    var index = parseInt(options.floor)
    a = app.getSeatArray()
    var v1 = 0
    var v2 = 0
    var v3 = 0
    for (var i = index * 360; i < index * 360+120; i++) {
      if (a[i] == 0) v1++
    }
    for (var i = index * 360; i < index * 360+120; i++) {
      if (a[i+120] == 0) v2++
    }
    for (var i = index * 360; i < index * 360 + 120; i++) {
      if (a[i + 240] == 0) v3++
    }
    that.setData({
      valid_1:v1,
      valid_2:v2,
      valid_3:v3
    })
  },
  selectSeat: function(e) {
    wx.redirectTo({
      url: '../selectSeat/selectSeat?area='+e.currentTarget.id,
    })
  }
})