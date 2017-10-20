// pages/freight/confirm.js
var app = getApp()
var obj = {}
var all = ''
var bizId = ''
var idSum = ''
var password = ''
var id = ''
var value = ''
var tempId = ''
var userID = ''
var typeT=''
var list=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    tempObj:'',
    errorStyle:'display:none',
    errorTips:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    typeT = options.type
    all=options.all
    tempId = options.tempId
    console.log(tempId)
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res)
        userID = res.data.content.user_id
        bizId = res.data.content.biz_id
      },
      fail: function (err) {
        console.log(err)
      }
    })
    if (typeT == 'delete') {
      that.setData({
        title: '删除运费模板'
      })
      wx.setNavigationBarTitle({ title: '删除运费模板' })

    } else if (typeT == 'restore') {
      that.setData({
        title: '恢复运费模板'
      })
      wx.setNavigationBarTitle({ title: '恢复运费模板' })
    }

    
       
    if (all == 'true'){
      wx.getStorage({
        key: 'freightList',
        success: function (res) {
          console.log(res.data)
          var arr = []
          for (var i = 0; i < res.data.length; i++) {
            arr.push(res.data[i].template_id)
          }
          idSum = arr.join(',')
          that.setData({
            tempObj: res.data
          })
          console.log('zheshi all')
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }else if(all=='false'){
      wx.getStorage({
        key: 'freightList',
        success: function (res) {
          console.log(res)
          that.setData({
            tempObj: res.data
          })
          var arr = []
          for (var i = 0; i < res.data.length; i++) {
            arr.push(res.data[i].template_id)
          }
          idSum = arr.join(',')
          console.log(res.data)
          that.setData({
            tempObj: res.data
          })

        },
        fail: function (err) {
          console.log(err)
        }
      })
    } else if (tempId){
      console.log('zheshi id')
      var url = 'freight_template_biz/detail'
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
          data: { app_type: 'biz', id: tempId, },
          success: function (result) {
            console.log(result.data)
            if (result.data.status == 200) {
              idSum = tempId
              var arr=[]
              arr[0] = result.data.content
              that.setData({
                tempObj: arr,
              })

            } else {

            }

          },
          fail: function (result) {
            console.log(result)
            wx.vibrateShort()
          }
        })
      }
    }
    
  },
  getPassword:function(e){
    password = e.detail.value
    
  },
  bindDelete: function (e) {
    var that = this
    console.log(idSum)
    if (password !=='' || password){
      var url = 'freight_template_biz/edit_bulk'
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
          data: { app_type: 'biz', user_id: userID, biz_id: bizId, ids: idSum, operation: typeT, password: password },
          success: function (result) {
            //console.log(user_id)
            //console.log(password)
            if (result.data.status == 200) {
              wx.redirectTo({
                url: 'result?title=运费模板操作成功'
              })
            }else{
              console.log(result.data.content.error.message)
              that.setData({
                errorStyle: 'display:block',
                errorTips: result.data.content.error.message
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
    }else{
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 2000
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