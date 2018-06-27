// pages/team/edit.js
var app = getApp()
var bizId = ''
var user_id = ''
var id = ''
var obj = {}
var name = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:'',
    statusType:{
      normal:'status-type',
      frozen:''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    id = options.Id
    obj.id = options.Id
    var url = 'stuff/detail'
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
        data: { id: id, },
        success: function (result) {
          console.log(result.data)
          that.setData({
            item: result.data.content
          })
          if (result.data.content.status == '正常'){
            that.setData({
              statusType: {
                normal: 'status-type',
                frozen: ''
              },
            })
          }else{
            that.setData({
              statusType: {
                normal: '',
                frozen: 'status-type'
              },
            })
          }
          obj.mobile = result.data.content.mobile
          obj.role = result.data.content.role
          obj.level = result.data.content.level
          obj.status = result.data.content.status
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
  },
  getName: function (e) {
    var name = e.detail.value
    console.log(name)
    if (name.trim().length > 0) {
      this.setData({
        errorTips: '',
        tipsDisplay: 'display:none'
      });
      obj.fullname = name
    } else {
      this.setData({
        errorTips: '姓名不能为空',
        tipsDisplay: 'display:block'
      });
    }
  },
  statusType:function(e){
    var that = this
    var thisType = e.currentTarget.dataset.status
    console.log(thisType)
    if (thisType == '正常'){
      that.setData({
        statusType: {
          normal: 'status-type',
          frozen: ''
        }
      })
      obj.status = '正常'
    } else if (thisType == '冻结'){
      that.setData({
        statusType: {
          normal: '',
          frozen: 'status-type'
        }
      })
      obj.status = '冻结'
    }
  },
  submitEdit:function(e){
    var that = this
    obj.app_type = 'biz'
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data.content)
        user_id = res.data.content.user_id
        bizId = res.data.content.biz_id
        obj.user_id = res.data.content.user_id
        obj.biz_id = res.data.content.biz_id
        var url = 'stuff/edit'
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
            data: obj,
            success: function (result) {
              if (result.data.status == 200) {
                console.log(result.data)
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                var pages = getCurrentPages(); // 当前页面  
                var beforePage = pages[pages.length - 2]; // 前一个页面  
                // console.log("beforePage");  
                // console.log(beforePage);  
                wx.navigateBack({
                  success: function () {
                    beforePage.onLoad(); // 执行前一个页面的onLoad方法  
                  }
                });


              } else {
                console.log(result.data)
              }
            },
            fail: function (result) {
              console.log(result)
              wx.vibrateShort()
            }
          })
        }
      },
      fail: function (err) {

      }
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