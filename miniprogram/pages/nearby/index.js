// pages/nearby/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    temp: [],
    //地图相关
    longitude: 120.19653,
    latitude: 35.95995,
    near: [],
    markers: [],
    allMarkers: [{
        id: 0,
        latitude: 36.06,
        longitude: 120.38,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx'
      },
      {
        id: 1,
        latitude: 36.06633,
        longitude: 120.38299,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      }, {
        id: 2,
        latitude: 36.06533,
        longitude: 120.38239,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      }, {
        id: 3,
        latitude: 36.05633,
        longitude: 120.38399,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      }, {
        id: 4,
        latitude: 36.06683,
        longitude: 120.38219,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      }, {
        id: 5,
        latitude: 36.06693,
        longitude: 120.39299,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      }, {
        id: 6,
        latitude: 36.0650,
        longitude: 120.38211,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      }, {
        id: 7,
        latitude: 36.06613,
        longitude: 120.38229,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      }, {
        id: 8,
        latitude: 36.064,
        longitude: 120.38099,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      }, {
        id: 9,
        latitude: 36.06699,
        longitude: 120.39099,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      },
    ],
    sceneMarkers: [{
        id: 0,
        latitude: 36.06,
        longitude: 120.38,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx'
      },
      {
        id: 1,
        latitude: 36.06633,
        longitude: 120.38299,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      }, {
        id: 2,
        latitude: 36.06533,
        longitude: 120.38239,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      }, {
        id: 3,
        latitude: 36.05633,
        longitude: 120.38399,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      }, {
        id: 4,
        latitude: 36.06683,
        longitude: 120.38219,
        iconPath: '../../images/icon/location-blue.png',
        width: '50rpx',
        height: '50rpx',
      }
    ],
    foodMarkers: [{
      id: 0,
      latitude: 36.06693,
      longitude: 120.39299,
      iconPath: '../../images/icon/location-blue.png',
      width: '50rpx',
      height: '50rpx',
    }, {
      id: 1,
      latitude: 36.0650,
      longitude: 120.38211,
      iconPath: '../../images/icon/location-blue.png',
      width: '50rpx',
      height: '50rpx',
    }, {
      id: 2,
      latitude: 36.06613,
      longitude: 120.38229,
      iconPath: '../../images/icon/location-blue.png',
      width: '50rpx',
      height: '50rpx',
    }, {
      id: 3,
      latitude: 36.064,
      longitude: 120.38099,
      iconPath: '../../images/icon/location-blue.png',
      width: '50rpx',
      height: '50rpx',
    }, {
      id: 4,
      latitude: 36.06699,
      longitude: 120.39099,
      iconPath: '../../images/icon/location-blue.png',
      width: '50rpx',
      height: '50rpx',
    }, ],
    choosedId: 0,
    //卡片相关
    //选项卡
    option: 0,
    card: [],
    name: 'Bella',
    head: '',
    poster: '',
    id: 0,
    position: '',
    comment: '',
    distance: 0,
    like: 0,
    title: 0,
    card_id: '',
    //popUp弹出层
    popShow: false,
    goodsList: [],
    show: 1,
    user_type: 1,
  },
  checked: function (e) {
    this.setData({
      show: e.currentTarget.dataset.id
    });
  },

  //排序最近距离
  /*getnearby() {
    wx.getLocation({ //1，获取自己的位置
      type: 'wgs84',
      success: res => {
        const latitude = res.latitude
        const longtitude = res.longitude
        console.log('当前的经纬度', res.longitude, res.latitude)
        //2，查找附近的人
        let marker = []
        let scenemarker = []
        let foodmarker = []
        const db = wx.cloud.database()
        const $ = db.command.aggregate
        db.collection('cards').aggregate()
          .geoNear({
            distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
            spherical: true,
            near: db.Geo.Point(longtitude, latitude),
            query: {
              docType: 'geoNear',
            },
            key: 'location', // 若只有 location 一个地理位置索引的字段，则不需填
            includeLocs: 'location', // 若只有 location 一个是地理位置，则不需填
          })
          .end().then(res => {
            console.log('位置', res.list)
            var i = 0
            var si = 0
            var fi = 0
            res.list.forEach(item => {
              marker.push({
                id: i,
                longitude: item.location.coordinates[0],
                latitude: item.location.coordinates[1],
                width: '50rpx',
                height: '50rpx',
                iconPath: '../../images/icon/location-blue.png',
                name: item.position,
                poster: item.poster[0],
                distance: (item.distance / 1000).toFixed(2) + 'km',
                title: item.title,
                like: item.like,
                comment: item.description,
                card_id: item._id,
                username: item.user_name
              })
              i = i + 1
              //scene
              if (item.card_type == 1) {
                scenemarker.push({
                  id: si,
                  longitude: item.location.coordinates[0],
                  latitude: item.location.coordinates[1],
                  width: '50rpx',
                  height: '50rpx',
                  iconPath: '../../images/icon/location-blue.png',
                  name: item.position,
                  poster: item.poster[0],
                  distance: item.distance,
                  title: item.title,
                  like: item.like,
                  comment: item.description,
                  card_id: item._id,
                  username: item.user_name

                })
                si = si + 1
              };
              if (item.card_type == 0) {
                foodmarker.push({
                  id: fi,
                  longitude: item.location.coordinates[0],
                  latitude: item.location.coordinates[1],
                  width: '50rpx',
                  height: '50rpx',
                  iconPath: '../../images/icon/location-blue.png',
                  name: item.position,
                  poster: item.poster[0],
                  distance: item.distance,
                  title: item.title,
                  like: item.like,
                  comment: item.description,
                  card_id: item._id,
                  username: item.user_name

                })
                fi = fi + 1
              };
            })
            this.setData({
              allMarkers: marker,
              sceneMarkers: scenemarker,
              foodMarkers: foodmarker,
              markers: marker,
              name: 'Bella',
              poster: marker[0].poster,
              id: 0,
              position: marker[0].name,
              comment: marker[0].description,
              distance: marker[0].distance,
              like: marker[0].like,
              title: marker[0].title,
              card_id: marker[0].card_id
            })
          })
      }
    })
  },*/

  getnearby() {
    const longtitude = this.data.longitude
    const latitude = this.data.latitude
    let marker = []
    let scenemarker = []
    let foodmarker = []
    const db = wx.cloud.database()
    const $ = db.command.aggregate
    db.collection('cards').aggregate()
      .geoNear({
        distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
        spherical: true,
        near: db.Geo.Point(longtitude, latitude),
        query: {
          docType: 'geoNear',
        },
        key: 'location', // 若只有 location 一个地理位置索引的字段，则不需填
        includeLocs: 'location', // 若只有 location 一个是地理位置，则不需填
      })
      .end().then(res => {
        console.log('位置', res.list)
        var i = 0
        var si = 0
        var fi = 0
        res.list.forEach(item => {
          marker.push({
            id: i,
            longitude: item.location.coordinates[0],
            latitude: item.location.coordinates[1],
            width: '50rpx',
            height: '50rpx',
            iconPath: '../../images/icon/location-blue.png',
            name: item.position,
            poster: item.poster[0],
            distance: (item.distance / 1000).toFixed(2) + 'km',
            title: item.title,
            like: item.like,
            comment: item.description,
            card_id: item._id,
            username: item.user_name
          })
          i = i + 1
          //scene
          if (item.card_type == 1) {
            scenemarker.push({
              id: si,
              longitude: item.location.coordinates[0],
              latitude: item.location.coordinates[1],
              width: '50rpx',
              height: '50rpx',
              iconPath: '../../images/icon/location-blue.png',
              name: item.position,
              poster: item.poster[0],
              distance: item.distance,
              title: item.title,
              like: item.like,
              comment: item.description,
              card_id: item._id,
              username: item.user_name

            })
            si = si + 1
          };
          if (item.card_type == 0) {
            foodmarker.push({
              id: fi,
              longitude: item.location.coordinates[0],
              latitude: item.location.coordinates[1],
              width: '50rpx',
              height: '50rpx',
              iconPath: '../../images/icon/location-blue.png',
              name: item.position,
              poster: item.poster[0],
              distance: item.distance,
              title: item.title,
              like: item.like,
              comment: item.description,
              card_id: item._id,
              username: item.user_name

            })
            fi = fi + 1
          };
        })
        this.setData({
          allMarkers: marker,
          sceneMarkers: scenemarker,
          foodMarkers: foodmarker,
          markers: marker,
          name: 'Bella',
          poster: marker[0].poster,
          id: 0,
          position: marker[0].name,
          comment: marker[0].description,
          distance: marker[0].distance,
          like: marker[0].like,
          title: marker[0].title,
          card_id: marker[0].card_id
        })
      })

  },
  //地图相关
  //打开时获取当前经纬度
  /*getLocation() {
    var that = this;
    //  获取当前定位的经纬度信息
    wx.getLocation({
      type: 'gcj02',
      altitude: true, //高精度定位
      //定位成功，更新定位结果
      success: function (res) {
        var latitudee = res.latitude
        var longitudee = res.longitude
        that.setData({
          longitude: parseFloat(longitudee),
          latitude: parseFloat(latitudee),
        })
        console.log(longitudee, latitudee)
      },
      //定位失败回调
      fail: function () {
        wx.showToast({
          title: "定位失败",
          icon: "none"
        })
      }
    })
  },*/
  //地图移动到所在位置
  moveToCenter() {
    var map;
    map = wx.createMapContext("mainMap")
    map.moveToLocation({})
  },
  //恢复样式
  backMarkerStyle(id) {
    if (id < this.data.markers.length) {
      var iconPath = "markers[" + this.data.choosedId + "].iconPath"
      var width = "markers[" + this.data.choosedId + "].width"
      var height = "markers[" + this.data.choosedId + "].height"
      var callout = "markers[" + this.data.choosedId + "].callout"
      this.setData({
        [iconPath]: '../../images/icon/location-blue.png',
        [width]: '50rpx',
        [height]: '50rpx',
        [callout]: {}
      })
    }
  },
  //更改样式
  changeMarkerStyle(id) {
    if (id < this.data.markers.length) {
      var iconPath = "markers[" + this.data.choosedId + "].iconPath"
      var width = "markers[" + this.data.choosedId + "].width"
      var height = "markers[" + this.data.choosedId + "].height"
      var callout = "markers[" + this.data.choosedId + "].callout"
      console.log(this.data.markers[id].name)
      this.setData({
        [iconPath]: '../../images/icon/location.png',
        [width]: '80rpx',
        [height]: '80rpx',
        [callout]: {
          content: this.data.markers[id].name,
          borderRadius: 7,
          bgColor: "#04BE02",
          display: 'ALWAYS',
          textAlign: 'center',
          padding: '10rpx',
          color: '#fff',
          fontSize: 12
        }
      })
    }
  },
  //marker变化
  markerChange(id) {
    //先恢复上次选择的marker样式
    this.backMarkerStyle(id)
    //重新赋值choosedId
    this.setData({
      choosedId: id
    })
    //更改样式
    this.changeMarkerStyle(id)
  },
  //选择marker
  chooseLoc(e) {
    this.markerChange(e.detail.markerId)
    console.log("位置是", e.detail.markerId)
  },
  c_distance(d) {
    var dd = parseInt(d)
    if (dd > 1000) {
      dd = dd / 1000 + 'km' + dd % 1000
    } else {
      dd = dd.toString() + "m"
    }
    return dd
  },
  //卡片相关
  swiperChange(event) {
    this.markerChange(event.detail.current)
    var id = event.detail.current
    var map;
    map = wx.createMapContext("mainMap")
    map.moveToLocation({
      latitude: this.data.markers[id].latitude,
      longitude: this.data.markers[id].longitude,
    })
    var tmarker = []
    var users = []
    let that = this
    tmarker = this.data.markers
    let user_name = tmarker[id].username
    user_name = user_name.toString()
    wx.cloud.database().collection('user').where({
      _id: user_name
    }).get({
      success(res) {
        that.setData({
          name: res.data[0].name,
          head: res.data[0].head
        })
      }
    })
    this.setData({
      poster: tmarker[id].poster,
      id: 0,
      position: tmarker[id].name,
      comment: tmarker[id].title,
      distance: tmarker[id].distance,
      like: tmarker[id].like,
      title: tmarker[id].title,
      comment: tmarker[id].comment,
      card_id: tmarker[id].card_id
    })
  },
  //选项相关
  //选择分类
  selType(e) {
    this.setData({
      option: e.currentTarget.dataset.index
    })
    this.backMarkerStyle(this.data.choosedId)
    var list = []
    if (e.currentTarget.dataset.index === 0) {
      list = this.data.allMarkers
      this.setData({
        markers: list
      })
    } else if (e.currentTarget.dataset.index === 1) {
      list = this.data.sceneMarkers
      this.setData({
        markers: list
      })
    } else {
      list = this.data.foodMarkers
      this.setData({
        markers: list
      })
    }
    this.setData({
      choosedId: 0
    })
    this.changeMarkerStyle(0)
  },
  //popup弹出层相关
  showPop() {
    this.setData({
      popShow: true
    })
  },
  onClose() {
    this.setData({
      popShow: false
    });
  },
  like() {
    if (this.data.goodsList.islike) {
      this.setData({
        ['goodsList.like']: this.data.goodsList.like - 1
      })
    } else {
      this.setData({
        ['goodsList.like']: this.data.goodsList.like + 1
      })
    }
    this.setData({
      ['goodsList.islike']: !this.data.goodsList.islike
    })
  },

  goIndex(e) {
    wx.navigateTo({
      url: '/pages/index/card_open/card_open?cs1=' + e.currentTarget.dataset.card_id + '&name=' + e.currentTarget.dataset.name + '&head=' + e.currentTarget.dataset.head,
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //this.getLocation()
    this.getnearby()
    this.moveToCenter()
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
    // this.setData({
    //   show: 1
    // });
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

  },
})