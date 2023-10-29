const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */

  chaxun: function (e) {
    let that = this;
    let _list = [];
    let _list2 = [];
    this.setData({
      farm_manage: _list,
      user: _list2
    });
    let lands = this.data.myland_
    var farm = []
    console.log('查询')
    console.log(lands)
    for (var index in lands) {
      var s = lands[index]
      var ss = s.split('.')
      farm = ss[0]
      console.log("land")
      console.log(ss[1])
    }
    wx.cloud.database().collection('farm')
      .get({
        success: function (res) {
          console.log("farm数据回调成功");
          console.log(res.data);
          that.setData({
            farm_manage: res.data
          });
          console.log("farm查询成功");
        },
        fail: function (err) {
          console.log("查询失败")
        }
      });
  },
  checked: function (e) {
    this.setData({
      isActive: e.currentTarget.dataset.id
    });
    console.log("e:" + e);
    console.log("this.isActive:" + this.data.isActive)
  },
  data: {
    flag: 1,
    user_id: "0",
    user_type: 1,
    isActive: 1,
    myland: [],
    farm_manage: [],
    farmn: '',
    landn: ''
  },
  onLoad(options) {
    this.setData({
      flag: options.cs1,
    });
    this.getmyland()
    //this.chaxun()
    //console.log("options.cs1:" + options.cs1);
    //console.log("flag:" + this.data.flag);
  },
  getmyland() {
    wx.cloud.database().collection('user').where({
        _id: this.data.user_id
      })
      .get({
        success: (res) => {
          if (res.data.length == 0) {
            console.log('没有数据唉')
          } else {
            console.log('数据')
            console.log(res.data[0].myland)
            this.setData({
              myland: res.data[0].myland
            })
            console.log("land2")
            console.log(this.data.myland)
            let that = this;
            let _list = [];
            let _list2 = [];
            this.setData({
              farm_manage: _list,
              user: _list2
            });
            const db = wx.cloud.database()
            const _ = db.command
            wx.cloud.database().collection('farm')
              .where({
                _id: _.in(this.data.myland)
              })
              .get({
                success: function (res) {
                  console.log("farm数据回调成功");
                  console.log(res.data);
                  that.setData({
                    farm_manage: res.data
                  });
                  console.log("farm查询成功");
                  console.log(res.data)
                },
                fail: function (err) {
                  console.log("查询失败")
                }
              });
          }
        }
      })
  },

  tishi() {
    wx.showToast({
      title: '暂不符合要求',
      icon: "error"
    })
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