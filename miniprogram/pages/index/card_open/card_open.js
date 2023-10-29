const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: 1,
    latitude: 0.0, //纬度
    // latitude: 29.99603,
    longitude: 0.0, //经度
    // longitude: 100.26963,
    markers: [], //图标
    likenum: 0,
    user: "1",
    showMap: false,
    goodsList: [],
    markers: [],
    index: 0,
    name: "",
    imgSrc: "",
    description: "",
    index_goods: "",
    date: "",
    username: '',
    head: ''
  },
  datetotime(time_t) {
    var y=parseInt(time_t.getMonth())+1
    y=y.toString()
    var date = time_t.getFullYear() + "年" + y + "月" + time_t.getDate() + "日"
    var time = time_t.getHours() + "时" + time_t.getMinutes() + "分" + time_t.getSeconds() + "秒"
    return date + time
  },
  async chaxun() {
    let that = this
    let count = await db.collection('cards').count()
    let index
    count = count.total
    // 2，通过for循环做多次请求，并把多次请求的数据放到一个数组里
    let all = []
    for (let i = 0; i < count; i += 20) { //自己设置每次获取数据的量
      let list = await db.collection('cards').skip(i).get()
      all = all.concat(list.data);
    }
    that.setData({
      goodsList: all,
      showMap: true,
    });
    for (let i = 0; i < count; i++) {
      if (this.data.flag == this.data.goodsList[i]._id) {
        this.data.index = i
      }
    }
    var date0 = this.datetotime(this.data.goodsList[this.data.index].date)
    that.setData({
      markers: [{
        iconPath: "cloud://cloud1-0g3t249cf8fbcd65.636c-cloud1-0g3t249cf8fbcd65-1312169160/icon/location.png",
        id: 0,
        longitude: this.data.goodsList[this.data.index].location.longitude,
        latitude: this.data.goodsList[this.data.index].location.latitude,
        width: 20,
        height: 20
      }],
      name: this.data.goodsList[this.data.index].shopping,
      date: date0
    });
    this.chaxun_goods()
  },
  async chaxun_goods() {
    let that = this
    let count = await db.collection('goods').count()
    count = count.total
    // 2，通过for循环做多次请求，并把多次请求的数据放到一个数组里
    let all = []
    for (let i = 0; i < count; i += 20) { //自己设置每次获取数据的量
      let list = await db.collection('goods').skip(i).get()
      all = all.concat(list.data);
    }
    for (let i = 0; i < count; i++) {
      if (this.data.name == all[i].name) {
        that.setData({
          imgSrc: all[i].imgSrc,
          description: all[i].description,
          index_goods: all[i]._id
        })
      }
    }
  },
  async addgoods() {
    let flag_ = false
    let list = await db.collection('user').where({
      _id: (getApp().globalData.userId).toString()
    }).get()
    for (let i = 0; i < list.data[0].mygoods.length; i++) {
      if (list.data[0].mygoods[i] == this.data.index_goods) {
        flag_ = true
      }
    }
    if (!flag_) {
      db.collection('user').doc("0").update({
        data: {
          mygoods: _.push(this.data.index_goods)
        }
      })
      wx.showToast({
        title: '已加入心愿清单',
        icon: "success"
      })
    }
  },

  backmusic: function () {
    player();

    function player() {
      back.title = "音乐，";
      back.src = "cloud://cloud1-0g3t249cf8fbcd65.636c-cloud1-0g3t249cf8fbcd65-1312169160/music/Blazo - Hope.mp3"
      back.onEnded(() => {
        player(); // 音乐循环播放
      })
    }
  },
  likeornot() {
    db.collection('user').doc(this.data.flag).
    get().then(res => {
      this.setData({
        likenum: res.data.like
      })
    })
  },
  addlike() {
    var num = this.data.likenum
    this.setData({
      islike: true,
      likenum: num + 1
    })
    db.collection('cards').doc(this.data.flag).update({
      data: {
        like: _.inc(1)
      }
    })
    db.collection('user').doc("0").update({
      data: {
        mylike: _.push(this.data.flag)
      }
    })
  },

  cancellike() {
    var num = this.data.likenum
    this.setData({
      islike: false,
      likenum: num - 1
    })
    db.collection('cards').doc(this.data.flag).update({
      data: {
        like: _.inc(-1)
      },
      success: function (res) {}
    })
    db.collection('user').doc("0").update({
      data: {
        mylike: _.pull(this.data.flag)
      }
    })

  },

  onLoad(options) {
    this.setData({
      flag: options.cs1,
      username: options.name,
      head: options.head
    });
    this.chaxun()
    this.likeornot()
    this.backmusic()
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
    //切换页面时停止播放音乐
    if (!this.data.musicStatus) {
      return
    }
    this.data.innerAudioContext.pause()
    this.setData({
      isPlay: false
    })
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