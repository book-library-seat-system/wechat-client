// pages/mainPage/mainPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '2017-05-08',
    startTimes: '09:00',
    endTimes: '10:00',
    index: 1,
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

  bindStartTimeChange: function (e) {
    // console.log("aaa")
    // console.log("startTime")
    var temp = e.detail.value[0] + e.detail.value[1] + ":00"
    console.log(temp)
    this.setData({
      startTimes: temp
    })
  },

  bindEndTimeChange: function (e) {
    console.log("aaa")
    var temp = e.detail.value[0] + e.detail.value[1] + ":00"
    this.setData({
      endTimes: temp
    })
  },

  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  startReserve: function () {
    var s = this.data.dates + ' ' + this.data.startTimes+':00'
    var e = this.data.dates + ' ' + this.data.endTimes+':00'
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
            seatID: res.result
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
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
            } else {
              wx.showModal({
                title: '签到错误',
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
  }

})