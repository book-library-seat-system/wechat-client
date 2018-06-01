// pages/selectFloor/selectFloor.js
var app = getApp()
Page({
  data: {
    valid_1f:null,
    valid_2f:null,
    valid_3f:null,
    per_1:null,
    per_2:null,
    per_3:null,
    color_1: null,
    color_2: null,
    color_3: null,
    count:0,
    date:null,
    s:null,
    e:null
  },
  onLoad: function (options) {
    //传入下一个页面
    console.log(options.s)
    this.data.date = options.s.substring(0, 10)
    this.data.s = options.s.substring(11, 16)
    this.data.e = options.e.substring(11, 16)
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
            var tempGreen1 = 0
            var greenStr1=""
            var temp1 = ""
            tempGreen1= parseInt(255 * (1 - parseInt(f_1 / 360 * 100) * 0.01))
            console.log(tempGreen1)
            greenStr1 = tempGreen1.toString(16)
            if(greenStr1.length == 1) greenStr1 = "0"+greenStr1;
            temp1 = "#FF"  + greenStr1 + "00"
            console.log(temp1)

            var tempGreen2 = 0
            var greenStr2 = ""
            var temp2 = ""
            tempGreen2 = parseInt(255 * (1 - parseInt(f_2 / 360 * 100) * 0.01))
            console.log(tempGreen2)
            greenStr2 = tempGreen2.toString(16)
            if (greenStr2.length == 1) greenStr2 = "0" + greenStr2;
            temp2 = "#FF"  + greenStr2 + "00"
            console.log(temp2)

            var tempGreen3 = 0
            var greenStr3 = ""
            var temp3 = ""
            tempGreen3 = parseInt(255 * (1 - parseInt(f_3 / 360 * 100) * 0.01))
            console.log(tempGreen3)
            greenStr3 = tempGreen3.toString(16)
            if (greenStr3.length == 1) greenStr3 = "0" + greenStr3;
            temp3 = "#FF" + greenStr3 + "00"
            console.log(temp3)

            that.setData({
              valid_1f: '剩余座位：'+f_1.toString()+'个',
              valid_2f: '剩余座位：' + f_2.toString() +'个',
              valid_3f: '剩余座位：' + f_3.toString() +'个',
              per_1: parseInt(f_1/360*100),
              per_2: parseInt(f_2/360*100),
              per_3: parseInt(f_3/360*100),
              color_1: temp1,
              color_2: temp2,
              color_3: temp3
            })
          }
        }
      })
    }
  },
  selectFloor: function(e) {
    wx.navigateTo({
      url: '../selectArea/selectArea?floor='+e.currentTarget.id+'&s='+this.data.s+'&e='+this.data.e+'&date='+this.data.date,
    })
  }
})