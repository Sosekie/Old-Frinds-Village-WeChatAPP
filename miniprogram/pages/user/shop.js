// pages/user/shop.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    user_goods: [],
    all_goods: [],
  },
  async chaxun() {
    let that = this
    let list = await db.collection('user').where({
      _id: (getApp().globalData.userId).toString()
    }).get()
    that.setData({
      list: list.data[0].mygoods,
    });
    this.chaxun_goods()
  },
  async chaxun_goods() {
    let that = this
    let count = await db.collection('goods').count()
    count = count.total
    let all = []
    for (let i = 0; i < count; i += 20) {
      let list = await db.collection('goods').skip(i).get()
      all = all.concat(list.data);
    }
    that.setData({
      all_goods: all,
    });
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < this.data.list.length; j++) {
        if (this.data.list[j] == this.data.all_goods[i]._id) {
          let a = this.data.user_goods
          a.push(this.data.all_goods[i])
          that.setData({
            user_goods: a
          })
        }
      }
    }
  },
  goIndex(e) {
    console.log(e.currentTarget.dataset)
  },
  //点击删除触发动画
  delete(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      ["user_goods[" + index + "].show"]: false
    })
    this.del(e)
  },
  //动画完成后真正删除元素
  del(e) {
    var list = this.data.user_goods
    list.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      user_goods: list
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
  onShow() {

  },

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})