// edit_certain.js
const Upyun = require('../../utils/upyun-wxapp-sdk')
const upyun = new Upyun({
  bucket: 'jinlaisandbox-images',
  operator: 'jinlaisandbox',
})
var app = getApp()
var user_id, id, name, value, path, inputValue, productSrc, productImageUrl=[], url_image_product, time;
function tick(s) {
  var objD = new Date();
  var str;
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
  str = yy + MM + dd + "_" + hh + mm + ss + '.jpg';
  return str;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    value: '',
    productImageSrc:'',
    index:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id
    name = options.name
    path = options.img
    wx.setNavigationBarTitle({ title: options.text })
    var url = 'biz/detail'
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
        data: { id: id },
        success: function (result) {

          console.log(result.data.content)

        },
        fail: function (result) {
          console.log(result)
        }
      })
    }
    
    console.log('======================'+options.value + options.name + options.id)
    this.setData({
      title: options.text,
      value: options.value
    })

    wx.getStorage({
      key: 'user',
      success: function (res) {
        user_id = res.data.content.user_id
      },
      fail: function (err) {

      }
    })
  },
  getEditVaue: function (e) {
    inputValue = e.detail.value
    if (inputValue == value) {
      wx.showToast({
        title: '修改内容与原内容相同',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  //产品

  chooseImageProduct: function () {
    const self = this
    wx.chooseImage({
      count: 4,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        productSrc = res.tempFilePaths
        self.setData({
          productImageSrc: productSrc
        })
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  upImgProduct: function (e) {
    console.log('this is  upImg')
    for (var i = 0; i < productSrc.length; i++) {
      
      time = tick(i)
      console.log(time)
      productImageUrl[i] = '/'+path+'/' + time
      upyun.upload({
        localPath: productSrc[i],
        remotePath: '/biz/'+ path +'/' + time,
        success: function (res) {
          console.log('uploadImage success, res is:', res)
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 1000
          })
        },
        fail: function ({ errMsg }) {
          console.log('uploadImage fail, errMsg is', errMsg)
        }
      })
    }
    url_image_product = productImageUrl.join(',')
    console.log(url_image_product)
  },
  closeImgProduct: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.productImageSrc;
    list.splice(index, 1)
    that.setData({
      productImageSrc: list
    });
  },
  edit_img: function (e) {
    // 通过API获取或处理数据
    var url = 'biz/edit_certain'
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
        data: { app_type: 'biz', id: id, user_id: user_id, name: name, value: url_image_product },
        success: function (result) {
          console.log(result.data)

        },
        fail: function (result) {
          console.log(result)
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