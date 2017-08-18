// edit_certain.js
var app = getApp()
var user_id, id, name='', value='',inputValue='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id
    name = options.name
    wx.setNavigationBarTitle({ title: options.text })
    var url = 'biz/detail'
    var params = {}
    var api_result = api_request(url, params)

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
        data: { id: id },
        success: function (result) {

          console.log(result.data.content[name])

        },
        fail: function (result) {
          console.log(result)
        }
      })
    }
    value = options.value
    
    console.log(options.value + options.name + options.id)
    this.setData({
      title: options.text,
      value:options.value
    }) 
   
    wx.getStorage({
      key: 'user',
      success: function (res) {
        user_id = res.data.content.user_id
      },
      fail: function (err) {

      }
    })
  },
  getEditVaue:function(e){
    inputValue=e.detail.value
    if (inputValue==value){
      wx.showToast({
        title: '修改内容与原内容相同',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  edit_certain:function(e){
    // 通过API获取或处理数据
    var url = 'biz/edit_certain'
    var params = {}
    var api_result = api_request(url, params)

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
        data: { app_type: 'biz', id: id, user_id: user_id, name: name, value: inputValue },
        success: function (result) {
          console.log(result.data)
          if (result.data.status == 200) {
            wx.showToast({
              title: '编辑成功',
              icon: 'success',
              duration: 1000
            })
            wx.navigateBack({
              url: '../../pages/biz/detail',
            })
          }
          
        },
        fail: function (result) {
          console.log(result)
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
    var that = this
    var url = 'biz/detail'
    var params = {}
    var api_result = api_request(url, params)

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
        data: { id: id },
        success: function (result) {

          console.log(result.data.content[name])
          that.setData({
            //title: text,
            value: result.data.content[name]
          })

        },
        fail: function (result) {
          console.log(result)
        }
      })
    }
    
   

    wx.getStorage({
      key: 'user',
      success: function (res) {
        user_id = res.data.content.user_id
      },
      fail: function (err) {

      }
    })
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