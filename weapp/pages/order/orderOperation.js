// pages/order/orderOperation.js
var app = getApp()
var orderId = ''
var operationType = ''
var thisType = '自行配送'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: {
      freePostage: 'type-current',
      logistics: '',
      electron: '',
    },
    typeContent: {
      freePostage: 'display:block',
      logistics: 'display:none',
      electron: 'display:none'
    },
    tipsText:'确定要发货？请选择发货方式，并填写相应信息。',
    style:{
      styleSend: 'display:none;',
      styleChangeNumber:'display:none;',
      stylePassword: 'display:none;',
    },
    orderDetail:'',
    obj:{},
    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    orderId = options.id
    operationType = options.opera
    console.log(orderId)
    console.log(operationType)
    if (operationType == 'deliver'){
      that.setData({
        tipsText: '确定要发货？请选择发货方式，并填写相应信息。',
        style: {
          styleSend: 'display:block;',
          styleChangeNumber: 'display:none;',
          stylePassword: 'display:none;',
        },
      })
    } else if (operationType == 'reprice'){
      that.setData({
        tipsText: '订单的应支付金额将减去您输入的改价折扣金额，确定要改价吗？',
        style: {
          styleSend: 'display:none;',
          styleChangeNumber: 'display:block;',
          stylePassword: 'display:none;',
        },
      })
    } else if (operationType == 'accept') {
      that.setData({
        tipsText: '确定要接单？接单后请安排配货，配货完成后请进行发货。',
        style: {
          styleSend: 'display:none;',
          styleChangeNumber: 'display:none;',
          stylePassword: 'display:block;',
        },
      })
    } else if (operationType == 'accept') {
      that.setData({
        tipsText: '确定要退单？用户已支付的款项将原路退回。',
        style: {
          styleSend: 'display:none;',
          styleChangeNumber: 'display:none;',
          stylePassword: 'display:block;',
        },
      })
    }
    
    if (orderId == 'undefined') {
      wx.getStorage({
        key: 'list',
        success: function (res) {
          console.log(res.data)
          var arr = []
          for (var i = 0; i < res.data.length; i++) {
            arr.push(res.data[i].order_id)
          }
          orderId = arr.join(',')
          console.log(orderId)
          that.setData({
            orderDetail: res.data,
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
    } else {
      var url = 'order/detail'
      var params = {}
      var api_result = api_request(url, params)
      //that.initEleWidth();
      // 网络请求
      function api_request(url, api_params) {
        // 生成签名
        //console.log(bizId)
        
        app.sign_generate(api_params)

        wx.request({
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          url: app.globalData.url_api + url,
          data: { app_type: 'item', id: orderId, },
          success: function (result) {
            var thisList=[] 
            thisList[0] = result.data.content
            if (result.data.status == 200) {
              
              
              that.setData({
                orderDetail: thisList,
              });
            } else {

            }
            console.log(result)
          },
          fail: function (result) {
            console.log(result)
            wx.vibrateShort()
          }
        })
      }
    }

  },
  typeClick: function (e) {
    var that = this
    var Type = e.currentTarget.dataset.type
    console.log(thisType)
    var typeContent = that.data.typeContent
    var tab = that.data.tab
    for (var key in typeContent) {
      //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
      if (key == Type) {
        typeContent[key] = 'display:block'
        tab[key] = 'type-current'
      } else {
        typeContent[key] = 'display:none'
        tab[key] = ''
      }
    }
    
    if(Type == 'freePostage'){
      thisType = '自行配送'
    } else if (Type == 'logistics') {
      thisType = '本地配送'
    }else{
      thisType = '物流配送'
    }
    that.setData({
      typeContent: typeContent,
      tab: tab,
    })
    //obj.type = thisType

  },

  bindFormSubmit:function(e){
    var service  = e.detail.value.service
    var waybill = e.detail.value.waybill
    var password = e.detail.value.password
    console.log(service + waybill + password)
    if (service !== ''){
      if (waybill !== '') {
        if (password !== '') {
          wx.getStorage({
            key: 'user',
            success: function (res) {
              console.log(res.data.content)
              var user_id = res.data.content.user_id
              var bizId = res.data.content.biz_id

              var url = 'order/edit_bulk'
              var params = {}
              var api_result = api_request(url, params)
              //that.initEleWidth();
              // 网络请求
              function api_request(url, api_params) {
                // 生成签名
                app.sign_generate(api_params)

                wx.request({
                  method: "POST",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  url: app.globalData.url_api + url,
                  data: { app_type: 'biz', user_id: user_id, ids: orderId, operation: operationType, deliver_method: thisType, deliver_biz: service, waybill_id: waybill, password: password},
                  success: function (result) {
                    var thisList = result.data.content
                    if (result.data.status == 200) {
                      wx.showToast({
                        title: '全部操作成功',
                        icon: 'loading',
                        duration: 2000
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
            fail: function (err) {

            }
          })
        } else {
          wx.showToast({
            title: '密码不能为空',
            icon: 'loading',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: '运单号不能为空',
          icon: 'loading',
          duration: 2000
        })
      }
    }else{
      wx.showToast({
        title: '物流服务商不能为空',
        icon: 'loading',
        duration: 2000
      })
    }
    
    
  },
  acceptFormSubmit:function(e){
    var password = e.detail.value.password
    if (password !== '') {
      wx.getStorage({
        key: 'user',
        success: function (res) {
          console.log(res.data.content)
          var user_id = res.data.content.user_id
          var bizId = res.data.content.biz_id

          var url = 'order/edit_bulk'
          var params = {}
          var api_result = api_request(url, params)
          //that.initEleWidth();
          // 网络请求
          function api_request(url, api_params) {
            // 生成签名
            app.sign_generate(api_params)

            wx.request({
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              url: app.globalData.url_api + url,
              data: { app_type: 'biz', user_id: user_id, ids: orderId, operation: operationType, password: password },
              success: function (result) {
                var thisList = result.data.content
                if (result.data.status == 200) {
                  wx.showToast({
                    title: '全部操作成功',
                    icon: 'loading',
                    duration: 2000
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
        fail: function (err) {

        }
      })
    } else {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    }

  },
  repriceFormSubmit: function (e) {
    var password = e.detail.value.password
    var price = e.detail.value.price
    if (price !== ''){

    }else{
      wx.showToast({
        title: '改价不能为空',
        icon: 'loading',
        duration: 2000
      })
    }
    if (password !== '') {
      wx.getStorage({
        key: 'user',
        success: function (res) {
          console.log(res.data.content)
          var user_id = res.data.content.user_id
          var bizId = res.data.content.biz_id

          var url = 'order/edit_bulk'
          var params = {}
          var api_result = api_request(url, params)
          //that.initEleWidth();
          // 网络请求
          function api_request(url, api_params) {
            // 生成签名
            app.sign_generate(api_params)

            wx.request({
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              url: app.globalData.url_api + url,
              data: { app_type: 'biz', user_id: user_id, ids: orderId, operation: operationType, password: password },
              success: function (result) {
                var thisList = result.data.content
                if (result.data.status == 200) {
                  wx.showToast({
                    title: '全部操作成功',
                    icon: 'loading',
                    duration: 2000
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
        fail: function (err) {

        }
      })
    } else {
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