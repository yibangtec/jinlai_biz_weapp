// edit.js
const Upyun = require('../../utils/upyun-wxapp-sdk')
const upyun = new Upyun({
  bucket: 'jinlaisandbox-images',
  operator: 'jinlaisandbox',
})
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
var amapFile = require('../../utils/amap-wx')
//var addToolbar = require('../../http://webapi.amap.com/maps?v=1.3&key=b0a6d590c3195b86fcc13676afa62eba&plugin=AMap.Geocoder')
//var addToolbar = require('../../http://cache.amap.com/lbs/static/addToolbar')
var user_id, bizId, name, brief_name, url_logo, url_name, slogan, description, notification, url_web, url_weibo, url_wechat,
  tel_public, tel_protected_biz, tel_protected_fiscal, tel_protected_order, nation, province, city, county, street, longitude, latitude,
  code_license, code_ssn_owner, code_ssn_auth, bank_name, bank_account, fullname_owner, fullname_auth;
var time,
  ownerSrc,//进行计算时候的url
  ownerImageUrl = [],//回调给后台的图片又拍云存储地址
  licenseSrc,
  licenseImageUrl = [],
  authSrc,
  authImageUrl = [],
  authDocSrc,
  authDocImageUrl = [],
  productSrc,
  productImageUrl = [],
  produceSrc,
  produceImageUrl = [],
  retailSrc,
  retailImageUrl = [];
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:'',
    biz:'',
    con:'container',
    ownerImageSrc: '',//展现到view层的图片地址
    licenseImageSrc: '',
    authImageSrc: '',
    authDocImageSrc: '',
    productImageSrc: '',
    produceImageSrc: '',
    retailImageSrc: '',
    index: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data.content.mobile)
        user_id = res.data.content.id
        that.setData({
          tel: res.data.content.mobile,
        })
      },
      fail: function (err) {

      }
    })
    
    //调用BIZ2，若失败或结果为空则结束并进行相应提示
    // 通过API获取或处理数据
    var url = 'biz/detail'
    bizId = options.id
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
        data: { id: bizId },
        success: function (result) {
          console.log(result.data)
          that.setData({ biz: result.data.content });
        },
        fail: function (result) {
          console.log(result)
        }
      })
    }
    //获取返回结果并保存到本地biz表，将各字段赋值到form_edit中相应字段作为原始字段值

   
  },
  getName:function(e){
    name = e.detail.value
    console.log(name)
    var patrn = /^.{5,35}$/;
    if (patrn.test(name)) {

    } else {
      wx.showToast({
        title: '商家全称输入字符长度应在5到35个',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getBrief_name:function(e){
    brief_name = e.detail.value
  },

  getUrl_logo:function(e){

  },
  getUrl_name:function(e){
    url_name = e.detail.value
  },
  getSlogan: function (e) {
    slogan=e.detail.value
  },
  getDescription: function (e) {
    description = e.detail.value
  },
  getNotification: function (e) {
    notification=e.detail.value
  },
  getUrl_web: function (e) {
    url_web=e.detail.value
  },
  getUrl_weibo: function (e) {
    url_weibo=e.detail.value
  },
  getUrl_wechat: function (e) {
    url_wechat=e.detail.value
  },
  getTel_public: function (e) {
    tel_public=e.detail.value
    var patrn = /(^(400|800)\d{7})|(\d{3,4}(-){0,1}\d{7,8}$)/;
    if (patrn.test(tel_public)) {

    } else {
      wx.showToast({
        title: '消费者联系电话输入格式不正确',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getTel_protected_biz: function (e) {
    tel_protected_biz=e.detail.value
    var re = /^1\d{10}$/
    if (re.test(tel_protected_biz)) {

    } else {
      wx.showToast({
        title: '商务联系电话输入格式不正确',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getTel_protected_fiscal: function (e) {
    tel_protected_fiscal=e.detail.value
    var re = /^1\d{10}$/
    if (re.test(tel_protected_fiscal)) {

    } else {
      wx.showToast({
        title: '财务联系电话输入格式不正确',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getTel_protected_order: function (e) {
    tel_protected_order=e.detail.value
    var re = /^1\d{10}$/
    if (re.test(tel_protected_order)) {

    } else {
      wx.showToast({
        title: '订单通知手机号输入格式不正确',
        icon: 'loading',
        duration: 2000
      })
    }
  },

  getNation: function (e) {
    nation=e.detail.value
  },
  getProvince: function (e) {
    province=e.detail.value
  },
  getCity: function (e) {
    city=e.detail.value
  },
  getCounty: function (e) {
    county=e.detail.value
  },
  getStreet: function (e) {
    street=e.detail.value
  },
  getFullname_owner:function(e){
    fullname_owner = e.detail.value
  },
  getFullname_auth: function (e) {
    fullname_auth = e.detail.value
  },
  getCode_license: function (e) {
    code_license=e.detail.value
    var patrn = /^[a-zA-Z0-9]{15,18}$/;
    if (patrn.test(code_license)) {

    } else {
      wx.showToast({
        title: '请输入15-18位营业执照号',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getCode_ssn_owner: function (e) {
    code_ssn_owner=e.detail.value
    var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
    if (isIDCard2.test(code_ssn_owner)) {

    } else {
      wx.showToast({
        title: '请输入18正确格式法人身份证号',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getCode_ssn_auth: function (e) {
    code_ssn_auth=e.detail.value
    var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
    if (isIDCard2.test(code_ssn_auth)) {

    } else {
      wx.showToast({
        title: '请输入18正确格式经办人身份证号',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getBank_name: function (e) {
    bank_name=e.detail.value
    var re = /[\u4e00-\u9fa5a-zA-Z\u0020]{3,20}/
    if (re.test(bank_name)) {

    } else {
      wx.showToast({
        title: '请输入正确格式开户行名称',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getBank_account: function (e) {
    bank_account = e.detail.value
    var re = /[0-9]|[-]/
    if (re.test(bank_account)) {

    } else {
      wx.showToast({
        title: '请输入正确格式开户行账号',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  //营业执照
  chooseImageLicense: function () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        licenseSrc = res.tempFilePaths
        self.setData({
          licenseImageSrc: licenseSrc
        })
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage licenseImageSrc fail, err is', errMsg)
      }
    })
  },
  upImgLicense: function (e) {
    console.log('this is  upImg')
    console.log('this is  for')
    time = tick(0)
    licenseImageUrl[0] = '/license/' + time
    console.log(time)
    upyun.upload({
      localPath: licenseSrc[0],
      remotePath: '/biz/license/' + time,
      success: function (res) {
        console.log('uploadImage success, res is:', res)
        if (res.statusCode == 200) {
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          })
        }

      },
      fail: function ({ errMsg }) {
        console.log('uploadImage fail, errMsg is', errMsg)
      }
    })

  },
  closeImgLicense: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.licenseImageSrc;
    list.splice(index, 1)
    that.setData({
      licenseImageSrc: list
    });
  },
  //法人身份证
  chooseImageOwner: function () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        ownerSrc = res.tempFilePaths
        self.setData({
          ownerImageSrc: ownerSrc,
          disable: false
        })
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  upImgOwner: function (e) {
    console.log('this is  upImg')
    for (var i = 0; i < ownerSrc.length; i++) {
      console.log('this is  for')
      time = tick(i)
      ownerImageUrl[i] = '/owner_id/' + time
      //console.log(arr[i])
      upyun.upload({
        localPath: ownerSrc[i],
        remotePath: '/biz/owner_id/' + time,
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

  },
  closeImgOwner: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.ownerImageSrc;
    list.splice(index, 1)
    that.setData({
      ownerImageSrc: list
    });
  },
  //经办人身份证
  chooseImageAuth: function () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        authSrc = res.tempFilePaths
        self.setData({
          authImageSrc: authSrc
        })
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  upImgAuth: function (e) {
    console.log('this is  upImg')
    for (var i = 0; i < authSrc.length; i++) {
      console.log('this is  for')
      time = tick(i)
      authImageUrl[i] = '/auth_id/' + time
      //console.log(arr[i])
      upyun.upload({
        localPath: authSrc[i],
        remotePath: '/biz/auth_id/' + time,
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

  },
  closeImgAuth: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.authImageSrc;
    list.splice(index, 1)
    that.setData({
      authImageSrc: list
    });
  },
  //授权书

  chooseImageAuthDoc: function () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        authDocSrc = res.tempFilePaths
        self.setData({
          authDocImageSrc: authDocSrc
        })
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  upImgAuthDoc: function (e) {
    console.log('this is  upImg')
    for (var i = 0; i < authDocSrc.length; i++) {
      console.log('this is  for')
      time = tick(i)
      authDocImageUrl[i] = '/auth_doc/' + time
      //console.log(arr[i])
      upyun.upload({
        localPath: authDocSrc[i],
        remotePath: '/biz/auth_doc/' + time,
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

  },
  closeImgAuthDoc: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.authDocImageSrc;
    list.splice(index, 1)
    that.setData({
      authDocImageSrc: list
    });
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
      console.log('this is  for')
      time = tick(i)
      productImageUrl[i] = '/product/' + time
      //console.log(arr[i])
      upyun.upload({
        localPath: productSrc[i],
        remotePath: '/biz/product/' + time,
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
  //工厂
  chooseImageProduce: function () {
    const self = this
    wx.chooseImage({
      count: 4,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        produceSrc = res.tempFilePaths
        self.setData({
          produceImageSrc: produceSrc
        })
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  upImgProduce: function (e) {
    console.log('this is  upImg')
    for (var i = 0; i < produceSrc.length; i++) {
      console.log('this is  for')
      time = tick(i)
      produceImageUrl[i] = '/produce/' + time
      //console.log(arr[i])
      upyun.upload({
        localPath: produceSrc[i],
        remotePath: '/biz/produce/' + time,
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

  },
  closeImgProduce: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.produceImageSrc;
    list.splice(index, 1)
    that.setData({
      produceImageSrc: list
    });
  },
  //门店

  chooseImageRetail: function () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        retailSrc = res.tempFilePaths
        self.setData({
          retailImageSrc: retailSrc
        })
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  upImgRetail: function (e) {
    var that = this
    console.log('this is  upImg')
    for (var i = 0; i < retailSrc.length; i++) {
      console.log('this is  for')
      time = tick(i)
      retailImageUrl[i] = '/retail/' + time
      //console.log(arr[i])
      upyun.upload({
        localPath: retailSrc[i],
        remotePath: '/biz/retail/' + time,
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

  },
  closeImgRetail: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.retailImageSrc;
    list.splice(index, 1)
    that.setData({
      retailImageSrc: list
    });
  },
  submit: function (e) {
    
    var url = 'biz/edit'
    var params = {}
    var api_result = api_request(url, params)
    var url_image_product = productImageUrl.join(',')
    var url_image_produce = produceImageUrl.join(',')
    var url_image_retail = retailImageUrl.join(',')
    var url_image_license = licenseImageUrl[0]
    var url_image_owner_id = ownerImageUrl[0]
    var url_image_auth_id = authImageUrl[0] 
    var url_image_auth_doc = authDocImageUrl[0] 
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
        data: {
          app_type: 'biz', 
          id: bizId, 
          user_id: user_id, 
          name: name, 
          brief_name: brief_name, 
          url_name: url_name, 
          url_logo: url_logo, 
          slogan: slogan,
          description: description, 
          notification: notification, 
          url_web: url_web, 
          url_weibo: url_weibo, 
          url_wechat: url_wechat, 
          tel_public: tel_public, 
          tel_protected_biz: tel_protected_biz, 
          tel_protected_fiscal: tel_protected_fiscal, 
          tel_protected_order:tel_protected_order,
          fullname_owner: fullname_owner, 
          fullname_auth: fullname_auth,
          code_license: code_license, 
          code_ssn_owner: code_ssn_owner, 
          code_ssn_auth: code_ssn_auth, 
          url_image_license: url_image_license, 
          url_image_owner_id: url_image_owner_id,
          url_image_auth_id: url_image_auth_id, 
          url_image_auth_doc: url_image_auth_doc, 
          bank_name: bank_name, 
          bank_account: bank_account, 
          url_image_product: url_image_product,
          url_image_produce: url_image_produce, 
          url_image_retail: url_image_retail,
          nation: nation,
          province: province,
          city: city,
          county: county,
          street: street,
          longitude: 39.23222,
          latitude: 116.23456
        },
        success: function (result) {
          console.log(result)
          var user = result.data
          //调用BIZ3，若失败则结束并进行提示
          if (result.data.status == 200) {
            //设置本地user.biz_id为返回结果中的biz_id值
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000
            })

            //wx.redirectTo({
              //url: 'pwresult?title="商家修改成功成功"'
            //})
          }
          //传title = "成功创建商家"到商家操作结果页
          //if (result.data.status == 200) {
          // }
          //wx.reLaunch({
          //url: '../../pages/mine/index'
          //})
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
  onReady: function (e) {
    
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