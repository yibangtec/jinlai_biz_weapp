// pages/freight/index.js
var picker= require('../../utils/picker_datetime.js');
var app = getApp()
var userID = ''
var bizID = ''
var obj = {}
obj.type = 'freePostage'
obj.type_actual ='piece'
var name = ''
var time_latest_deliver=''
var max_amount = ''
var start_amount = ''
var fee_start = ''
var fee_unit = ''
var timestamp = ''
var timestamp2 = ''
var s = ''
var expire=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:{
      freePostage: 'type-current',
      logistics: '',
      electron: '',
    },
    typeContent:{
      freePostage: 'display:block',
      logistics: 'display:none',
      electron: 'display:none'
    },
    freightTab:{
      freightAll: 'tab-current',
      freightRecovery: '',
      freightRecycle: '',
    },
    freightContent:{
      freightAll: 'display:block',
      freightRecovery: 'display:none',
      freightRecycle: 'display:none'
    },
    chargingTab:{
      piece:'type-current',
      suttle: '',
      gross: '',
      volume: '',
    },
    freightNull:'display:none',
    freight:'display:none',
    freightList:[],
    freightBackNull: 'display:none',
    freightBack: 'display:none',
    allDelectedEdit:'display:block',
    allDelected:'display:none',
    allRecoveryEdit: 'display:block',
    allRecovery: 'display:none',
    start: '',
    end: '',
    period:'',
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
    selectedAllStatus: false,
    selectedAll: false,
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
        bizID=res.data.content.biz_id
        userID = res.data.content.user_id
        var url = 'freight_template_biz/index'
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
            data: { biz_id: bizID, time_delete: 'NULL',},
            success: function (result) {
              console.log(result.data)
              if (result.data.status == 200) {
                var list = result.data.content
                for (var i = 0; i < list.length; i++) {
                  list[i].selected = false
                }
                that.setData({
                  freightNull: 'display:none',
                  freight: 'display:block',
                  freightList: list
                }) 
              } else {
                that.setData({
                  freightNull: 'display:block',
                  freight: 'display:none',
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
      fail: function (err) {
        console.log(err)
      }
    })
    
  
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
  allDelectedEdit:function(e){
    var that = this
    that.setData({
      allDelectedEdit: 'display:none',
      allDelected: 'display:block',
    }) 
  },
  allRecoveryEdit: function (e) {
    var that = this
    that.setData({
      allRecoveryEdit: 'display:none',
      allRecovery: 'display:block',
    })
  },
  freightTabClick:function(e){
    var that = this
    var thisType = e.currentTarget.dataset.temp
    console.log(thisType)
    var typeContent = that.data.freightContent
    var tab = that.data.freightTab
    for (var key in typeContent) {
      //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
      if (key == thisType) {
        typeContent[key] = 'display:block'
        tab[key] = 'tab-current'
      } else {
        typeContent[key] = 'display:none'
        tab[key] = ''
      }
    }
    that.setData({
      freightContent: typeContent,
      freightTab: tab,
    }) 
    if (thisType =='freightAll'){
      var url = 'freight_template_biz/index'
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
          data: { biz_id: bizID, time_delete: 'NULL', },
          success: function (result) {
            console.log(result.data)
            if (result.data.status == 200) {
              that.setData({
                freightBackNull: 'display:none',
                freightBack: 'display:block',
                freightList: result.data.content,
                selectedAllStatus: false,
                allDelectedEdit: 'display:block',
                allDelected: 'display:none',
              })
            } else {
              that.setData({
                freightBackNull: 'display:block',
                freightBack: 'display:none',

              })
            }

          },
          fail: function (result) {
            console.log(result)
            wx.vibrateShort()
          }
        })
      }
    } else if (thisType == 'freightRecovery'){
      var url = 'freight_template_biz/index'
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
          data: { biz_id: bizID, time_delete: 'IS NOT NULL', },
          success: function (result) {
            console.log(result.data)
            if (result.data.status == 200) {
              that.setData({
                freightBackNull: 'display:none',
                freightBack: 'display:block',
                freightList: result.data.content,
                selectedAll: false,
                allRecoveryEdit: 'display:block',
                allRecovery: 'display:none',
              })
            } else {
              that.setData({
                freightBackNull: 'display:block',
                freightBack: 'display:none',
              })
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
  typeClick:function(e){
    var that = this
    var thisType = e.currentTarget.dataset.type
    console.log(thisType)
    var typeContent = that.data.typeContent
    var tab = that.data.tab
    for (var key in typeContent) {
      //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
      if (key == thisType) {
        typeContent[key]='display:block'
        tab[key] ='type-current'
      }else{
        typeContent[key] = 'display:none'
        tab[key] = ''
      }
    }
    that.setData({
      typeContent: typeContent,
      tab: tab,
    })
    obj.type = thisType

  },
  chargingClick:function(e){
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
  createFreight:function(e){
    wx.navigateTo({
      url: 'confirm',
    })
  },
  detailClick:function(e){
    var Id = e.currentTarget.dataset.biz
    var pId = e.currentTarget.dataset.tem
    wx.navigateTo({
      url: 'detail?bizId=' + Id + '&tempId=' + pId,
    })
  },
  editBtn:function(e){
    var bId = e.currentTarget.dataset.biz
    var mId = e.currentTarget.dataset.tem
    console.log(e.currentTarget.dataset.temId)
    wx.navigateTo({
      url: 'editFreight?bizId=' + bId + '&tempId=' + mId,
    })
  },
  //点击选中的时候
  bindCheckbox: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = this.data.freightList[index].selected;
    var list = this.data.freightList;
    

    list[index].selected = !selected;

    this.setData({
      freightList: list
    });
  },
  //点击全选的时候
  bindSelectAll: function (e) {
    var selectedAllStatus = this.data.selectedAllStatus;
    var selectedAll = !selectedAllStatus;
    var list = this.data.freightList;

    if (!selectedAllStatus) {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAll;
        //var num = parseInt(this.data.list[i].num);
        //var price = parseInt(this.data.list[i].price);
        //this.setData({
        //count: this.data.count - num * price,
        //number: this.data.number - num

        //});
      }
      this.setData({
        freightList: list,
        selectedAllStatus: true
      });
    } else {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAll;
      }
      this.setData({
        freightList: list,
        selectedAllStatus: false
      });
    }
  },
  //多选删除
  deleteItemAll: function (e) {
    var all = this.data.selectedAllStatus
    var value = e.currentTarget.dataset.value
    var arr = []
    var list = this.data.freightList
    if (this.data.selectedAllStatus === true) {
      console.log(this.data.selectedAllStatus)
      for (var i = 0; i < list.length; i++) {
        arr.push(list[i])
      }

      wx.setStorage({
        key: 'freightList',
        data: arr,
      })
    } else {
      console.log(this.data.selectedAllStatus)
      for (var i = 0; i < list.length; i++) {
        if (list[i].selected == true) {
          arr.push(list[i])
        }
      }
      wx.setStorage({
        key: 'freightList',
        data: arr,
      })
    }
    console.log(arr)
    
    wx.navigateTo({
      url: 'confirm?all=' + all + '&type=' + value,
    })
  },
  bindTipSelectAll: function (e) {
    var selectedAll = this.data.selectedAll;
    var selectedAllTip = !selectedAll;
    var list = this.data.freightList;

    if (!selectedAll) {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAllTip;
        //var num = parseInt(this.data.list[i].num);
        //var price = parseInt(this.data.list[i].price);
        //this.setData({
        //count: this.data.count - num * price,
        //number: this.data.number - num

        //});
      }
      this.setData({
        freightList: list,
        selectedAll: true
      });
    } else {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAllTip;
      }
      this.setData({
        freightList: list,
        selectedAll: false
      });
    }
  },
  delTem: function (e) {
    var Id = e.currentTarget.dataset.tem
    var value = e.currentTarget.dataset.value
    console.log(Id)
    wx.navigateTo({
      url: 'confirm?tempId=' + Id + '&type='+value,
    })
  },
  //单个删除
 
  backTem: function (e) {
    var Id = e.currentTarget.dataset.tem
    var value = e.currentTarget.dataset.value
    console.log(Id)
    wx.navigateTo({
      url: 'confirm?tempId=' + Id + '&type=' + value,
    })
  },
  backTemAll: function (e) {
    var all = this.data.selectedAll
    var value = e.currentTarget.dataset.value
    var arr = []
    var list = this.data.freightList
    if (this.data.selectedAll === true) {
      console.log(this.data.selectedAll)
      for (var i = 0; i < list.length; i++) {
        arr.push(list[i])
      }

      wx.setStorage({
        key: 'freightList',
        data: arr,
      })
    } else {
      console.log(this.data.selectedAll)
      for (var i = 0; i < list.length; i++) {
        if (list[i].selected == true) {
          arr.push(list[i])
        }
      }
      wx.setStorage({
        key: 'freightList',
        data: arr,
      })
    }
    console.log(arr)

    wx.navigateTo({
      url: 'confirm?all=' + all + '&type=' + value,
    })
  },
  startTap: function () {
    var that = this
    this.datetimePicker.setPicker('startDate');
  },
  endTap: function () {
    this.datetimePicker.setPicker('endDate');
  },
  getName:function(e){
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
  getMax:function(e){
    max_amount = e.detail.value
    //var reg = /[0-9]{4}\.[0-9]{2}/
    if (max_amount>9999) {
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
  getExpire:function(e){
    expire = e.detail.value

  },
  creatBtn:function(e){
    var that =this

    if (obj.type =='freePostage'){
      
      for (var key in obj) {
        //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
        if (obj[key] == 'freePostage') {
          obj.type = '包邮'
          obj.name = name
        } else {
          delete obj[key]
        }
      }
    } else if (obj.type == 'logistics') {
      for (var key in obj) {
        //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
        if (obj[key] == 'logistics') {
          obj.type = '物流配送'
          obj.name = name
          if (obj.type_actual == 'piece') {
            obj.type_actual = '计件'
          } else if (obj.type_actual == 'suttle') {
            obj.type_actual = '净重'
          } else if (obj.type_actual == 'gross') {
            obj.type_actual = '毛重'
          } else if (obj.type_actual == 'volume') {
            obj.type_actual = '体积重'
          }
          obj.max_amount = max_amount
          obj.start_amount = start_amount
          obj.fee_start = fee_start
          obj.fee_unit = fee_unit
          if(s == ''){
            obj.time_latest_deliver = 259200
            
          }else{
            obj.time_latest_deliver = s
          }
          
        } else {
          //delete obj[key]
        }
      }
        
    } else if (obj.type == 'electron') {
      for (var key in obj) {
        //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
        if (obj[key] == 'electron') {
          obj.type = '电子凭证'
          obj.name = name
          obj.time_valid_from = that.data.start
          obj.time_valid_end = that.data.end
          obj.period_valid = that.data.period
          obj.expire_refund_rate = expire
        } else {
          delete obj[key]
        }
      }
      
    }

    obj.user_id = userID
    obj.biz_id = bizID
    obj.app_type = 'biz'
    var url = 'freight_template_biz/create'
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
              url: 'result?title='+'运费模板创建成功',
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