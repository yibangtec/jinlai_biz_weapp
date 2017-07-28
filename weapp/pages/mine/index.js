// /pages/mine/index.js
var app = getApp()
var timeLogin;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    nickName:null,
    headerImg:''
  },

 
  login_change:function(e){
    wx.navigateTo({
      url: '../../pages/login/pwchange'
    })
  },
  login_reset:function(e){
    wx.navigateTo({
      url: '../../pages/login/pwreset'
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    //调用应用实例的方法获取全局数据
    var that=this
    
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res)
        //获取本地user.password值，若为空则转到密码设置页
        if (res.data.content.passworde == "") {
          wx.redirectTo({
            url: '../../pages/login/pwset'
          })
        }
        //获取本地user表，并赋值info_user中涉及到的字段；其中avatar项若user.avatar为空，
        //则显示占位图像（待设计提供）；nickname项若user.nickname为空，则显示user.mobile
        if (res.data.content.nickname == null) {
          that.setData({
            nickName: res.data.content.mobile,
          })
        } else {
          that.setData({
            nickName: res.data.content.nickname,
          })
        }
        if (res.data.content.avatar == null) {
          that.setData({
            headerImg: '',//如果没有头像时的占位符
          })
        } else {
          that.setData({
            headerImg: res.data.content.avatar,
          })
        }
      },
      fail: function (err) {
      }
    })
    
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo,
      })
    });
  },
  mineExit:function(e){
    wx.removeStorage({
      key: 'time_expire_login',
      success: function (res) {
        console.log(res.data)
      }
    })
    wx.reLaunch({
      url: '../../pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我的账户',
      path: '/pages/mine/index'
    }
  }
})