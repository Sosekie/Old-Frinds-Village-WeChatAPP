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
      farm_renLing: _list
    });
    wx.cloud.database().collection('farm')
      .get({
        success: function (res) {
          console.log("数据回调成功");
          console.log(res.data);
          that.setData({
            farm_renLing: res.data
          });
          console.log("查询成功");
        },
        fail: function (err) {
          console.log("查询失败")
        }
      })
  },
  data: {
    land_id: 1,
    farm_id: 1,
    showModal: false,
    user_id: "0",
    cost: 0,
    lands: [],
    flag: false
  },



  onLoad(options) {
    this.setData({
      land_id: options.cs1,
      farm_id: options.cs2,
    });
    this.chaxun()
    console.log("options.cs1:" + options.cs1 + " options.cs2:" + options.cs2);
    console.log("land_id:" + this.data.land_id);
    console.log("farm_id:" + this.data.farm_id);
  },
  showModal() {
    this.setData({
      showModal: true
    })
    console.log(this.data.showModal)
  },
  hideModal() {
    this.setData({
      showModal: false
    });
  },
  hideModalAdd() {

    const db = wx.cloud.database()
    const _ = db.command
    console.log("开始123456")
    this.setData({
      showModal: false
    });
    var landid = parseInt(this.data.land_id) + 1
    const panduan1 = 'land.land' + landid + '.rent_people'
    const panduan2 = "land.land" + landid + ".is_rent"
    const panduan3 = "land.land" + landid + ".empty_sum"
    const rent_people = parseInt(this.data.user_id)
    //查看money
    var tl = []
    var tmoney = 0
    var t_tian = true
    var farmid = this.data.farm_id.toString()
    var userid = this.data.user_id
    wx.cloud.database().collection('farm').where({
        _id: farmid
      })
      .get({
        success: (res) => {
          if (res.data.length == 0) {
            console.log('没有数据唉')
          } else {
            tl = res.data[0].land
            console.log("myland", tl)
            for (let k in tl) {
              if (tl[k].id == this.data.land_id) {
                tmoney = tl[k].cost
                t_tian = tl[k].is_rent
                this.setData({
                  flag: tl[k].is_rent
                })
              }
            }
            console.log("tomey", tmoney, t_tian)
            if (this.data.flag == true) {
              wx.showToast({
                title: '抱歉已被认领',
                icon: "error"
              })
            } else {
              wx.cloud.database().collection('user').doc(this.data.user_id).get({
                success: function (res) {
                  console.log("money数据回调成功");
                  console.log(res.data.money);
                  if (res.data.money < tmoney) {
                    wx.showToast({
                      title: '您的余额不够',
                      icon: "error"
                    })
                  } else {
                    db.collection('farm').doc(farmid)
                      .update({
                        data: {
                          [panduan1]: rent_people,
                          [panduan2]: true,
                          empty_sum: _.inc(-1)
                        }
                      })
                    wx.cloud.database().collection('user').doc(userid).update({
                      data: {
                        myland: _.push(farmid),
                        money: _.inc(-tmoney)
                      }
                    })
                    wx.showToast({
                      title: '恭喜认领成功',
                      icon: "success"
                    })
                    console.log("开始1234522")
                    this.setData({
                      flag: true
                    })
                  }
                }
              })
            }
          }
        }
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