// pages/mainPage/mainPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '2017-05-08',
    startTimes: '12:00',
    endTimes: '12:01',
    index: 4,
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
    console.log("aaa")
    this.setData({
      startTimes: e.detail.value
    })
  },

  bindEndTimeChange: function (e) {
    console.log("aaa")
    this.setData({
      endTimes: e.detail.value
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
    wx.redirectTo({
      url: '../selectFloor/selectFloor',
    })
  },

  checkIn: function() {

  },

  checkOut: function() {

  },

})