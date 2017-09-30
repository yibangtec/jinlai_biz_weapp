// pages/item/deleteItem.js
var user_id=''
var all =''
var bizId=''
var idSum=''
var password=''
var id=''
var value = ''
var title = ''
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      //关键在这里
      //prePage.changeData(e.detail.value)
      value = prePage.data.value

      wx.setNavigationBarTitle({ title: prePage.data.title })
      console.log(prePage.data.value)
    }
    user_id = options.user
    all = options.all
    bizId = options.biz
    id = options.id
    console.log(options.value)
    
    
    var url = 'item/index'
    var params = {}
    var api_result = api_request(url, params)
    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      console.log(bizId)
      app.sign_generate(api_params)

      // 通过小程序的网络请求API发送请求 time_delete:'null',
      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'item', biz_id: bizId },
        success: function (result) {
          if (result.data.status == 200) {
            var list = result.data.content
            console.log(list)
            if(id){
              var arr = []
              for (var i = 0; i < list.length; i++) {
                
                if (list[i].item_id == id){
                  arr[0] = list[i]
                }
              }
              console.log(arr)
              that.setData({
                list: arr,
              })
              idSum = id
            }else{
              if (all == 'true') {
                console.log('all')
                var arr = []
                for (var i = 0; i < list.length; i++) {
                  arr[i] = list[i].item_id
                }
                idSum = arr.join(',')
                that.setData({
                  list: list,
                })
              } else {
                wx.getStorage({
                  key: 'list',
                  success: function (res) {
                    list = res.data
                    var arr = []
                    for (var i = 0; i < list.length; i++) {
                      arr[i] = list[i].item_id
                    }
                    idSum = arr.join(',')
                    console.log(list)
                    that.setData({
                      list: list,
                    })
                  },
                  fail: function (err) {
                  }
                })
              }
              console.log(that.data.list)
            }
            }
            
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
    console.log(this.data.list)
  
  },
  getPassword: function (e) {
    password = e.detail.value
  },
  bindDelete:function(e){
    console.log(idSum)
    
    var url = 'item/edit_bulk'
    var params = {}
    var api_result = api_request(url, params)

    console.log(user_id)
    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      app.sign_generate(api_params)

      // 通过小程序的网络请求API发送请求
      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'biz', user_id: user_id, biz_id:bizId, ids: idSum, operation: value, password: password },
        success: function (result) {
          console.log(user_id)
          console.log(password)
          if (result.data.status == 200) {
            wx.showToast({
              title: '商品删除成功',
              icon: 'loading',
              duration: 2000
            })
            wx.redirectTo({
              url: 'result?title="商品操作成功"'
            })
          }
          console.log(result)
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
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
    var that = this
    console.log('onPullDownRefresh')

    wx.showLoading({
      title: '载入中',
    })
    //that.get_biz(that)

    wx.hideLoading()

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
  
  }
})