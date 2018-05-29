// pages/selectFloor/selectFloor.js
var app = getApp()
Page({
  data: {
    valid_1f:null,
    valid_2f:null,
    valid_3f:null,
    count:0
  },
  onLoad: function (options) {
    var start = options.s.substring(11,13)
    //截取
    var start_head = options.s.substring(0,11)
    var start_tail = options.s.substring(13)
    var s = parseInt(start)
    var end = options.e.substring(11,13)
    var e = parseInt(end)
    var interval_count = e-s
    var that = this
    for (var i = 0; i < interval_count; i++) {
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
          console.log(res.data.seatinfos)
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
          that.data.count++
          if (that.data.count == interval_count) {
            var f_1 = 0
            var f_2 = 0
            var f_3 = 0
            var a = app.getSeatArray()
            for (var j = 0; j < 360; j++) {
              if (a[j] == 0) f_1++
            }
            for (var j = 0; j < 360; j++) {
              if (a[j+360] == 0) f_2++
            }
            for (var j = 0; j < 360; j++) {
              if (a[j+720] == 0) f_3++
            }
            that.setData({
              valid_1f: f_1,
              valid_2f: f_2,
              valid_3f: f_3
            })
          }
        }
      })
    }
  },
  selectFloor: function(e) {
    wx.navigateTo({
      url: '../selectArea/selectArea?floor='+e.currentTarget.id,
    })
  }
})