// pages/up/index.js
const app = getApp()
const db = wx.cloud.database()
let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 8 //每页显示多少数据 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cards1: [],
    loadMore: false, //"上拉加载"的变量，默认false，隐藏  
    loadAll: false, //“没有数据”的变量，默认false，隐藏  
    goodsListCount: 0, //加载第i张图片
    // 左侧商品列表
    goodsLeftList: [{
      id: 0,
      title: '到达世界最高城',
      name: '王建国',
      poster: '../../static/index_pic/a1.jpg',
      head: '../../static/index_pic/a2.jpg',
      position: '中国理塘',
      music: 'fragile - wasting time',
      discription: '今天去了理塘，在理塘玩的很开心，相当开心，开开心心，欢迎大家来理塘玩。',
      shopping: '海南大芒果新鲜芒果快乐芒果买一送一',
      shoppingImg: '../../static/shop_img/mongo.png'
    }, ],
    goodsLeftListHeight: 0,
    // 右侧商品列表
    goodsRightList: [{
      id: 1,
      title: '到达世界最高城',
      name: '王建国',
      poster: '../../static/index_pic/a2.jpg',
      head: '../../static/index_pic/a2.jpg',
      position: '中国理塘',
      music: 'fragile - wasting time',
      discription: '今天去了理塘，在理塘玩的很开心，相当开心，开开心心，欢迎大家来理塘玩。',
      shopping: '海南大芒果新鲜芒果快乐芒果买一送一',
      shoppingImg: '../../static/shop_img/mongo.png'
    }, ],
    goodsRightListHeight: 0,
    isActive: 1,
  },
  // 图片绑定事件，通过比较左右列表高度，实现瀑布流展示
  onImageLoad: function (e) {
    let divWidth = 295; //显示的单栏宽度，我设为295rpx
    let oImgW = e.detail.width; //图片原始宽度
    console.log(oImgW)
    let oImgH = e.detail.height; //图片原始高度
    let rImgH = divWidth * oImgH / oImgW; //根据宽高比计算当前载入的图片的高度
    if (rImgH > 600) {
      rImgH = 600; //限制图片最高600rpx，可在css中添加 max-height:600rpx;
    }
    if (this.data.goodsListCount == 0) {
      this.setData({
        goodsLeftListHeight: this.data.goodsLeftListHeight + rImgH, //第一张图片高度加到goodsLeftListHeight 
        goodsListCount: this.data.goodsListCount++, //图片索引加1
        goodsRightList: this.data.goodsRightList.push(this.data.goodsList[this.data.goodsListCount]) //添加第二张图片到goodsRightList数组，因为第一张已经初始化到左侧列表中
      })
    } else {
      this.setData({
        goodsListCount: this.data.goodsListCount++, //图片索引加1
      })
      if (this.data.goodsLeftListHeight > this.data.goodsRightListHeight) { //把图片的高度加到目前高度更低的栏中
        this.setData({
          goodsRightListHeight: this.data.goodsRightListHeight + rImgH, //第二张图片高度加到goodsRightListHeight 
        })
      } else {
        this.setData({
          goodsLeftListHeight: this.data.goodsLeftListHeight + rImgH,
        })
      }
      if (this.data.goodsListCount < this.data.goodsList.length) { //根据目前的栏高，把下一张图片，push到低的那栏
        if (this.data.goodsLeftListHeight > this.data.goodsRightListHeight) {
          this.setData({
            goodsRightList: this.data.goodsRightList.push(this.data.goodsList[this.data.goodsListCount]),
          })
        } else {
          this.setData({
            goodsLeftList: this.data.goodsLeftList.push(this.data.goodsList[this.data.goodsListCount]),
          })
        }
      }
    }
  },
  // 向商品列表添加第一张图片
  // async waterfallImage() {
  // 	this.goodsLeftList.push(this.goodsList[0]);
  //  },
  checked: function (e) {
    this.setData({
      isActive: e.currentTarget.dataset.id
    });
  },

  onLoad(options) {
    this.chaxun()
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
    this.getData()
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
    console.log("上拉触底事件")
    let that = this
    if (!that.data.loadMore) {
      that.setData({
        loadMore: true, //加载中  
        loadAll: false //是否加载完所有数据
      });

      //加载更多，这里做下延时加载
      setTimeout(function () {
        that.getData()
      }, 2000)
    }
  },
  getData() {
    let that = this;
    //第一次加载数据
    if (currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示  
        loadAll: false //把“没有数据”设为false，隐藏  
      })
    }
    //云数据的请求
    wx.cloud.database().collection("cards")
      .skip(currentPage * pageSize) //从第几个数据开始
      .limit(pageSize)
      .get({
        success(res) {
          if (res.data && res.data.length > 0) {
            //console.log("请求成功", res.data)
            currentPage++
            //把新请求到的数据添加到cards1里  
            let list = that.data.cards1.concat(res.data)
            //console.log(list)
            that.setData({
              cards1: list, //获取数据数组    
              loadMore: false //把"上拉加载"的变量设为false，显示  
            });
            //console.log(cards1)


            if (res.data.length < pageSize) {
              that.setData({
                loadMore: false, //隐藏加载中。。
                loadAll: true //所有数据都加载完了
              });
            }

          } else {
            that.setData({
              loadAll: true, //把“没有数据”设为true，显示  
              loadMore: false //把"上拉加载"的变量设为false，隐藏  
            });
          }
          //设置用户昵称和头像
          let card = that.data.cards1
          wx.cloud.database().collection("user").get({
            success(res) {
              let user = res.data
              //console.log(user)
              //console.log(card)
              let newCard = card.map((item, index) => {
                return {
                  ...item,
                  name: user[item.user_name].name,
                  head: user[item.user_name].head
                }
              })
              //console.log(newCard)
              that.setData({
                cards1: newCard
              })
            }
          })


        },
        fail(res) {
          console.log("请求失败", res)
          that.setData({
            loadAll: false,
            loadMore: false
          });
        }
      })
  },

  // 突破数据库20条限制
  async chaxun() {
    let that = this;
    let _list2 = [];
    this.setData({
      cards2: _list2
    });
    let count = await db.collection('cards').count()
    count = count.total
    // 2，通过for循环做多次请求，并把多次请求的数据放到一个数组里
    let all2 = []
    for (let i = 0; i < count; i += 20) { //自己设置每次获取数据的量
      let list = await db.collection('cards').skip(i).orderBy('like', 'desc').get()
      all2 = all2.concat(list.data);
    }
    that.setData({
      cards2: all2,
      showMap: true
    });
  },
})