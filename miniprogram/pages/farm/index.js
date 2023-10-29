const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */

  chaxun: function (e) {
    let that = this;
    let _list = [];
    this.setData({
      farm: _list
    });
    wx.cloud.database().collection('farm')
      .get({
        success: function (res) {
          console.log("数据回调成功");
          console.log(res.data);
          that.setData({
            farm: res.data
          });
          console.log("查询成功");
        },
        fail: function (err) {
          console.log("查询失败")
        }
      })
  },
  data: {},


  onShow(options) {
    this.chaxun()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
})