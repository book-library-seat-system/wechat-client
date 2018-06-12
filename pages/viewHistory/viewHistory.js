// pages/viewHistory/viewHistory.js
var app = getApp()
Page({
  data: {
    listData: [
      /*{ "code": "01", "start_date": "","end_date":"", "location": "1楼3区5A座","type": "已预约" },
      { "code": "02", "date": "2017-05-05 09:00-10:00", "location": "2楼2区6B座", "type": "已预约" },
      { "code": "03", "date": "2017-05-05 09:00-10:00", "location": "3楼1区7C座", "type": "已预约" },
      { "code": "04", "date": "2017-05-05 09:00-10:00", "location": "1楼3区5D座", "type": "已预约" },
      { "code": "05", "date": "2017-05-05 09:00-10:00", "location": "2楼2区6E座", "type": "已预约" },
      { "code": "06", "date": "2017-05-05 09:00-10:00", "location": "3楼1区7F座", "type": "已预约" }*/
    ]
    ,
    arr_show :[]
  },

  onLoad: function (options) {
    var that = this
   
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
          var trans = require('../../utils/seatid_trans.js');
          var len = res.data.bookseatinfos.length
        
          if (len == 0) return
          var i = 0
          var typ = ['','已预约','正在使用']
          var bu = ['','取消预约','提前签退']
          that.data.arr_show[0] = { "code": "1", "start_date": res.data.bookseatinfos[0].begintime.substring(0, 19).replace('T', ' '), "end_date": res.data.bookseatinfos[0].endtime.substring(0,19).replace('T',' '), "location": trans.seatid_to_seatPos(res.data.bookseatinfos[0].seatID), "type": typ[res.data.bookseatinfos[0].seatinfo], "button": bu[res.data.bookseatinfos[0].seatinfo], "seatid": res.data.bookseatinfos[0].seatID}
          while (i+1 < len) {
            i++
            if (res.data.bookseatinfos[i].begintime == res.data.bookseatinfos[i-1].endtime && 
              res.data.bookseatinfos[i].seatID == res.data.bookseatinfos[i-1].seatID &&
              res.data.bookseatinfos[i].seatinfo == res.data.bookseatinfos[i-1].seatinfo) {
              that.data.arr_show[that.data.arr_show.length - 1].end_date = res.data.bookseatinfos[i].endtime
              } else {
              console.log(res.data.bookseatinfos[i])
              that.data.arr_show[that.data.arr_show.length] = { "code": (that.data.arr_show.length + 1).toString(), "start_date": res.data.bookseatinfos[i].begintime.substring(0, 19).replace('T', ' '), "end_date": res.data.bookseatinfos[i].endtime.substring(0, 19).replace('T', ' '), "location": trans.seatid_to_seatPos(res.data.bookseatinfos[i].seatID), "type": typ[res.data.bookseatinfos[i].seatinfo], "button": bu[res.data.bookseatinfos[i].seatinfo],"seatid": res.data.bookseatinfos[i].seatID }
              }
          }
          that.setData({
            listData: that.data.arr_show
          })
        }
      }
    })
  },
  showAlart: function(e) {
    var that = this
   
    var index = parseInt(e.target.id)-1
    
    wx.showModal({
      title: '取消预约',
      content: '您确定要取消预约？',
      success: function (res) {
        if (res.confirm) {  
          wx.request({
            url: app.getURL() +'/v1/seat/unbook',
            method:"POST",
            data: {
              openID: app.getOpenid(),
              seatID: that.data.arr_show[index].seatid,
              begintime: that.data.arr_show[index].start_date,
              endtime: that.data.arr_show[index].end_date
            },
            complete: function (res) {
              if (res == null || res.data == null) {
                console.error('网络请求失败');
                return;
              }
              if (res.data.errorcode == 0) {
                wx.showModal({
                  title: '',
                  content: '取消成功',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    }
                  }
                })
              } else {
                wx.showModal({
                  title: '取消失败',
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
          wx.redirectTo({
            url: '../viewHistory/viewHistory',
          })
        } else {
          console.log('用户点击取消')
        }

      }
    })
  }
})
