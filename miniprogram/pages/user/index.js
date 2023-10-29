// pages/user/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    headSrc: "",
    location: "",
    gender: "",
    username: "",
    wechatNum: "",
    birth: "",
    intro: '',
    likeLength: 0,
    upLength: 0,
    beLikedNum: 0,
    money: '',
    //网格
    upList: [],
    likeList: [],
    templist: [],
    user: '',
    likes: []
  },
  //获取发布列表
  getmyuplist() {
    //console.log("获取数据")
    var that = this
    var userId = getApp().globalData.userId
    wx.cloud.database().collection('cards').where({
        user_name: userId
      })
      .get({
        success: (res) => {
          if (res.data.length == 0) {
            console.log('没有数据唉')
            that.setData({
              upLength: 0,
              beLikedNum: 0
            })
          } else {
            console.log(res.data)
            //获取足迹和获赞
            var list = res.data
            const sum = list.reduce((pre, cur) => {
              return pre + cur.like
            }, 0)
            //console.log('list:' + sum)
            that.setData({
              upList: list,
              upLength: list.length,
              beLikedNum: sum
            })
          }
        }
      })
  },

  //编辑资料跳转
  editProfile() {
    var that = this
    wx.navigateTo({
      url: 'profile',
      events: {
        someEvent: function (data) {
          that.setData({
            headSrc: data.data.headSrc,
            username: data.data.username,
            wechatNum: data.data.wechatNum,
            location: data.data.location,
            gender: data.data.gender,
            birth: data.data.birth,
            intro: data.data.intro
          })
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: {
            'headSrc': that.data.headSrc,
            'username': that.data.username,
            'wechatNum': that.data.wechatNum,
            'gender': that.data.gender,
            'location': that.data.location,
            'birth': that.data.birth,
            'intro': that.data.intro
          }
        })
      }
    })
  },
  //购物车跳转
  goShoppingcar() {
    wx.navigateTo({
      url: 'shop',
    })
  },
  //主页跳转
  goIndex(e) {
    //console.log('goindex')
  },
  //获取收藏列表
  getmylikelist() {
    //console.log("获取数据")
    var that = this
    var userId = getApp().globalData.userId
    var mylikes = []
    wx.cloud.database().collection('user').where({
        _id: userId.toString()
      })
      .get({
        success: (res) => {
          if (res.data.length == 0) {
            // console.log('没有数据唉')
          } else {
            // console.log(res.data[0].mylike)
            this.setData({
              likes: res.data[0].mylike
            })
            mylikes = res.data[0].mylike
            // console.log("mylike2", mylikes)
            const db = wx.cloud.database()
            const _ = db.command
            wx.cloud.database().collection('cards').where({
              _id: _.in(mylikes)
            }).get({
              success: (res) => {
                //喜欢赋值
                that.setData({
                  likeLength: res.data.length
                })
                if (res.data.length == 0) {
                  //  console.log('没有数据唉')
                } else {
                  // console.log(res.data)
                  this.setData({
                    likeList: res.data,
                  })
                }
              }
            })
          }
        }
      })
  },
  //获取用户基本信息
  getUserInfo() {
    var that = this
    var userId = getApp().globalData.userId
    console.log('userId:' + userId)
    wx.cloud.database().collection('user').where({
      _id: userId.toString()
    }).get({
      success: function (res) {
        console.log('加载用户info' + res.data)
        console.log(res.data)
        that.setData({
          headSrc: res.data[0].head,
          location: res.data[0].location,
          gender: res.data[0].gender,
          username: res.data[0].name,
          wechatNum: res.data[0].username,
          birth: res.data[0].birth,
          intro: res.data[0].intro,
          money: res.data[0].money
        })
      }
    })
  },
  //登录方法
  goLogin() {
    wx.navigateTo({
      url: 'login/index'
    })
  },
  //判断用户是否已经登录
  ifLogin() {
    var isLogin = getApp().globalData.isLogin
    if (!isLogin) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.redirectTo({
          url: 'login/index',
        })
      }, 2000)
    }
    //用户已经登录，正常请求数据
    else {
      //获取到当前登录用户id
      var id = getApp().globalData.userId
      this.setData({
        userId: id
      })
      this.getUserInfo()
      this.getmyuplist()
      this.getmylikelist()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.ifLogin()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},
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