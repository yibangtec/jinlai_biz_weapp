// pages/coupon_template/index.js
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
    footedStyle: 'display:block',
    footedBar: 'display:block',
    tipsError: 'display:none',
    textError:'',
    start: '',
    end: '',
    itemIds:''
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
        var url = 'coupon_template/index'
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
      },
      fail: function (err) {

      }
    })
    var url = 'item_category/index'
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
        data: { app_type: 'item', },
        success: function (result) {
          console.log(result.data.content)
          var categoryId = result.data.content
          for (var i = 0; i < categoryId.length; i++) {
            objectArray[i] = categoryId[i]
          }
          that.setData({
            objectArray: objectArray
          })
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
    var u = 'item_category_biz/index'
    var api_result = api(u, params)
    function api(url, api_params) {
      // 生成签名
      app.sign_generate(api_params)

      // 通过小程序的网络请求API发送请求
      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'item', },
        success: function (result) {
          console.log(result)
          var categoryId = result.data.content
          for (var i = 0; i < categoryId.length; i++) {
            objectBizArray[i] = categoryId[i]
          }
          that.setData({
            objectBizArray: objectBizArray
          })
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
    
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
      selectedAllStatus: false
    })
    var url = 'coupon_template/index'
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
      isSelect: 'display:none;',
      isEdit: 'display:block;',
      isAll: 'display:none;',
    })
    var url = 'coupon_template/index'
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
        data: { limit: 10, app_type: 'biz', biz_id: bizId, time_delete: 'IS NOT NULL', },
        success: function (result) {
          console.log(result.data)
          if (result.data.content.status==200){
            var list = result.data.content
            for (var i = 0; i < list.length; i++) {
              list[i].selected = false
            }
            that.setData({
              item: list,
              footedStyle: 'display:block',
              footedBar: 'display:none',
            })
          }else{
            that.setData({
              item: [],
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
      footedStyle: 'display:none',
      footedBar: 'display:block',
    })
  },
  quit: function (e) {
    var that = this
    that.setData({
      isSelect: 'display:none;',
      isEdit: 'display:block;',
      isAll: 'display:none;',
      selectedAllStatus:true
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
    var listIds =[]
    for(var i=0;i<list.length;i++){
      arr.push(list[i].selected)
      if (list[i].selected == true){
        listIds.push(list[i])
      }
    }
    var isTrue = true
    if (arr.length>0){
      for (var i = 0; i < arr.length; i++) {
        if(arr.indexOf(arr[i]) != 0){
          //数组中的元素不相同
          isTrue = false
          break
        }
      }
    }
    if (isTrue){
      this.setData({
        selectedAllStatus: arr[0],
      });
    }else{
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
  edit:function(e){
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
      if (list[i].template_id == id){
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
  operation:function(e){
    var operation = e.currentTarget.dataset.opera
    wx.navigateTo({
      url: 'delete?Id=ids&opera=' + operation
    })
  },
  getName:function(e){
    var that = this
    var name = e.detail.value
    if (name.trim().length < 1){
      wx.showToast({
        title: '名称不能为空',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    }else{
      couponObj.name = name
    }
  },
  getDescription: function (e) {
    var Description = e.detail.value
    couponObj.description = Description
  },
  getAmount: function (e) {
    var Amount = e.detail.value
    if (Amount > 999) {
      wx.showToast({
        title: '面值最高999',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    } else if (Amount.trim().length < 1){
      wx.showToast({
        title: '面值不能为空',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
      
    } else if (Amount < 1) {
      wx.showToast({
        title: '面值不能小于零',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })

    } else{
      couponObj.amount = Amount
    }
  },
  getMin_subtotal: function (e) {
    var Min_subtotal = e.detail.value
    couponObj.min_subtotal = Min_subtotal
  },
  getMax_amount: function (e) {
    var Max_amount = e.detail.value
    couponObj.max_amount = Max_amount
  },
  getMax_amount_user: function (e) {
    var Max_amount_user = e.detail.value
    couponObj.max_amount_user = Max_amount_user
  },
  getPeriod: function (e) {
    var Period = e.detail.value
    couponObj.period = Period
  },
  getTime_start: function (e) {
    var Time_start = e.detail.value
    couponObj.time_start = Time_start
  },
  getTime_end: function (e) {
    var Time_end = e.detail.value
    couponObj.time_end = Time_end
  },
  getCategory_id: function (e) {
    var Category_id = e.detail.value
    couponObj.category_id = Category_id
  },
  getCategory_biz_id: function (e) {
    var Category_biz_id = e.detail.value
    couponObj.category_biz_id = Category_biz_id
  },
  getItem_id: function (e) {
    var Item_id = e.detail.value
    couponObj.item_id = Item_id
  },
  bindPickerChange: function (e) {
    console.log('所属系统分类', e.detail.value)
    var category_id = objectArray[e.detail.value].category_id
    obj.category_id = category_id
    console.log(obj.category_id)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerBiz: function (e) {
    console.log('所属商家', e.detail.value)
    var category_biz_id = objectArray[e.detail.value].category_biz_id
    //obj.category_biz_id = e.detail.value
    obj.category_biz_id = category_biz_id
    this.setData({
      num: e.detail.value
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
  submitCreate:function(e){
    var that = this
    couponObj.biz_id = bizId
    couponObj.user_id = user_id
    couponObj.app_type = 'biz'
    if (couponObj.name == undefined || couponObj.amount == undefined){
      console.log(couponObj.name)
      wx.showToast({
        title: '带*标示项不能为空',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    }else{
      var url = 'coupon_template/create'
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
                isEdit: 'display:block',
                footedStyle: 'display:block',
                footedBar: 'display:block',
              })
              var url = 'coupon_template/index'
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