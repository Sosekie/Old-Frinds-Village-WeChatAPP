// pages/user/register/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    usernameTip: false,
    usernameRepeat: false,
    passwordTip: false,
    headSrc: 'cloud://cloud1-0g3t249cf8fbcd65.636c-cloud1-0g3t249cf8fbcd65-1312169160/beauti_pic/back.jpg',
    usernameExist: []
  },
  //更换头像
  upLoadHead() {
    var that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        //console.log(res.tempFiles[0].tempFilePath)
        //console.log(res.tempFiles[0].size)
        var photo = res.tempFiles[0].tempFilePath
        that.uploadPhoto(photo, that)
      }
    })
  },

  //上传图片的方法
  uploadPhoto(photoTempPath, that) {
    wx.showLoading({
      title: "正在上传......"
    })
    let suffix = /\.[^\.]+$/.exec(photoTempPath)[0];
    wx.cloud.uploadFile({
      cloudPath: "head_img/" + Date.now() + suffix,
      filePath: photoTempPath,
      success(res) {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: "上传成功！",
          duration: 2000
        })
        console.log('fileID:' + res.fileID)
        that.setData({
          headSrc: res.fileID
        })
      },
      fail(res) {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: "上传失败，请检查网络！",
          icon: "none",
          duration: 2000
        })
      }
    })
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
    this.getUsernames(username)
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
    if (this.data.usernameTip || this.data.passwordTip || this.data.usernameRepeat || this.data.username === '' || this.data.password === '') {
      wx.showToast({
        title: '请输入正确的用户名或者密码',
        icon: 'none'
      })
      return
    } else {
      var username = this.data.username
      var password = this.data.password
      var headSrc = this.data.headSrc
      this.defineId(username, password, headSrc)
    }
  },
  //查询当前已有用户数确定id
  async defineId(username, password, headSrc) {
    var id
    id = await wx.cloud.database().collection('user').count()
    id = id.total.toString()
    this.addUser(id, username, password, headSrc)
  },
  //向数据库中添加用户     
  async addUser(id, username, password, headSrc) {
    wx.cloud.database().collection('user').add({
      data: {
        username: username,
        password: password,
        head: headSrc,
        _id: id
      },
      success: function () {
        wx.showToast({
          title: '注册成功',
          success: function () {
            setTimeout(() => {
              wx.navigateTo({
                url: '../login/index',
              })
            }, 2000)
          }
        })
      },
      failure: function () {
        wx.showToast({
          title: '注册失败',
          icon: 'none'
        })
      }
    })
  },


  //获取数据库已经存在的用户名
  getUsernames(username) {
    var username = username
    var that = this
    wx.cloud.database().collection('user').where({
      username: username,
    }).get({
      success: function (res) {
        if (res.data.length != 0) {
          that.setData({
            usernameRepeat: true
          })
        } else {
          that.setData({
            usernameRepeat: false
          })
        }
      }
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