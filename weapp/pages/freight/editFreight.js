// pages/freight/createFreight.js
var picker = require('../../utils/picker_datetime.js');
var app = getApp()
var obj = {}
var bizId = ''
var temId = ''
var userID=''
obj.type_actual = 'piece'
var name = ''
var time_latest_deliver = ''
var max_amount = ''
var start_amount = ''
var fee_start = ''
var fee_unit = ''
var timestamp = ''
var timestamp2 = ''
var s = ''
var expire = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chargingTab: {
      piece: 'type-current',
      suttle: '',
      gross: '',
      volume: '',
    },
    freePostage:'display:none',
    logistics:'display:none',
    electron:'display:none',
    start: '',
    end: '',
    period: '',
    objectArray: [
      {
        id: 3600,
        name: '1小时'
      },
      {
        id: 7200,
        name: '2小时'
      },
      {
        id: 10800,
        name: '3小时'
      },
      {
        id: 14400,
        name: '4小时'
      }
    ],
    errorStyle: 'display:none',
    errorTips: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.datetimePicker = new picker.pickerDatetime({
      page: this,
      animation: 'slide',
      duration: 500
    });
    var that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res)
        userID = res.data.content.user_id
       
      },
      fail: function (err) {
        console.log(err)
      }
    })
    bizId = options.bizId
    temId = options.tempId
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
        data: { app_type: 'biz', id: temId, },
        success: function (result) {
          console.log(result.data)
          if (result.data.status == 200) {
            if (result.data.content.type==''){
              that.setData({
                freePostage: 'display:block',
                logistics: 'display:none',
                electron: 'display:none',
              })
            } else if (result.data.content.type == '物流配送'){
              that.setData({
                freePostage: 'display:none',
                logistics: 'display:block',
                electron: 'display:none',
              })
            } else if (result.data.content.type == '电子凭证') {
              that.setData({
                freePostage: 'display:none',
                logistics: 'display:none',
                electron: 'display:block',
              })
            }
            that.setData({
              tempObj: result.data.content,
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
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    var index = e.detail.value
    s = this.data.objectArray[index].id
    console.log(s)
  },
  chargingClick: function (e) {
    var that = this
    var thisType = e.currentTarget.dataset.type
    console.log(thisType)
    var tab = that.data.chargingTab
    for (var key in tab) {
      //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
      if (key == thisType) {
        tab[key] = 'type-current'
      } else {
        tab[key] = ''
      }
    }
    that.setData({
      chargingTab: tab,
    })
    obj.type_actual = thisType
  },
  startTap: function () {
    var that = this
    this.datetimePicker.setPicker('startDate');
  },
  endTap: function () {
    this.datetimePicker.setPicker('endDate');
  },
  getName: function (e) {
    name = e.detail.value
    var reg = /^\s*$/g;
    //  如果是空，或者""
    if (name == "" || reg.test(name)) {
      wx.showToast({
        title: '名称不能为空',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getMax: function (e) {
    max_amount = e.detail.value
    //var reg = /[0-9]{4}\.[0-9]{2}/
    if (max_amount > 9999) {
      wx.showToast({
        title: '最高9999',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getStart: function (e) {
    start_amount = e.detail.value
    if (start_amount > 9999) {
      wx.showToast({
        title: '最高9999',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getStartMoney: function (e) {
    fee_start = e.detail.value
    if (fee_start > 9999) {
      wx.showToast({
        title: '最高9999',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getUnitMoney: function (e) {
    fee_unit = e.detail.value
    if (fee_unit > 9999) {
      wx.showToast({
        title: '最高9999',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getExpire: function (e) {
    expire = e.detail.value

  },
  editSubmit:function(e){
    var that = this
    var tempObj = that.data.tempObj
    if (tempObj.type == '') {
      console.log('如果type=空')
      obj.type = '包邮'
      if(name==''){
        obj.name = tempObj.name
        console.log('如果name ==“”')
        
      }else{
        console.log('如果name !==“”')
        obj.name = name 
      }
      
    } else if (tempObj.type == '物流配送') {
      obj.type = '物流配送'
      if (name !== '') {
        obj.name = name
      } else {
        obj.name = tempObj.name
      }
      if (obj.type_actual == 'piece') {
        obj.type_actual = '计件'
      } else if (obj.type_actual == 'suttle') {
        obj.type_actual = '净重'
      } else if (obj.type_actual == 'gross') {
        obj.type_actual = '毛重'
      } else if (obj.type_actual == 'volume') {
        obj.type_actual = '体积重'
      }
      if (max_amount!==''){
        obj.max_amount = max_amount
      }else{
        obj.max_amount = tempObj.max_amount
      }
      if (start_amount !== '') {
        obj.start_amount = start_amount
      } else {
        obj.start_amount = tempObj.start_amount
      }
      if (fee_start !== '') {
        obj.fee_start = fee_start
      } else {
        obj.fee_start = tempObj.fee_start
      }
      if (fee_unit !== '') {
        obj.fee_unit = fee_unit
      } else {
        obj.fee_unit = tempObj.fee_unit
      }
      
      if (s == '') {
        obj.time_latest_deliver = 259200

      } else {
        obj.time_latest_deliver = s
      }
    } else if (tempObj.type == '电子凭证') {
      obj.type = '电子凭证'
      if (name !== '') {
        obj.name = name
      } else {
        obj.name = tempObj.name
      }
      if (that.data.start !== '') {
        obj.time_valid_from = that.data.start
      } else {
        obj.time_valid_from = tempObj.time_valid_from
      }
      if (that.data.end !== '') {
        obj.time_valid_end = that.data.end
      } else {
        obj.time_valid_end = tempObj.time_valid_end
      }
      if (that.data.period !== '') {
        obj.period_valid = that.data.period
      } else {
        obj.period_valid = tempObj.period_valid
      }
      if (that.data.period !== '') {
        obj.expire_refund_rate = expire
      } else {
        obj.expire_refund_rate = tempObj.expire_refund_rate
      }
     
    }

    obj.user_id = userID
    obj.id = temId
    obj.app_type = 'biz'
    var url = 'freight_template_biz/edit'
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
            console.log(result)
            wx.navigateTo({
              url: 'result?title=' + '运费模板修改成功',
            })
          } else {
            console.log(result.data.content.error.message)
            that.setData({
              errorStyle: 'display:block',
              errorTips: result.data.content.error.message
            })
          }

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