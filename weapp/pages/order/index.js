// pages/order/index.js
var app = getApp()
var multiple = ''
var bizId = ''
function formatDateTime(timeStamp) {
  var date = new Date();
  date.setTime(timeStamp * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabListStatus:'block',
    tabDisplay:'display:none',
    orderList:'',
    orderEditBtn:'display:block',
    selectedBtn:'display:none',
    selectedAllStatus: false,
    currentObj:{
      all:'current-list',
      jiedan:'',
      fahuo:'',
      shouhuo:'',
      pignjia:'',
      wancheng:'',
      tuikuan:'',
    },
    currentStatus:'所有',
    currentTab:{
      first:'tab-current',
      center:'',
      last:''
    },
    currentBottom:'',  
    triangleSrc:'../../image/order/sanjiao@3x.png',
    operationData:'',
    all: 'display:none',
    send: 'display:none',
    daijiedan: 'display:none',
    daishouhuo: 'display:none',
    daipignjia: 'display:none',
    yiwancheng: 'display:none',
    yituikuan: 'display:none',
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data.content)
        //var user_id = res.data.content.user_id
        bizId = res.data.content.biz_id
        
        var url = 'order/index'
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
            data: { app_type: 'item', biz_id: bizId, },
            success: function (result) {
              var thisList = result.data.content
              if (result.data.status == 200) {
                for (var i = 0; i < thisList.length; i++) {
                  //result.data.content[i].txtStyle = ""
                  thisList[i].selected = false
                  thisList[i].time_create = formatDateTime(thisList[i].time_create)
                }
                that.setData({
                  orderList: thisList,
                });
              } else {
                that.setData({ 
                  orderList: [],
                });
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
    

  
  },
  orderDetail:function(e){
    var order_id = e.currentTarget.dataset.order
    console.log(order_id)
    wx.navigateTo({
      url: 'detail?orderId=' + order_id
    })
  },
  
  tabList:function(e){
    
    
    if (this.data.tabListStatus == 'block'){

      this.setData({
        tabListStatus: 'none',
        tabDisplay:'display:block'
      });
    }else {
      this.setData({
        tabListStatus: 'block',
        tabDisplay: 'display:none'
      });
    }
  },
  tabNone:function(e){
    this.setData({
      tabListStatus: 'block',
      tabDisplay: 'display:none'
    });
  },
  editClick:function(e){
    this.setData({
      orderEditBtn: 'display:none',
      selectedBtn: 'display:block',
    });
  },
  escEdit:function(e){
    this.setData({
      orderEditBtn: 'display:block',
      selectedBtn: 'display:none',
    });
  },
  bindSelectAll: function (e) {
    var selectedAllStatus = this.data.selectedAllStatus;
    console.log(selectedAllStatus)
    var selectedAll = !selectedAllStatus;
    var list = this.data.orderList;

    if (!selectedAllStatus) {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAll;
      }
      this.setData({
        orderList: list,
        selectedAllStatus: true
      });
    } else {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAll;
      }
      this.setData({
        orderList: list,
        selectedAllStatus: false
      });
    }
  },
  bindCheckbox: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = this.data.orderList[index].selected;
    var list = this.data.orderList;
    
    list[index].selected = !selected;

    this.setData({
      orderList: list
    });
  },
  orderSend: function (e) {
    var orderId = e.currentTarget.dataset.id
    var operationType = e.currentTarget.dataset.name
    console.log(orderId)
    var arr = []
    var list = this.data.orderList
    if (this.data.selectedAllStatus === true) {
      console.log(this.data.selectedAllStatus)
      for (var i = 0; i < list.length; i++) {
        arr[i] = list[i]
      }
      wx.setStorage({
        key: 'list',
        data: arr,
      })
    } else {
      console.log(this.data.selectedAllStatus)
      for (var i = 0; i < list.length; i++) {
        if (list[i].selected === true) {
          arr.push(list[i])
        }
      }
      wx.setStorage({
        key: 'list',
        data: arr,
      })
    }
    console.log(arr)
    
    wx.navigateTo({
      url: 'orderOperation?id=' + orderId + '&opera=' + operationType,
    })

  },
  
  orderNote: function (e) {
    var orderId = e.currentTarget.dataset.id
    var operationType = e.currentTarget.dataset.name
    console.log(orderId)
    var arr = []
    var list = this.data.orderList
    if (this.data.selectedAllStatus === true) {
      console.log(this.data.selectedAllStatus)
      for (var i = 0; i < list.length; i++) {
        arr[i] = list[i]
      }
      wx.setStorage({
        key: 'list',
        data: arr,
      })
    } else {
      console.log(this.data.selectedAllStatus)
      for (var i = 0; i < list.length; i++) {
        if (list[i].selected === true) {
          arr.push(list[i])
        }
      }
      wx.setStorage({
        key: 'list',
        data: arr,
      })
    }
    console.log(arr)
    wx.navigateTo({
      url: 'orderNote?id=' + orderId + '&opera=' + 'note',
    })
  },
  ListContent:function(e){
    var that = this
    var status = e.currentTarget.dataset.status
    if (status =='待接单'){
      var url = 'order/index'
      var params = {}
      var api_result = api_request(url, params)
      //that.initEleWidth();
      // 网络请求
      function api_request(url, api_params) {
        // 生成签名
        //console.log(bizId)
        console.log(app.globalData.url_api + url)
        app.sign_generate(api_params)

        wx.request({
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          url: app.globalData.url_api + url,
          data: { app_type: 'item', biz_id: bizId, limit: 20, status: '待接单' },
          success: function (result) {
            var thisList = result.data.content
            if (result.data.status == 200) {
              
              for (var i = 0; i < thisList.length; i++) {
                console.log('thisArr')
                thisList[i].selected = false
                thisList[i].time_create = formatDateTime(thisList[i].time_create)
                
              }
              that.setData({
                orderList: thisList,
                currentStatus: '待接单',
                currentObj: {
                  all: '',
                  jiedan: 'current-list',
                  fahuo: '',
                  shouhuo: '',
                  pignjia: '',
                  wancheng: '',
                  tuikuan: '',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
                all: 'display:none',
                send: 'display:none',
                daijiedan: 'display:block',
                daishouhuo: 'display:none',
                daipignjia: 'display:none',
                yiwancheng: 'display:none',
                yituikuan: 'display:none',
                orderEditBtn: 'display:block',
                selectedBtn: 'display:none',
              });
            } else {
              that.setData({
                orderList: [],
                currentStatus: '待接单',
                currentObj: {
                  all: '',
                  jiedan: 'current-list',
                  fahuo: '',
                  shouhuo: '',
                  pignjia: '',
                  wancheng: '',
                  tuikuan: '',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
                all: 'display:none',
                send: 'display:none',
                daijiedan: 'display:none',
                daishouhuo: 'display:none',
                daipignjia: 'display:none',
                yiwancheng: 'display:none',
                yituikuan: 'display:none',
                orderEditBtn: 'display:block',
                selectedBtn: 'display:none',
              });
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
    else if (status == '待发货'){
      var url = 'order/index'
      var params = {}
      var api_result = api_request(url, params)
      //that.initEleWidth();
      // 网络请求
      function api_request(url, api_params) {
        // 生成签名
        //console.log(bizId)
        console.log(app.globalData.url_api + url)
        app.sign_generate(api_params)

        wx.request({
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          url: app.globalData.url_api + url,
          data: { app_type: 'item', biz_id: bizId, limit: 20, status: '待发货' },
          success: function (result) {
            var thisList = result.data.content
            if (result.data.status == 200) {
              
              for (var i = 0; i < thisList.length; i++) {
                console.log('thisArr')
                thisList[i].selected = false
                thisList[i].time_create = formatDateTime(thisList[i].time_create)
              }
              that.setData({
                orderList: thisList,
                currentStatus: '待发货',
                currentObj: {
                  all: '',
                  jiedan: '',
                  fahuo: 'current-list',
                  shouhuo: '',
                  pignjia: '',
                  wancheng: '',
                  tuikuan: '',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
                all: 'display:none',
                send: 'display:block',
                daijiedan: 'display:none',
                daishouhuo: 'display:none',
                daipignjia: 'display:none',
                yiwancheng: 'display:none',
                yituikuan: 'display:none',
                orderEditBtn: 'display:block',
                selectedBtn: 'display:none',
              });
            } else {
              that.setData({
                orderList: [],
                currentStatus: '待发货',
                currentObj: {
                  all: '',
                  jiedan: '',
                  fahuo: 'current-list',
                  shouhuo: '',
                  pignjia: '',
                  wancheng: '',
                  tuikuan: '',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
                all: 'display:none',
                send: 'display:none',
                daijiedan: 'display:none',
                daishouhuo: 'display:none',
                daipignjia: 'display:none',
                yiwancheng: 'display:none',
                yituikuan: 'display:none',
                orderEditBtn: 'display:block',
                selectedBtn: 'display:none',
              });
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
    else if (status == '待收货') {
      var url = 'order/index'
      var params = {}
      var api_result = api_request(url, params)
      //that.initEleWidth();
      // 网络请求
      function api_request(url, api_params) {
        // 生成签名
        //console.log(bizId)
        console.log(app.globalData.url_api + url)
        app.sign_generate(api_params)

        wx.request({
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          url: app.globalData.url_api + url,
          data: { app_type: 'item', biz_id: bizId, limit: 20, status: '待收货' },
          success: function (result) {
            var thisList = result.data.content
            if (result.data.status == 200) {
              
              for (var i = 0; i < thisList.length; i++) {
                console.log('thisArr')
                thisList[i].selected = false
                thisList[i].time_create = formatDateTime(thisList[i].time_create)
              
              }
              that.setData({
                orderList: thisList,
                currentStatus: '待收货',
                currentObj: {
                  all: '',
                  jiedan: '',
                  fahuo: '',
                  shouhuo: 'current-list',
                  pignjia: '',
                  wancheng: '',
                  tuikuan: '',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
                all: 'display:none',
                send: 'display:none',
                daijiedan: 'display:none',
                daishouhuo: 'display:block',
                daipignjia: 'display:none',
                yiwancheng: 'display:none',
                yituikuan: 'display:none',
                orderEditBtn: 'display:block',
                selectedBtn: 'display:none',
              });
            } else {
              that.setData({
                orderList: [],
                currentStatus: '待收货',
                currentObj: {
                  all: '',
                  jiedan: '',
                  fahuo: '',
                  shouhuo: 'current-list',
                  pignjia: '',
                  wancheng: '',
                  tuikuan: '',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
                all: 'display:none',
                send: 'display:none',
                daijiedan: 'display:none',
                daishouhuo: 'display:none',
                daipignjia: 'display:none',
                yiwancheng: 'display:none',
                yituikuan: 'display:none',
                orderEditBtn: 'display:block',
                selectedBtn: 'display:none',
              });
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
    else if (status == '待评价') {
      var url = 'order/index'
      var params = {}
      var api_result = api_request(url, params)
      //that.initEleWidth();
      // 网络请求
      function api_request(url, api_params) {
        // 生成签名
        //console.log(bizId)
        console.log(app.globalData.url_api + url)
        app.sign_generate(api_params)

        wx.request({
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          url: app.globalData.url_api + url,
          data: { app_type: 'item', biz_id: bizId, limit: 20, status: '待评价' },
          success: function (result) {
            var thisList = result.data.content
            if (result.data.status == 200) {
              
              for (var i = 0; i < thisList.length; i++) {
                console.log('thisArr')
                thisList[i].selected = false
                thisList[i].time_create = formatDateTime(thisList[i].time_create)
               
              }
              that.setData({
                orderList: thisList,
                currentStatus: '待评价',
                currentObj: {
                  all: '',
                  jiedan: '',
                  fahuo: '',
                  shouhuo: '',
                  pignjia: 'current-list',
                  wancheng: '',
                  tuikuan: '',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
                all: 'display:none',
                send: 'display:none',
                daijiedan: 'display:none',
                daishouhuo: 'display:none',
                daipignjia: 'display:block',
                yiwancheng: 'display:none',
                yituikuan: 'display:none',
                orderEditBtn: 'display:block',
                selectedBtn: 'display:none',
              });
            } else {
              that.setData({
                orderList: [],
                currentStatus: '待评价',
                currentObj: {
                  all: '',
                  jiedan: '',
                  fahuo: '',
                  shouhuo: '',
                  pignjia: 'current-list',
                  wancheng: '',
                  tuikuan: '',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
                all: 'display:none',
                send: 'display:none',
                daijiedan: 'display:none',
                daishouhuo: 'display:none',
                daipignjia: 'display:none',
                yiwancheng: 'display:none',
                yituikuan: 'display:none',
                orderEditBtn: 'display:block',
                selectedBtn: 'display:none',
              });
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
    else if (status == '已完成') {
      var url = 'order/index'
      var params = {}
      var api_result = api_request(url, params)
      //that.initEleWidth();
      // 网络请求
      function api_request(url, api_params) {
        // 生成签名
        //console.log(bizId)
        console.log(app.globalData.url_api + url)
        app.sign_generate(api_params)

        wx.request({
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          url: app.globalData.url_api + url,
          data: { app_type: 'item', biz_id: bizId, limit: 20, status: '已完成' },
          success: function (result) {
            var thisList = result.data.content
            if (result.data.status == 200) {
              
              for (var i = 0; i < thisList.length; i++) {
                console.log('thisArr')
                thisList[i].selected = false
                thisList[i].time_create = formatDateTime(thisList[i].time_create)
              
              }
              that.setData({
                orderList: thisList,
                currentStatus: '已完成',
                currentObj: {
                  all: '',
                  jiedan: '',
                  fahuo: '',
                  shouhuo: '',
                  pignjia: '',
                  wancheng: 'current-list',
                  tuikuan: '',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
                all: 'display:none',
                send: 'display:none',
                daijiedan: 'display:none',
                daishouhuo: 'display:none',
                daipignjia: 'display:none',
                yiwancheng: 'display:block',
                yituikuan: 'display:none',
                orderEditBtn: 'display:block',
                selectedBtn: 'display:none',
              });
            } else {
              that.setData({
                orderList: [],
                currentStatus: '已完成',
                currentObj: {
                  all: '',
                  jiedan: '',
                  fahuo: '',
                  shouhuo: '',
                  pignjia: '',
                  wancheng: 'current-list',
                  tuikuan: '',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
                all: 'display:none',
                send: 'display:none',
                daijiedan: 'display:none',
                daishouhuo: 'display:none',
                daipignjia: 'display:none',
                yiwancheng: 'display:none',
                yituikuan: 'display:none',
                orderEditBtn: 'display:block',
                selectedBtn: 'display:none',
              });
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
    else if (status == '已退款') {
      var url = 'order/index'
      var params = {}
      var api_result = api_request(url, params)
      //that.initEleWidth();
      // 网络请求
      function api_request(url, api_params) {
        // 生成签名
        //console.log(bizId)
        console.log(app.globalData.url_api + url)
        app.sign_generate(api_params)

        wx.request({
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          url: app.globalData.url_api + url,
          data: { app_type: 'item', biz_id: bizId, limit: 20, status: '已退款' },
          success: function (result) {
            var thisList = result.data.content
            if (result.data.status == 200) {
              
              for (var i = 0; i < thisList.length; i++) {
                console.log('thisArr')
                thisList[i].selected = false
                thisList[i].time_create = formatDateTime(thisList[i].time_create)
                
              }
              that.setData({
                orderList: thisList,
                currentStatus: '已退款',
                currentObj: {
                  all: '',
                  jiedan: '',
                  fahuo: '',
                  shouhuo: '',
                  pignjia: '',
                  wancheng: '',
                  tuikuan: 'current-list',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
                all: 'display:none',
                send: 'display:none',
                daijiedan: 'display:none',
                daishouhuo: 'display:none',
                daipignjia: 'display:none',
                yiwancheng: 'display:none',
                yituikuan: 'display:block',
                orderEditBtn: 'display:block',
                selectedBtn: 'display:none',
              });
            } else {
              that.setData({
                orderList: [],
                currentStatus: '已退款',
                currentObj: {
                  all: '',
                  jiedan: '',
                  fahuo: '',
                  shouhuo: '',
                  pignjia: '',
                  wancheng: '',
                  tuikuan: 'current-list',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
                all: 'display:none',
                send: 'display:none',
                daijiedan: 'display:none',
                daishouhuo: 'display:none',
                daipignjia: 'display:none',
                yiwancheng: 'display:none',
                yituikuan: 'display:none',
                orderEditBtn: 'display:block',
                selectedBtn: 'display:none',
              });
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
    else{
      var url = 'order/index'
      var params = {}
      var api_result = api_request(url, params)
      //that.initEleWidth();
      // 网络请求
      function api_request(url, api_params) {
        // 生成签名
        //console.log(bizId)
        console.log(app.globalData.url_api + url)
        app.sign_generate(api_params)

        wx.request({
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          url: app.globalData.url_api + url,
          data: { app_type: 'item', biz_id: bizId, limit: 20, },
          success: function (result) {
            var thisList = result.data.content
            if (result.data.status == 200) {
              for (var i = 0; i < thisList.length; i++) {
                //result.data.content[i].txtStyle = ""
                thisList[i].selected = false
                thisList[i].time_create = formatDateTime(thisList[i].time_create)
              }
              that.setData({
                orderList: thisList,
                currentStatus: '所有',
                currentObj: {
                  all: 'current-list',
                  jiedan: '',
                  fahuo: '',
                  shouhuo: '',
                  pignjia: '',
                  wancheng: '',
                  tuikuan: '',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
              });
            } else {
              that.setData({
                orderList: [],
                currentStatus: '所有',
                currentObj: {
                  all: 'current-list',
                  jiedan: '',
                  fahuo: '',
                  shouhuo: '',
                  pignjia: '',
                  wancheng: '',
                  tuikuan: '',
                },
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                triangleSrc: '../../image/order/sanjiao@3x.png',
              });
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
  waitJiedan: function (e) {
    var that = this
    var url = 'order/index'
    var params = {}
    var api_result = api_request(url, params)
    //that.initEleWidth();
    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      //console.log(bizId)
      console.log(app.globalData.url_api + url)
      app.sign_generate(api_params)

      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'item', biz_id: bizId, limit: 20, status: '待接单' },
        success: function (result) {
          var thisList = result.data.content
          if (result.data.status == 200) {
            
            for (var i = 0; i < thisList.length; i++) {
              console.log('thisArr')
              thisList[i].selected = false
              thisList[i].time_create = formatDateTime(thisList[i].time_create)
            }
            
            that.setData({
              orderList: thisList,
              currentStatus: '待接单',
              currentObj: {
                all: '',
                jiedan: 'current-list',
                fahuo: '',
                shouhuo: '',
                pignjia: '',
                wancheng: '',
                tuikuan: '',
              },
              currentTab: {
                first: '',
                center: 'tab-current',
                last: ''
              },
              triangleSrc:'../../image/order/heisanjiao@3x.png',
              all: 'display:none',
              send: 'display:none',
              daijiedan: 'display:block',
              daishouhuo: 'display:none',
              daipignjia: 'display:none',
              yiwancheng: 'display:none',
              yituikuan: 'display:none',
              orderEditBtn: 'display:block',
              selectedBtn: 'display:none',
            });
          } else {
            that.setData({
              orderList: [],
              currentStatus: '待接单',
              currentObj: {
                all: '',
                jiedan: 'current-list',
                fahuo: '',
                shouhuo: '',
                pignjia: '',
                wancheng: '',
                tuikuan: '',
              },
              currentTab: {
                first: '',
                center: 'tab-current',
                last: ''
              },
              triangleSrc: '../../image/order/heisanjiao@3x.png',
              all: 'display:none',
              send: 'display:none',
              daijiedan: 'display:none',
              daishouhuo: 'display:none',
              daipignjia: 'display:none',
              yiwancheng: 'display:none',
              yituikuan: 'display:none',
              orderEditBtn: 'display:block',
              selectedBtn: 'display:none',
            });
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
  waitfahuo: function (e) {
    var that = this
    var url = 'order/index'
    var params = {}
    var api_result = api_request(url, params)
    //that.initEleWidth();
    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      //console.log(bizId)
      console.log(app.globalData.url_api + url)
      app.sign_generate(api_params)

      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: {
          app_type: 'item', biz_id: bizId, limit: 20, status: '待发货' },
        success: function (result) {
          var thisList = result.data.content
          if (result.data.status == 200) {
            
            for (var i = 0; i < thisList.length; i++) {
              console.log('thisArr')
              thisList[i].selected = false
              thisList[i].time_create = formatDateTime(thisList[i].time_create)
            }
            that.setData({
              orderList: thisList,
              currentStatus: '待发货',
              currentObj: {
                all: '',
                jiedan: '',
                fahuo: 'current-list',
                shouhuo: '',
                pignjia: '',
                wancheng: '',
                tuikuan: '',
              },
              currentTab: {
                first: '',
                center: '',
                last: 'tab-current'
              },
              triangleSrc: '../../image/order/heisanjiao@3x.png',
              all: 'display:none',
              send: 'display:block',
              daijiedan: 'display:none',
              daishouhuo: 'display:none',
              daipignjia: 'display:none',
              yiwancheng: 'display:none',
              yituikuan: 'display:none',
              orderEditBtn: 'display:block',
              selectedBtn: 'display:none',
            });
          } else {
            that.setData({
              orderList: [],
              currentStatus: '待发货',
              currentObj: {
                all: '',
                jiedan: '',
                fahuo: 'current-list',
                shouhuo: '',
                pignjia: '',
                wancheng: '',
                tuikuan: '',
              },
              currentTab: {
                first: '',
                center: '',
                last: 'tab-current'
              },
              triangleSrc: '../../image/order/heisanjiao@3x.png',
              all: 'display:none',
              send: 'display:none',
              daijiedan: 'display:none',
              daishouhuo: 'display:none',
              daipignjia: 'display:none',
              yiwancheng: 'display:none',
              yituikuan: 'display:none',
              orderEditBtn: 'display:block',
              selectedBtn: 'display:none',
            });
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