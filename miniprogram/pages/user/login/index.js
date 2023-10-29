// pages/user/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    usernameTip: false,
    passwordTip: false
  },
  usernameTip(e) {
    var username = e.detail.value
    var len = username.length
    if (len < 6 || len > 11) {
      this.setData({
        usernameTip: true
      })
    } else {
      this.setData({
        usernameTip: false
      })
    }
  },
  passwordTip(e) {
    var password = e.detail.value
    var len = password.length
    if (len < 6 || len > 18) {
      this.setData({
        passwordTip: true
      })
    } else {
      this.setData({
        passwordTip: false
      })
    }
  },
  inputUsername(e) {
    this.setData({
      username: e.detail.value
    })
  },
  inputPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  submit() {
    if (this.data.usernameTip || this.data.passwordTip || this.data.username === '' || this.data.password === '') {
      wx.showToast({
        title: '请输入正确的用户名或者密码',
        icon: 'none'
      })
    } else {
      var username = this.data.username
      var password = this.data.password
      wx.cloud.database().collection('user').where({
        username: username,
        password: password
      }).get({
        success: function (res) {
          if (res.data.length != 0) {
            console.log(res.data)
            wx.showToast({
              title: '登录成功',
            })
            //登录状态设置为true
            getApp().globalData.isLogin = true
            //user_id赋值
            getApp().globalData.userId = parseInt(res.data[0]._id)
            setTimeout(() => {
              wx.switchTab({
                url: '../index'
              })
            }, 2000)
          } else {
            wx.showToast({
              title: '用户名或密码错误',
              icon: 'none'
            })
          }
        }
      })
    }
  },
  register() {
    wx.navigateTo({
      url: '../register/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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