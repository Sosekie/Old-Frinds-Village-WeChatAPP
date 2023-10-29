// app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'cloud1-0g3t249cf8fbcd65'
    })
    /*
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({

        traceUser: true,
        env:'cloud1-0g3t249cf8fbcd65',
      });
    }

    this.globalData = {};
  }*/
  },
  globalData: {
    userInfo: null,
    //登录状态，默认已登录
    isLogin: true,
    //当前登录用户
    userId: 0
  }
});