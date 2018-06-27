// pages/promotion_biz/index.js
var pickerFile = require('../../utils/picker_datetime.js');
const Upyun = require('../../utils/upyun-wxapp-sdk')
const upyun = new Upyun({
  bucket: 'jinlaisandbox-images',
  operator: 'jinlaisandbox',
})
function tick(s, bizId) {
  var objD = new Date();
  var str;
  var u = bizId
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
  var ss = objD.getSeconds() + s;
  if (ss < 10) ss = '0' + ss;
  u = u.toString()
  str = yy + MM + '/' + MM + dd + '/' + hh + mm + ss + '' + u + '.jpg';
  return str;
}
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
var mainImageUrl = []
var mainMaxImageUrl = []
var userId = ''
var bizId = ''
var couponObj = {}
var timestamp = ''
var timestamp2 = ''
var objectArray = []
var objectBizArray = []
var obj = {}
var activityType = ''
var name = ''
var startTime = ''
var endTime = ''
var fold = '否'
var description =''
var mainImg = ''
var mainMaxImg = ''

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
    listAll: 'display:none',
    listCreat: 'display:none',
    selectedAll: false,
    selectedAllStatus: false,
    mainImageSrc: '',
    dis: 'display:block',
    disMax:'display:block',
    mainImageUrl: '',
    mainMaxImageUrl:'',
    imgText: '开始上传',
    imgMaxText:'开始上传',
    imgStyle: 'background-color:#c9caca',
    imgMaxStyle: 'background-color:#c9caca',
    noneStyle:'display:none;',
    start: '',
    end: '',
    currentYes: '',
    currentNo: 'coupon-current',
    arrayType: ['单品折扣', '单品满赠', '单品满减', '单品赠券', '单品预购', '单品团购', '订单折扣', '订单满赠', '订单满减', '订单赠券'],
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
        userId = res.data.content.user_id
        console.log(userId)
        bizId = res.data.content.biz_id
        console.log(bizId)
        var url = 'promotion_biz/index'
        var params = {}
        var api_result = api_request(url, params)

        // 网络请求
        function api_request(url, api_params) {
          // 生成签名
          app.sign_generate(api_params)
          //console.log(app.globalData.url_api + url)

          // 通过小程序的网络请求API发送请求
          wx.request({
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            url: app.globalData.url_api + url,
            data: { app_type: 'biz', biz_id: '2' },
            success: function (result) {
              console.log(result.data)
              if (result.data.stutus==200){
                var list = result.data.content
                for (var i = 0; i < list.length; i++) {
                  list[i].selected = false
                }
                that.setData({
                  item: list,
                  listAll: 'display:block;',
                  noneStyle: 'display:none;',
                })
              }else{
                that.setData({
                  listAll:'display:none;',
                  noneStyle: 'display:block;',
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
      listCreat: 'display:none',
      isEdit: 'display:block',
    })
    var url = 'promotion_biz/index'
    var params = {}
    var api_result = api_request(url, params)

    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      app.sign_generate(api_params)
      //console.log(app.globalData.url_api + url)

      // 通过小程序的网络请求API发送请求
      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'biz', biz_id: '2' },
        success: function (result) {
          console.log(result.data)
          if (result.data.stutus == 200) {
            var list = result.data.content
            for (var i = 0; i < list.length; i++) {
              list[i].selected = false
            }
            that.setData({
              item: list,
              listAll: 'display:block;',
              noneStyle: 'display:none;',
            })
          } else {
            that.setData({
              listAll: 'display:none;',
              noneStyle: 'display:block;',
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
      isEdit: 'display:block',
      listCreat: 'display:none',
    })
    var url = 'promotion_biz/index'
    var params = {}
    var api_result = api_request(url, params)

    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      app.sign_generate(api_params)
      //console.log(app.globalData.url_api + url)

      // 通过小程序的网络请求API发送请求
      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'biz', biz_id: '2', time_delete: 'IS NOT NULL', },
        success: function (result) {
          console.log(result.data)
          if (result.data.stutus == 200) {
            var list = result.data.content
            for (var i = 0; i < list.length; i++) {
              list[i].selected = false
            }
            that.setData({
              item: list,
              listAll: 'display:block;',
              noneStyle: 'display:none;',
            })
          } else {
            that.setData({
              listAll: 'display:none;',
              noneStyle: 'display:block;',
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
      noneStyle: 'display:none;',
      listAll: 'display:none',
      listCreat: 'display:block',
      isEdit: 'display:none',
    })
  },
  edit: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'edit?Id=' + id
    })
  },
  detail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'detail?Id=' + id
    })
  },
  recovery: function (e) {
    wx.navigateTo({
      url: 'delete'
    })
  },
  quit: function (e) {
    var that = this
    that.setData({
      isSelect: 'display:none;',
      isEdit: 'display:block;',
      isAll: 'display:none;',
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
    this.setData({
      item: list,
    });
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
        selectedAllStatus: true
      });
    } else {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAll;
      }
      this.setData({
        item: list,
        selectedAllStatus: false
      });
    }
  },
  chooseImageMain: function () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        self.setData({
          mainImageSrc: res.tempFilePaths,
          //imgStyle: 'display:block',
        })
        console.log(self.data.mainImageSrc.length)
        var le = self.data.mainImageSrc.length
        if (le >= 1) {
          self.setData({
            dis: 'display:none'
          })
        }
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage licenseImageSrc fail, err is', errMsg)
      }
    })
  },
  upImgMain: function (e) {
    var that = this
    var temp = that.data.mainImageSrc
    console.log('this is  upImg')
    for (var i = 0; i < temp.length; i++) {
      var time = tick(i, userId)
      mainImageUrl[i] = 'avatar/' + time
      console.log(time)
      upyun.upload({
        localPath: temp[i],
        remotePath: '/user/avatar/' + time,
        success: function (res) {
          console.log('uploadImage success, res is:', res)
          if (res.statusCode == 200) {
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
            tha.setData({
              mainImageSrc: res.tempFilePaths,
            })
            itemValue = mainImageUrl[0]
          }

        },
        fail: function ({ errMsg }) {
          console.log('uploadImage fail, errMsg is', errMsg)
        }
      })
    }
  },
  closeImgMain: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.mainImageSrc;
    list.splice(index, 1)
    that.setData({
      mainImageSrc: list
    });
    console.log(that.data.mainImageSrc.length)
    var le = that.data.mainImageSrc.length
    if (le < 1) {
      that.setData({
        dis: 'display:block'
      })
    }
  },
  preview: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.mainImageSrc;
    var curr = list[index]
    wx.previewImage({
      current: curr, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },
  chooseImageMainMax: function () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        self.setData({
          mainMaxImageSrc: res.tempFilePaths,
          //imgStyle: 'display:block',
        })
        console.log(self.data.mainMaxImageSrc.length)
        var le = self.data.mainMaxImageSrc.length
        if (le >= 1) {
          self.setData({
            disMax: 'display:none'
          })
        }
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage licenseImageSrc fail, err is', errMsg)
      }
    })
  },
  upImgMainMax: function (e) {
    var that = this
    var temp = that.data.mainMaxImageSrc
    console.log('this is  upImg')
    for (var i = 0; i < temp.length; i++) {
      var time = tick(i, userId)
      mainMaxImageUrl[i] = 'avatar/' + time
      console.log(time)
      upyun.upload({
        localPath: temp[i],
        remotePath: '/user/avatar/' + time,
        success: function (res) {
          console.log('uploadImage success, res is:', res)
          if (res.statusCode == 200) {
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
            tha.setData({
              mainMaxImageSrc: res.tempFilePaths,
              imgStyle: 'background-color:#ff3649',
            })
            itemValue = mainMaxImageUrl[0]
          }

        },
        fail: function ({ errMsg }) {
          console.log('uploadImage fail, errMsg is', errMsg)
        }
      })
    }
  },
  closeImgMainMax: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.mainMaxImageSrc;
    list.splice(index, 1)
    that.setData({
      mainMaxImageSrc: list
    });
    console.log(that.data.mainMaxImageSrc.length)
    var le = that.data.mainMaxImageSrc.length
    if (le < 1) {
      that.setData({
        disMax: 'display:block'
      })
    }
  },
  previewMax: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.mainMaxImageSrc;
    var curr = list[index]
    wx.previewImage({
      current: curr, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },
  // 点击时间组件确定事件 
  yes: function (e) {
    var yes = e.currentTarget.dataset.coupon
    this.setData({
      currentYes: 'coupon-current',
      currentNo: ''
    })
    fold = '是'
  },
  no: function (e) {
    var yes = e.currentTarget.dataset.coupon
    this.setData({
      currentYes: '',
      currentNo: 'coupon-current'
    })
    fold = '否'
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    activityType = this.data.arrayType[e.detail.value]
  },
  startTap: function () {
    var that = this
    this.datetimePicker.setPicker('startDate');
  },
  endTap: function () {
    this.datetimePicker.setPicker('endDate');
  },

  verType:function(e){
    if (activityType == ''){
      wx.showToast({
        title: '请选择活动类型',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    }else{
      
    }
  },
  getName: function (e) {
    name = e.detail.value
    if (name == '') {
      wx.showToast({
        title: '名称不能为空',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    } else {

    }
  },
  getDescription: function (e) {
    description = e.detail.value
  },
  submitCreat:function(e){
    var that = this
    var startTime = that.data.startDate
    var endTime = that.data.endDate
    if (activityType == ''){
      wx.showToast({
        title: '请选择活动类型',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    } else if (name == ''){
      wx.showToast({
        title: '名称不能为空',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    } else if (startTime == '') {
      wx.showToast({
        title: '请选择开始时间',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    } else if (endTime == '') {
      wx.showToast({
        title: '请选择结束时间',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    }else{
      var url = 'promotion_biz/create'
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
          data: { app_type: 'biz', biz_id: bizId, user_id: userId, type: activityType,name:name,time_start:startTime,time_end:endTime,description:description,url_image:mainImageUrl,url_image_wide:mainMaxImageUrl,fold_allowed:fold},
          success: function (result) {

            if (result.data.status == 200) {
              console.log(result.data)
              wx.showToast({
                title: '编辑成功',
                icon: 'success',
                duration: 2000
              })
              wx.navigateBack({
                delta: 1
              })
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