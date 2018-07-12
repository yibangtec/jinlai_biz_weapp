// pages/branch/index.js
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
var mainImg = ''
var mainMaxImg = ''
var userId = ''
var bizId = ''
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
    disMax: 'display:block',
    mainImageUrl: '',
    mainMaxImageUrl: '',
    imgText: '开始上传',
    imgMaxText: '开始上传',
    imgStyle: 'background-color:#c9caca',
    imgMaxStyle: 'background-color:#c9caca',
    noneStyle: 'display:none;',
    province: '',
    city: '',
    area: '',
    show: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var url = 'branch/index'
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
        data: { app_type:'biz', limit: 10, },
        success: function (result) {
          console.log(result.data)
          if (result.data.status == 200){
            var list = result.data.content
            for (var i = 0; i < list.length; i++) {
              list[i].selected = false
            }
            that.setData({
              listAll:'display:block',
              item: list
            })
          }else{
            that.setData({
              noneStyle: 'display:block'
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
      isEdit: 'display:block',
    })

    var url = 'branch/index'
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
        data: { app_type: 'biz', limit: 10, },
        success: function (result) {
          console.log(result.data)
          if (result.data.status == 200) {
            var list = result.data.content

            for (var i = 0; i < list.length; i++) {
              list[i].selected = false
            }
            that.setData({
              listAll: 'display:block',
              item: list
            })
          } else {
            that.setData({
              noneStyle: 'display:block'
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
      listAll: 'display:none',
      isEdit: 'display:block',
      listCreat: 'display:none',
    })

    var url = 'branch/index'
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
        data: { app_type: 'biz', limit: 10, time_delete: 'IS NOT NULL',},
        success: function (result) {
          console.log(result.data)
          if (result.data.status == 200){
            var list = result.data.content

            for (var i = 0; i < list.length; i++) {
              list[i].selected = false
            }
            that.setData({
              listAll: 'display:block',
              item: list
            })
          } else {
            that.setData({
              noneStyle: 'display:block'
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
      noneStyle: 'display:none'
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
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'delete?Id=' + id
    })
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
      count: 4,
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
  sureSelectAreaListener: function (e) {
    var that = this;
    that.setData({
      show: false,
      province: e.detail.currentTarget.dataset.province,
      city: e.detail.currentTarget.dataset.city,
      area: e.detail.currentTarget.dataset.area
    })
  },
  chooseAddress: function () {
    console.log("xuanzedizhi")
    var that = this;
    that.setData({
      show: true
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