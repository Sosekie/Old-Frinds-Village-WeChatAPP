// pages/user/profile.js
import {
  areaList
} from '@vant/area-data';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户信息
    headSrc: '',
    username: '',
    wechatNum: '',
    gender: '',
    location: '',
    birth: '',
    intro: '',
    password: '123456',
    passwordInput: '',
    passwordNew: '',
    passwordOldTip: false,
    passwordNewTip: false,
    //性别选择
    genderShow: false,
    actions: [{
      name: '男'
    }, {
      name: '女'
    }, {
      name: '保密'
    }, ],
    //地点选择
    areaList,
    areaShow: false,
    //日期选择
    birthShow: false,
    currentDate: new Date().getTime(),
    minDate: 5259600 * 4,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    //更改密码的弹出层
    changePassword: false
  },

  //更换头像
  changeHead() {
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

  //输入框
  usernameConfirm(e) {
    this.setData({
      username: e.detail.value
    })
  },
  introConfirm(e) {
    this.setData({
      intro: e.detail.value
    })
  },
  //性别选择
  genderShow() {
    this.setData({
      genderShow: true
    });
  },
  onGenderClose() {
    this.setData({
      genderShow: false
    });
  },
  onSelect(event) {
    this.setData({
      gender: event.detail.name
    })
  },

  //地点选择
  areaShow() {
    this.setData({
      areaShow: true
    });
  },
  onAreaClose() {
    this.setData({
      areaShow: false
    });
  },
  areaConfirm(e) {
    var loc = ''
    if (e.detail.values[0].name == '北京市' || e.detail.values[0].name == '天津市' ||
      e.detail.values[0].name == '上海市' || e.detail.values[0].name == '重庆市') {
      loc = e.detail.values[1].name + '-' + e.detail.values[2].name
    } else {
      loc = e.detail.values[0].name + '-' + e.detail.values[1].name + '-' + e.detail.values[2].name
    }
    this.setData({
      location: loc
    })
    this.onAreaClose()
  },

  //日期选择
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  onChange(event) {
    var bir = ''
    bir = event.detail.getValues()[0].slice(0, 4) + '-' + event.detail.getValues()[1].slice(0, 2) + '-' + event.detail.getValues()[2]
    this.setData({
      birth: bir
    })
  },
  birthShow() {
    this.setData({
      birthShow: true
    });
  },
  onBirthClose() {
    this.setData({
      birthShow: false
    });
  },
  birthConfirm() {
    this.setData({
      birthShow: false
    });
  },

  //修改密码
  changePassword() {
    this.setData({
      passwordInput: '',
      passwordNew: '',
      changePassword: true
    })
  },
  //点击空白关闭pop
  onClose() {
    this.setData({
      changePassword: false
    })
  },
  //判断
  passwordOldTip(e) {
    var password = e.detail.value
    if (password != this.data.password) {
      this.setData({
        passwordOldTip: true
      })
    } else {
      this.setData({
        passwordOldTip: false
      })
    }
  },
  //判断
  passwordNewTip(e) {
    var password = e.detail.value
    var len = password.length
    if (len < 6 || len > 18) {
      this.setData({
        passwordNewTip: true
      })
    } else {
      this.setData({
        passwordNewTip: false
      })
    }
  },
  //双向绑定
  inputPasswordOld(e) {
    this.setData({
      passwordInput: e.detail.value
    })
  },
  //双向绑定
  inputPasswordNew(e) {
    this.setData({
      passwordNew: e.detail.value
    })
  },
  //确认修改密码
  confirmPassword() {
    if (this.data.passwordOldTip || this.data.passwordNewTip || this.data.passwordInput === '' || this.data.passwordNew === '') {
      wx.showToast({
        title: '请输入正确的密码',
        icon: 'none',
      })
      return
    } else {
      this.setData({
        changePassword: false,
        password: this.data.passwordNew
      })
      let userId = getApp().globalData.userId.toString()
      wx.cloud.database().collection('user').where({
        _id: userId
      }).update({
        data: {
          password: this.data.password
        }
      }).then(() => {
        wx.showToast({
          title: '修改成功',
          icon: 'none'
        })
      })
    }
  },
  //退出登录
  logout() {
    getApp().globalData.isLogin = false
    wx.reLaunch({
      url: 'login/index',
    })
  },
  //资料修改提交到数据库
  upToDatabase() {
    let userId = getApp().globalData.userId.toString()
    wx.cloud.database().collection('user').where({
      _id: userId
    }).update({
      data: {
        name: this.data.username,
        username: this.data.wechatNum,
        location: this.data.location,
        birth: this.data.birth,
        intro: this.data.intro,
        gender: this.data.gender
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({
        headSrc: data.data.headSrc,
        username: data.data.username,
        wechatNum: data.data.wechatNum,
        location: data.data.location,
        gender: data.data.gender,
        birth: data.data.birth,
        intro: data.data.intro
      })
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
    this.upToDatabase()
    var that = this
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('someEvent', {
      data: {
        'headSrc': that.data.headSrc,
        'username': that.data.username,
        'wechatNum': that.data.wechatNum,
        'gender': that.data.gender,
        'location': that.data.location,
        'birth': that.data.birth,
        'intro': that.data.intro
      }
    });
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