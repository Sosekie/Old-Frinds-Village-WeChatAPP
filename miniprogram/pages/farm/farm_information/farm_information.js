const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: 1,
    showMap: false,
    farm_info: [],
    markers: [],
    user: []
  },
  async chaxun() {
    let that = this
    let count = await db.collection('farm').count()
    count = count.total
    // 2，通过for循环做多次请求，并把多次请求的数据放到一个数组里
    let all = []
    for (let i = 0; i < count; i += 20) { //自己设置每次获取数据的量
      let list = await db.collection('farm').skip(i).get()
      all = all.concat(list.data);
    }
    that.setData({
      farm_info: all,
      showMap: true,
    });
    for (let i = 0; i < count; i++) {
      if (this.data.flag == this.data.farm_info[i]._id) {
        this.data.index = i
      }
    }
    that.setData({
      markers: [{
        iconPath: "cloud://cloud1-0g3t249cf8fbcd65.636c-cloud1-0g3t249cf8fbcd65-1312169160/icon/location.png",
        id: 0,
        longitude: this.data.farm_info[this.data.flag].longitude,
        latitude: this.data.farm_info[this.data.flag].latitude,
        width: 20,
        height: 20
      }]
    });
  },
  async chaxun_user() {
    let that = this
    let count = await db.collection('user').count()
    count = count.total
    // 2，通过for循环做多次请求，并把多次请求的数据放到一个数组里
    let all = []
    for (let i = 0; i < count; i += 20) { //自己设置每次获取数据的量
      let list = await db.collection('user').skip(i).get()
      all = all.concat(list.data);
    }
    that.setData({
      user: all,
    });
  },
  onLoad(options) {
    this.setData({
      flag: options.cs1,
    });
    this.chaxun()
    this.chaxun_user()
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
})