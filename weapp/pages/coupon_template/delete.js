// pages/coupon_template/delete.js
var app = getApp()
var user_id = ''
var bizId = ''
var ids = ''
var operation = ''
var password = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:'',
    text:'',
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
      that.setData({
        item: prePage.data.itemIds,
      })
      if (options.Id == 'ids') {
        console.log('ids')
        var list = prePage.data.itemIds
        var idsArr = []
        for (var i = 0; i < list.length; i++) {
          idsArr.push(list[i].template_id)
        }
        ids = idsArr.join(',')
        console.log(ids)
      } else {
        console.log('id')
        ids = options.Id

      }
    }
    
    operation = options.opera
    console.log(operation)
    if (operation == 'delete'){
      that.setData({
        text: '删除'
      })

    } else if (operation == 'recovery'){
      that.setData({
        text: '恢复'
      })
    }
    wx.setNavigationBarTitle({ title: that.data.text })
    
    
  },
  getPassword:function(e){
    password = e.detail.value
  },
  acceptFormSubmit:function(e){
    var that = this

    if (password.trim().length < 6) {
      wx.showToast({
        title: '密码长度不能小于6位',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    }else{

      wx.getStorage({
        key: 'user',
        success: function (res) {
          console.log(res.data.content)
          user_id = res.data.content.user_id
          bizId = res.data.content.biz_id
  
          var url = 'coupon_template/edit_bulk'
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
              data: { app_type: 'biz', ids: ids, user_id:user_id, password: password, operation: operation },
              success: function (result) {
                if (result.data.status == 200) {
                  console.log(result.data)
                  wx.showToast({
                    title: that.data.text + '成功',
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