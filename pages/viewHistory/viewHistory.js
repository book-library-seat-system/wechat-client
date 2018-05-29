// pages/viewHistory/viewHistory.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { "code": "01", "start_date": "","end_date":"", "location": "1楼3区5A座","type": "预约成功" },
      { "code": "02", "date": "2017-05-05 09:00-10:00", "location": "2楼2区6B座","type": "已履约" },
      { "code": "03", "date": "2017-05-05 09:00-10:00", "location": "3楼1区7C座","type": "已履约" },
      { "code": "04", "date": "2017-05-05 09:00-10:00", "location": "1楼3区5D座","type": "已履约" },
      { "code": "05", "date": "2017-05-05 09:00-10:00", "location": "2楼2区6E座","type": "已履约" },
      { "code": "06", "date": "2017-05-05 09:00-10:00", "location": "3楼1区7F座","type": "已履约" },
      { "code": "07", "date": "2017-05-05 09:00-10:00", "location": "1楼3区5G座","type": "违约" },
      { "code": "08", "date": "2017-05-05 09:00-10:00", "location": "2楼2区6H座","type": "违约" },
      { "code": "09", "date": "2017-05-05 09:00-10:00", "location": "3楼1区7G座","type": "违约" },
      { "code": "10", "date": "2017-05-05 09:00-10:00", "location": "1楼3区5F座","type": "违约" },
      { "code": "11", "date": "2017-05-05 09:00-10:00", "location": "2楼2区6E座","type": "违约" },
      { "code": "12", "date": "2017-05-05 09:00-10:00", "location": "3楼1区7D座","type": "违约" }
    ]
    ,
    arr_show :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(typeof (that.data.listData))
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
        if (res.data.errorcode == 0) {
          var trans = require('../../utils/seatid_trans.js');
          var len = res.data.bookseatinfos.length
          console.log(res.data.bookseatinfos[0])
          if (len == 0) return
          var i = 0
          var typ = ['','已预约','正在使用']
          that.data.arr_show[0] = { "code": "1", "start_date": res.data.bookseatinfos[0].begintime, "end_date": res.data.bookseatinfos[0].endtime, "location": trans.seatid_to_seatPos(res.data.bookseatinfos[0].seatID), "type": typ[res.data.bookseatinfos[0].seatinfo]}
          while (i+1 < len) {
            i++
            if (res.data.bookseatinfos[i].begintime == res.data.bookseatinfos[i-1].endtime && 
              res.data.bookseatinfos[i].seatID == res.data.bookseatinfos[i-1].seatID &&
              res.data.bookseatinfos[i].seatinfo == res.data.bookseatinfos[i-1].seatinfo) {
              that.data.arr_show[that.data.arr_show.length - 1].end_date = res.data.bookseatinfos[i].endtime
              } else {
              that.data.arr_show[that.data.arr_show.length] = { "code": (that.data.arr_show.length+1).toString(), "start_date": res.data.bookseatinfos[i].begintime, "end_date": res.data.bookseatinfos[i].endtime, "location": trans.seatid_to_seatPos(res.data.bookseatinfos[i].seatID), "type": typ[res.data.bookseatinfos[i].seatinfo] }
              }
          }
          that.setData({
            listData: that.data.arr_show
          })
        }
      }
    })
  }
})