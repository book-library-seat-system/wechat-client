// pages/selectSeat/selectSeat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '2017-05-08',
    startTimes: '9:00',
    endTimes: '10:00',
    index: 1,
    seatData: [
      { "row": "1", "id1": "1a", "id2": "1b", "id3": "1c", "id4": "1d", "id5": "1e", "id6": "1f", "id7": "1g", "id8": "1h",},
      { "row": "2", "id1": "2a", "id2": "2b", "id3": "2c", "id4": "2d", "id5": "2e", "id6": "2f", "id7": "2g", "id8": "2h", },
      { "row": "3", "id1": "3a", "id2": "3b", "id3": "3c", "id4": "3d", "id5": "3e", "id6": "3f", "id7": "3g", "id8": "3h", },
      { "row": "4", "id1": "4a", "id2": "4b", "id3": "4c", "id4": "4d", "id5": "4e", "id6": "4f", "id7": "4g", "id8": "4h", },
      { "row": "5", "id1": "5a", "id2": "5b", "id3": "5c", "id4": "5d", "id5": "5e", "id6": "5f", "id7": "5g", "id8": "5h", },
      { "row": "6", "id1": "6a", "id2": "6b", "id3": "6c", "id4": "6d", "id5": "6e", "id6": "6f", "id7": "6g", "id8": "6h", },
      { "row": "7", "id1": "7a", "id2": "7b", "id3": "7c", "id4": "7d", "id5": "7e", "id6": "7f", "id7": "7g", "id8": "7h", },
      { "row": "8", "id1": "8a", "id2": "8b", "id3": "8c", "id4": "8d", "id5": "8e", "id6": "8f", "id7": "8g", "id8": "8h", },
      { "row": "9", "id1": "9a", "id2": "9b", "id3": "9c", "id4": "9d", "id5": "9e", "id6": "9f", "id7": "9g", "id8": "9h", },
      { "row": "10", "id1": "10a", "id2": "10b", "id3": "10c", "id4": "10d", "id5": "10e", "id6": "10f", "id7": "10g", "id8": "10h", },
      { "row": "11", "id1": "11a", "id2": "11b", "id3": "11c", "id4": "11d", "id5": "11e", "id6": "11f", "id7": "11g", "id8": "11h", },
      { "row": "12", "id1": "12a", "id2": "12b", "id3": "12c", "id4": "12d", "id5": "12e", "id6": "12f", "id7": "12g", "id8": "12h", },
      { "row": "13", "id1": "13a", "id2": "13b", "id3": "13c", "id4": "13d", "id5": "13e", "id6": "13f", "id7": "13g", "id8": "13h", },
      { "row": "14", "id1": "14a", "id2": "14b", "id3": "14c", "id4": "14d", "id5": "14e", "id6": "14f", "id7": "14g", "id8": "14h", },
      { "row": "15", "id1": "15a", "id2": "15b", "id3": "15c", "id4": "15d", "id5": "15e", "id6": "15f", "id7": "15g", "id8": "15h", }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  }

})