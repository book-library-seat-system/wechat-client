// pages/selectSeat/selectSeat.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '2017-05-08',
    startTimes: '9:00',
    endTimes: '10:00',
    floor: 1,
    area: null,
    index: 1,
    seatData: [
      { "row": "1", "id1": 0, "id2": 1, "id3": 2, "id4": 3, "id5": 4, "id6": 5, "id7": 6, "id8": 7,},
      { "row": "2", "id1":8, "id2": 9, "id3": 10, "id4": 11, "id5": 12, "id6": 13, "id7": 14, "id8": 15, },
      { "row": "3", "id1": 16, "id2": 17, "id3": 18, "id4": 19, "id5": 20, "id6": 21, "id7": 22, "id8": 23, },
      { "row": "4", "id1": 24, "id2": 25, "id3": 26, "id4": 27, "id5": 28, "id6": 29, "id7": 30, "id8": 31, },
      { "row": "5", "id1": 32, "id2": 33, "id3": 34, "id4": 35, "id5": 36, "id6": 37, "id7": 38, "id8": 39, },
      { "row": "6", "id1": 40, "id2": 41, "id3": 42, "id4": 43, "id5": 44, "id6": 45, "id7": 46, "id8": 47, },
      { "row": "7", "id1": 48, "id2": 49, "id3": 50, "id4": 51, "id5": 52, "id6": 53, "id7": 54, "id8": 55, },
      { "row": "8", "id1": 56, "id2": 57, "id3": 58, "id4": 59, "id5": 60, "id6": 61, "id7": 62, "id8": 63, },
      { "row": "9", "id1": 64, "id2": 65, "id3": 66, "id4": 67, "id5": 68, "id6": 69, "id7": 70, "id8": 71, },
      { "row": "10", "id1": 72, "id2": 73, "id3": 74, "id4": 75, "id5": 76, "id6": 77, "id7": 78, "id8": 79, },
      { "row": "11", "id1": 80, "id2": 81, "id3": 82, "id4":83, "id5": 84, "id6": 85, "id7": 86, "id8": 87, },
      { "row": "12", "id1": 88, "id2": 89, "id3": 90, "id4": 91, "id5": 92, "id6": 93, "id7": 94, "id8": 95, },
      { "row": "13", "id1": 96, "id2": 97, "id3": 98, "id4": 99, "id5": 100, "id6": 101, "id7": 102, "id8": 103, },
      { "row": "14", "id1": 104, "id2": 105, "id3": 106, "id4": 107, "id5": 108, "id6": 109, "id7": 110, "id8": 111, },
      { "row": "15", "id1": 112, "id2": 113, "id3": 114, "id4": 115, "id5": 116, "id6": 117, "id7": 118, "id8": 119, }
    ],
    imageset:[],
    imageArr: ['../../images/Y.png','../../images/N.png']
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      dates:options.date,
      startTimes:options.s,
      endTimes:options.e,
      floor: options.floor-1,
      area: options.area-1
    })
    var a = app.getSeatArray()
    var tt = []
    var first = this.data.floor*360+this.data.area*120
    for (var i = first; i < first+120; i++) {
      var ID = (i - first)
      tt[ID] = this.data.imageArr[a[i]]
    }
    console.log("hah")
    this.setData({
      imageset:tt
    })
  },

  confirmSeat: function() {
    wx.navigateTo({
      url: '../reserveConfirm/reserveConfirm',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindStartTimeChange: function (e) {
    // console.log("aaa")
    // console.log("startTime")
    var temp = e.detail.value[0] + e.detail.value[1] + ":00"
    console.log(temp)
    if(temp > this.data.endTimes) {
      this.setData({
        startTimes: this.data.endTimes,
        endTimes: temp
      })
    } else {
      this.setData({
        startTimes: temp
      })
    }

  },

  bindEndTimeChange: function (e) {
    console.log("aaa")
    var temp = e.detail.value[0] + e.detail.value[1] + ":00"
    if (temp < this.data.startTimes) {
      this.setData({
        startTimes: temp,
        endTimes: this.data.endTimes
      })
    } else {
      this.setData({
        endTimes: temp
      })
    }
  },

  seatClick: function(e) {
    console.log(e.target.id);
    var that=this;
    var seatid = this.data.floor*360+this.data.area*120+parseInt(e.target.id)
    wx.request({
      url: app.getURL() + "/v1/seat/book",
      method: "POST",
      data: {
        openID: app.getOpenid(),
        seatID: seatid,
        begintime: that.data.date + ' ' + that.data.startTimes+':00',
        endtime: that.data.date + ' ' + that.data.endTimes + ':00'
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
                wx.redirectTo({
                  url: '../viewHistory/viewHistory',
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