var app = getApp()
Page({
  data: {
    dates: '',
    startTimes: '09:00',
    endTimes: '10:00',
    index: 1,
    start_date:'',
    end_date:"",
    
  },

  onLoad: function (options) {
    var t = require('../../utils/util.js');
  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;  
    var tomorrow_timetamp = timestamp + 24 * 60 * 60;
    var tomorrow_date = new Date(tomorrow_timetamp * 1000);
    
    var d1 = t.formatTime(new Date())
    var d2 = t.formatTime(tomorrow_date)

    this.setData({
      dates: d1.substring(0, 10),
      start_date: d1.substring(0, 10),
      end_date: d2.substring(0, 10),
    })
    
  },
  bindStartTimeChange: function (e) {
    var temp = e.detail.value[0] + e.detail.value[1] + ":00"
    this.setData({
      startTimes: temp,
    })
  },

  bindEndTimeChange: function (e) {
    var temp = e.detail.value[0] + e.detail.value[1] + ":00"
    this.setData({
      endTimes: temp
    })
  },

  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  startReserve: function () {
    var s = this.data.dates + ' ' + this.data.startTimes+':00'
    var e = this.data.dates + ' ' + this.data.endTimes+':00'
    if (s >= e) {
      wx.showModal({
        title: '',
        content: '开始时间不得晚于结束时间',
      })
      return
    }
    var t = require('../../utils/util.js');
    var d1 = t.formatTime(new Date())
    
    if (s < d1) {
      wx.showModal({
        title: '',
        content: '开始时间不合法',
      })
      return
    }
    wx.navigateTo({
      url: '../selectFloor/selectFloor?' + 's='+s+'&e='+e,
    })
  },

  checkIn: function() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        wx.request({
          url: app.getURL() + "/v1/seat/signin",
          method: "POST",
          data: {
            openID: app.getOpenid(),
            seatID: parseInt(res.result)
          },

          complete: function (res) {
            if (res == null || res.data == null) {
              console.error('网络请求失败');
              return;
            }
            if (res.data.errorcode == 0) {
              wx.showModal({
                title: '',
                content: '签到成功',
              })
            } else {
              wx.showModal({
                title: '签到失败',
                content: res.data.errorinformation,
              })
            }
          }
        })
      }
    })
  }
})