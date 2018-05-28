// pages/selectFloor/selectFloor.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var start = options.s.substring(11,13)
    //截取
    var start_head = options.s.substring(0,11)
    var start_tail = options.s.substring(13)
    var s = parseInt(start)
    var end = options.e.substring(11,13)
    var e = parseInt(end)
    var interval_count = e-s
    console.log(interval_count)
    for (var i = 0; i < interval_count; i++) {
      console.log(i)
      var l = (s+i).toString()
      var r = (s+i+1).toString()
      if (l.length == 1) {
        l = '0'+l
      }
      if (r.length == 1) {
        r = '0'+r
      }
      wx.request({
        url: app.getURL() + '/v1/seats?openID=' + app.getOpenid()+'&begintime='+start_head+l+start_tail+'&endtime='+start_head+r+start_tail, //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          //app.setSeatArray(res.data.seatinfos)
          if (app.getSeatArray() == null) {
            app.setSeatArray(res.data.seatinfos)
          }
          else {
            var arr = app.getSeatArray()
            var len = arr.length
            for (var j = 0; j < len; j++) {
              if (res.data.seatinfos[j] != 0) arr[j] = 1
            }
            app.setSeatArray(arr)
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  selectFloor: function() {
    console.log(app.getSeatArray())
    wx.navigateTo({
      url: '../selectArea/selectArea',
    })
  }
})