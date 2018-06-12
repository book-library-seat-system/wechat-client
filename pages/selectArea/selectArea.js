// pages/selectArea/selectArea.js
var app = getApp()
Page({
  data: {
    valid_1:null,
    valid_2:null,
    valid_3:null,
    per_1:null,
    per_2:null,
    per_3:null,
    color_1: null,
    color_2: null,
    color_3: null,
    floor:null,
    date:null,
    s:null,
    e:null
  },

  onLoad: function (options) {
    this.data.date = options.date
    this.data.s = options.s
    this.data.e = options.e
    this.data.floor = options.floor
    var that  = this
    console.log(options)
    var index = parseInt(options.floor)-1
    var a = app.getSeatArray()
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

    var tempGreen1 = 0
    var greenStr1 = ""
    var temp1 = ""
    tempGreen1 = parseInt(255 * (1 - parseInt(v1 / 120 * 100) * 0.01))
    console.log(tempGreen1)
    greenStr1 = tempGreen1.toString(16)
    if (greenStr1.length == 1) greenStr1 = "0" + greenStr1;
    temp1 = "#FF" + greenStr1 + "00"
    console.log(temp1)

    var tempGreen2 = 0
    var greenStr2 = ""
    var temp2 = ""
    tempGreen2 = parseInt(255 * (1 - parseInt(v2 / 120 * 100) * 0.01))
    console.log(tempGreen2)
    greenStr2 = tempGreen2.toString(16)
    if (greenStr2.length == 1) greenStr2 = "0" + greenStr2;
    temp2 = "#FF" + greenStr2 + "00"
    console.log(temp2)

    var tempGreen3 = 0
    var greenStr3 = ""
    var temp3 = ""
    tempGreen3 = parseInt(255 * (1 - parseInt(v3 / 120 * 100) * 0.01))
    console.log(tempGreen3)
    greenStr3 = tempGreen3.toString(16)
    if (greenStr3.length == 1) greenStr3 = "0" + greenStr3;
    temp3 = "#FF" + greenStr3 + "00"
    console.log(temp3)


    this.setData({
      valid_1: '剩余座位：'+v1.toString()+'个',
      valid_2: '剩余座位：' + v2.toString() + '个',
      valid_3: '剩余座位：' + v3.toString() + '个',
      per_1: parseInt(v1 / 120 * 100),
      per_2: parseInt(v2 / 120 * 100),
      per_3: parseInt(v3 / 120 * 100),
      color_1:temp1,
      color_2:temp2,
      color_3:temp3
    })
  },
  selectArea: function(e) {
    console.log("dhdfdi")
    wx.navigateTo({
      url: '../selectSeat/selectSeat?area=' + e.currentTarget.id +'&floor='+this.data.floor+ '&s=' + this.data.s + '&e=' + this.data.e + '&date=' + this.data.date,
    })
  }
})