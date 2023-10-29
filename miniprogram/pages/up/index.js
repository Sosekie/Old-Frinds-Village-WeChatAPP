// pages/up/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //发布内容
    title: '',
    inputValue: '',
    desc: '',
    imgList: [],
    fileIDs: [],
    //音乐播放器
    songName: '尚未匹配音乐',
    emtions: [],
    songs: [],
    songValue: 0,
    innerAudioContext: {},
    musicStatus: false,
    isPlay: false,
    //推荐产品卡片
    description: '',
    //popup
    popShow: false,
    //所在位置
    location: '所在位置',
    locStatus: false,
    longitude: '', //经度
    latitude: '', //纬度
    //推荐好物
    productName: '推荐好物',
    proStatus: false,
    proId: '',
    products: [],
    //折叠面板
    activeNames: [],
    activeNames2: [],
    sValue: 0,
    sName: 0,
  },
  //获取输入事件
  //获取输入内容

  getInput(event) {
    console.log("输入的内容", event.detail.value)
    this.setData({
      desc: event.detail.value
    })
  },
  inputtitle(event) {
    this.setData({
      title: event.detail.value
    })
  },
  inputDescription(e) {
    var des = e.detail.value
    this.setData({
      description: des
    })
  },
  //图片上传
  afterRead(event) {
    //console.log(event.detail.file[0].url)
    var list = this.data.imgList
    for (let index = 0; index < event.detail.file.length; index++) {
      list.push({
        url: event.detail.file[index].url
      })
      this.setData({
        imgList: list
      })
    }
    console.log(this.data.imgList)
  },
  deleteImg(e) {
    let list = this.data.imgList;
    list.splice(e.detail.index, 1);
    this.setData({
      imgList: list
    });
    //console.log('success')
  },
  //农产品图片上传
  selProPhoto() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        //console.log(res.tempFiles[0].tempFilePath)
        //console.log(res.tempFiles[0].size)
      }
    })
  },
  //选择推荐场景
  matchsituation() {
    this.setData({
      situation: [{
          name: "美食",
          value: 0
        },
        {
          name: "景点",
          value: 1
        },
        {
          name: "农场",
          value: 2
        }
      ],
    })

  },
  //音乐播放器相关
  //初始化音乐播放器
  matchMusic() {
    if (this.data.songs.length == 0 || this.data.emtions.length == 0) {
      //调用接口给参数赋值
      this.setData({
        emtions: ['愉快', '悲伤', '悠闲', '浪漫'],
        songs: [{
          name: 'lay me down',
          url: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
          value: 0
        }, {
          name: 'someone like you',
          url: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
          value: 1
        }, {
          name: '第一次爱的人',
          url: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
          value: 2
        }, {
          name: '情书',
          url: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
          value: 3
        }],
      })
      //音乐播放器初始化
      this.setData({
        innerAudioContext: wx.createInnerAudioContext(),
        //音乐匹配状态修改为已匹配
        musicStatus: true,
        songName: this.data.songs[this.data.songValue].name
      })
      this.data.innerAudioContext.src = this.data.songs[this.data.songValue].url
    }
  },
  //音乐的播放与暂停
  playChange() {
    if (this.data.isPlay) {
      this.data.innerAudioContext.pause()
      this.setData({
        isPlay: false
      })
    } else {
      this.data.innerAudioContext.play()
      this.setData({
        isPlay: true
      })
    }
  },
  //更换音乐
  songChange() {
    this.data.innerAudioContext.destroy()
    this.setData({
      innerAudioContext: wx.createInnerAudioContext(),
      songName: this.data.songs[this.data.songValue].name,
      isPlay: true
    })
    this.data.innerAudioContext.src = this.data.songs[this.data.songValue].url
    this.data.innerAudioContext.play()

  },
  //点击标签时
  selSong(e) {
    this.setData({
      songValue: e.currentTarget.dataset.index
    })
    this.songChange()
  },
  sels(e) {
    this.setData({
      sValue: e.currentTarget.dataset.index
    })
    console.log(this.data.sValue)
  },
  //上一曲和下一曲
  nextSong() {
    if (this.data.songValue == 3) {
      return
    }
    this.setData({
      songValue: this.data.songValue + 1
    })
    this.songChange()
  },
  preSong() {
    if (this.data.songValue == 0) {
      return
    }
    this.setData({
      songValue: this.data.songValue - 1
    })
    this.songChange()
  },
  //popup
  /*dialogConfirm(event) {
    this.setData({
      productName: this.data.nameTemp
    })
    this.setData({
      proStatus: true
    })
    if (this.data.productName == '') {
      this.setData({
        productName: '推荐好物',
        proStatus: false
      })
    }
  },
  inputProName(e) {
    this.setData({
      nameTemp: e.detail.value
    })
  },*/
  popShow() {
    /*if (this.data.productName === "推荐好物") {
      this.setData({
        productName: ''
      })
    }*/
    this.setData({
      popShow: true
    });
  },
  onPopClose() {
    this.setData({
      popShow: false
    });
  },
  onPickerCancel() {
    this.setData({
      productName: '推荐好物',
      popShow: false,
      proStatus: false,
      proId: ''
    })
  },
  onPickerChange(e) {
    this.setData({
      productName: e.detail.value,
      proStatus: true,
      proId: e.detail.index
    })
  },
  onPickerConfirm(e) {
    this.setData({
      productName: e.detail.value,
      proStatus: true,
      proId: e.detail.index,
      popShow: false
    })
  },
  getProducts() {
    var that = this
    wx.cloud.database().collection('goods').get({
      success: function (res) {
        // res.data 包含该记录的数据
        that.setData({
          products: res.data.map(item => item.name)
        })
      }
    })
  },
  //折叠面板
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onChange2(event) {
    this.setData({
      activeNames2: event.detail,
    });
  },

  //选择地址
  chooseLocation() {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        that.data.location = '选择的位置是：' + res.name
        //console.log(res.name)
        if (res.name) {
          that.setData({
            location: res.name,
            locStatus: true,
            longitude: res.longitude, //经度
            latitude: res.latitude, //纬度
          })
        }
      }
    });
  },
  //发布按钮
  upload() {
    let desc = this.data.desc
    let imgList = this.data.imgList
    if (!desc || desc.length < 1) {
      wx.showToast({
        icon: "none",
        title: '要输入才能发布哟'
      })
      return
    }
    if (!imgList || imgList.length < 1) {
      wx.showToast({
        icon: "none",
        title: '请选择图片'
      })
      return
    }
    wx.showLoading({
      title: '发布中...',
    })
    const promiseArr = []
    //只能一张张上传 遍历临时的图片数组
    for (let i = 0; i < this.data.imgList.length; i++) {
      let filePath = this.data.imgList[i]
      let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
      //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log("上传结果", res.fileID)
          this.setData({
            fileIDs: this.data.fileIDs.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log("上传失败", error)
        })
      }))
    }
    //保证所有图片都上传成功
    var userId = getApp().globalData.userId
    let db = wx.cloud.database()
    Promise.all(promiseArr).then(res => {
      wx.cloud.database().collection('cards').add({
        data: {
          title: this.data.title,
          poster: this.data.fileIDs,
          //date: app.getNowFormatDate(),
          date: db.serverDate(),
          description: this.data.desc,
          //poster: this.data.imgList,
          like: 0,
          position: this.data.location,
          longitude: this.data.longitude,
          latitude: this.data.latitude,
          location: db.Geo.Point(this.data.longitude, this.data.latitude),
          music_name: this.data.songName,
          shopping: this.data.productName,
          card_type: this.data.sValue,
          sdescription: this.data.description,
          product_id: this.data.proId,
          user_name:userId ,
          docType: 'geoNear',
        },
        success: res => {
          wx.hideLoading()
          wx.showToast({
            title: '发布成功',
          })
          console.log('发布成功', res)
          wx.switchTab({
            url: '../user/index',
          })
          this.setData({
            //发布内容
            title: '',
            inputValue: '',
            desc: '',
            imgList: [],
            fileIDs: [],
            //音乐播放器
            songName: '尚未匹配音乐',
            emtions: [],
            songs: [],
            songValue: 0,
            innerAudioContext: {},
            musicStatus: false,
            isPlay: false,
            //推荐产品卡片
            description: '',
            //popup
            popShow: false,
            //所在位置
            location: '所在位置',
            locStatus: false,
            longitude: '', //经度
            latitude: '', //纬度
            //推荐好物
            productName: '推荐好物',
            proStatus: false,
            proId: '',
            //折叠面板
            activeNames: [],
            activeNames2: [],
            sValue: 0,
            sName: 0,
          })
        },

        fail: err => {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '网络不给力....'
          })
          console.error('发布失败', err)
        }
      })
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
    this.getProducts()
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  //选择图片
  ChooseImage() {
    wx.chooseImage({
      count: 8 - this.data.imgList.length, //默认9,我们这里最多选择8张
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log("选择图片成功", res)
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  //删除图片
  DeleteImg(e) {
    wx.showModal({
      title: '要删除这张照片吗？',
      content: '',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },



})