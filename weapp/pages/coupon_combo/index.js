// pages/coupon_combo/index.js
function tr(stamp) {
  //var objD = new Date();
  var objD = new Date(stamp * 1000);

  var yy = objD.getYear();
  if (yy < 1900) yy = yy + 1900;

  var MM = objD.getMonth() + 1;
  if (MM < 10) MM = '0' + MM;

  var dd = objD.getDate();
  if (dd < 10) dd = '0' + dd;

  var hh = objD.getHours();
  if (hh < 10) hh = '0' + hh;

  var mm = objD.getMinutes();
  if (mm < 10) mm = '0' + mm;

  var ss = objD.getSeconds();
  if (ss < 10) ss = '0' + ss;

  return yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
}
var app = getApp()
var pickerFile = require('../../utils/picker_datetime.js');
var user_id = ''
var bizId = ''
var couponObj = {}
var timestamp = ''
var timestamp2 = ''
var objectArray = []
var objectBizArray = []
var obj = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: {
      first: 'tab-current',
      center: '',
      last: ''
    },
    isSelect: 'display:none;',
    isEdit: 'display:block;',
    isAll: 'display:none;',
    item: '',
    listAll: 'display:block',
    listCreat: 'display:none',
    selectedAll: false,
    selectedAllStatus: false,
    couponStyle:'display:block',
    couponCreate: 'display:none',
    tipsError: 'display:none',
    textError: '',
    start: '',
    end: '',
    itemIds: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.datetimePicker = new pickerFile.pickerDatetime({
      page: this,
      animation: 'slide',
      duration: 500
    });
    wx.getStorage({
      key: 'user',
      success: function (res) {
        user_id = res.data.content.user_id
        console.log(user_id)
        bizId = res.data.content.biz_id
        console.log(bizId)
        var url = 'coupon_combo/index'
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
            data: { limit: 10, biz_id: bizId, user_id: user_id, app_type: 'biz',},
            success: function (result) {
              console.log(result.data)
              if (result.data.status == 200){
                var list = result.data.content
                for (var i = 0; i < list.length; i++) {
                  list[i].selected = false
                  if (list[i].time_start == null){
                    list[i].time_start = ''
                  } else if (list[i].time_start == 0){

                  }else{
                    var d = tr(list[i].time_start)
                    //console.log(d)
                    list[i].time_start = d
                  }
                  if (list[i].time_end == null) {
                    list[i].time_end = ''
                  } else if (list[i].time_end == 0) {

                  } else {
                    var end = tr(list[i].time_end)
                    //console.log(end)
                    list[i].time_end = end
                  }
                  
                }
                that.setData({
                  item: list
                })
              }else{
                that.setData({
                  couponStyle: 'display:none'
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

      }
    })
   
  },
  allCategory: function (e) {
    var that = this
    that.setData({
      currentTab: {
        first: 'tab-current',
        center: '',
        last: ''
      },
      listAll: 'display:block',
      listCreat: 'display:none',
      footedStyle: 'display:block',
      footedBar: 'display:block',
      isSelect: 'display:none;',
      isEdit: 'display:block;',
      isAll: 'display:none;',
      selectedAllStatus: false,
      couponCreate: 'display:none'
    })
    var url = 'coupon_combo/index'
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
        data: { limit: 10, biz_id: bizId, app_type: 'biz', },
        success: function (result) {
          console.log(result.data)
          if (result.data.status == 200) {
            var list = result.data.content
            for (var i = 0; i < list.length; i++) {
              list[i].selected = false
            }
            that.setData({
              couponStyle: 'display:block',
              item: list
            })
          } else {
            that.setData({
              couponStyle: 'display:none'
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
  deleteCategory: function (e) {
    var that = this
    that.setData({
      currentTab: {
        first: '',
        center: 'tab-current',
        last: ''
      },
      listAll: 'display:block',
      listCreat: 'display:none',
      footedStyle: 'display:block',
      footedBar: 'display:block',
      isSelect: 'display:none;',
      isEdit: 'display:block;',
      isAll: 'display:none;',
      selectedAllStatus: false,
      couponCreate: 'display:none'
    })
    var url = 'coupon_combo/index'
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
        data: { limit: 10, biz_id: bizId, app_type: 'biz', time_delete: 'IS NOT NULL', },
        success: function (result) {
          console.log(result.data)
          if (result.data.status == 200) {
            var list = result.data.content
            for (var i = 0; i < list.length; i++) {
              list[i].selected = false
            }
            that.setData({
              couponStyle: 'display:block',
              item: list,
              footedStyle: 'display:block',
              footedBar: 'display:none',
            })
          } else {
            that.setData({
              couponStyle: 'display:none',
              footedStyle: 'display:none',
              footedBar: 'display:block',
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
  crearCategory: function (e) {
    var that = this
    that.setData({
      currentTab: {
        first: '',
        center: '',
        last: 'tab-current'
      },
      listAll: 'display:none',
      listCreat: 'display:block',
      isEdit: 'display:none',
      couponStyle: 'display:none',
      couponCreate:'display:block',
      footedStyle: 'display:none',
      footedBar: 'display:block',
      isAll: 'display:none;',
      selectedAllStatus: false,
    })
  },
  quit: function (e) {
    var that = this
    that.setData({
      isSelect: 'display:none;',
      isEdit: 'display:block;',
      isAll: 'display:none;',
      selectedAllStatus: true
    })
  },
  editBtn: function (e) {
    var that = this
    that.setData({
      isSelect: 'display:block;',
      isEdit: 'display:none;',
      isAll: 'display:block;',
    })
  },
  selected: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index)
    var selected = this.data.item[index].selected;
    console.log(selected)
    var list = this.data.item;

    list[index].selected = !selected;


    var arr = []
    var listIds = []
    for (var i = 0; i < list.length; i++) {
      arr.push(list[i].selected)
      if (list[i].selected == true) {
        listIds.push(list[i])
      }
    }
    var isTrue = true
    if (arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        if (arr.indexOf(arr[i]) != 0) {
          //数组中的元素不相同
          isTrue = false
          break
        }
      }
    }
    if (isTrue) {
      this.setData({
        selectedAllStatus: arr[0],
      });
    } else {
      this.setData({
        selectedAllStatus: false,
      });
    }
    this.setData({
      item: list,
      itemIds: listIds
    });
    console.log(listIds)
  },
  selectAllItem: function (e) {
    var selectedAllStatus = this.data.selectedAllStatus;
    var selectedAll = !selectedAllStatus;
    var list = this.data.item;

    if (!selectedAllStatus) {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAll;
      }
      this.setData({
        item: list,
        selectedAllStatus: true,
        itemIds: list
      });
    } else {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAll;
      }
      this.setData({
        item: list,
        selectedAllStatus: false,
        itemIds: list
      });
    }
    console.log(this.data.selectedAllStatus)
  },
  detail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'detail?Id=' + id
    })
  },
  edit: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'edit?Id=' + id
    })
  },
  recovery: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var operation = e.currentTarget.dataset.opera
    console.log(operation)
    var list = that.data.item
    var arr = []
    for (var i = 0; i < list.length; i++) {
      if (list[i].combo_id == id) {
        arr.push(list[i])
      }
    }
    this.setData({
      itemIds: arr
    });
    wx.navigateTo({
      url: 'delete?Id=' + id + '&opera=' + operation
    })
  },
  operation: function (e) {
    var operation = e.currentTarget.dataset.opera
    wx.navigateTo({
      url: 'delete?Id=ids&opera=' + operation
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    obj.coupon_allowed = e.detail.value
  },
  // 点击时间组件确定事件 
  yes: function (e) {
    var yes = e.currentTarget.dataset.coupon
    this.setData({
      currentYes: 'coupon-current',
      currentNo: ''
    })
    obj.coupon_allowed = yes
  },
  no: function (e) {
    var yes = e.currentTarget.dataset.coupon
    this.setData({
      currentYes: '',
      currentNo: 'coupon-current'
    })
    obj.coupon_allowed = yes
  },

  startTap: function () {
    var that = this
    this.datetimePicker.setPicker('startDate');
  },
  endTap: function () {
    this.datetimePicker.setPicker('endDate');
  },
  getName: function (e) {
    var that = this
    var name = e.detail.value
    if (name.trim().length < 1) {
      wx.showToast({
        title: '名称不能为空',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    } else {
      couponObj.name = name
    }
  },
  getIds: function (e) {
    var Ids = e.detail.value
    couponObj.template_ids = Ids
  },
  getMax_amount: function (e) {
    var Max_amount = e.detail.value
    couponObj.max_amount = Max_amount
  },
  getTime_start: function (e) {
    var Time_start = e.detail.value
    couponObj.time_start = Time_start
  },
  getTime_end: function (e) {
    var Time_end = e.detail.value
    couponObj.time_end = Time_end
  },
  submitCreate: function (e) {
    var that = this
    couponObj.biz_id = bizId
    couponObj.user_id = user_id
    couponObj.app_type = 'biz'
    if (couponObj.name == undefined || couponObj.template_ids == undefined) {
      console.log(couponObj.name)
      wx.showToast({
        title: '带*标示项不能为空',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    } else {
      var url = 'coupon_combo/create'
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
          data: couponObj,
          success: function (result) {

            if (result.data.status == 200) {
              console.log(result.data)
              wx.showToast({
                title: '创建成功',
                icon: 'success',
                duration: 2000
              })
              that.setData({
                currentTab: {
                  first: 'tab-current',
                  center: '',
                  last: ''
                },
                listAll: 'display:block',
                listCreat: 'display:none',
                footedStyle: 'display:block',
                footedBar: 'display:block',
                isSelect: 'display:none;',
                isEdit: 'display:block;',
                isAll: 'display:none;',
                selectedAllStatus: false,
                couponCreate: 'display:none',
                couponStyle:'display:block'
              })
              var url = 'coupon_combo/index'
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
                  data: { limit: 10, biz_id: bizId, app_type: 'biz', },
                  success: function (result) {
                    console.log(result.data)
                    if (result.data.status == 200) {
                      var list = result.data.content
                      for (var i = 0; i < list.length; i++) {
                        list[i].selected = false
                      }
                      that.setData({
                        item: list
                      })
                    } else {
                      that.setData({
                        listAll: 'display:none'
                      })
                    }

                  },
                  fail: function (result) {
                    console.log(result)
                    wx.vibrateShort()
                  }
                })
              }
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