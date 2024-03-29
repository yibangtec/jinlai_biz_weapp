// creat.js
var user_id,
name = '', 
brief_name = '', 
description = '',
tel_public = '',
tel_protected_biz = '',
fullname_owner = '',
fullname_auth = '',
code_license = '',
code_ssn_owner = '',
code_ssn_auth = '',
bank_name = '',
bank_account = '',
time = '',
ownerSrc = '',//进行计算时候的url
ownerImageUrl = [],//回调给后台的图片又拍云存储地址
url_image_license = '',
licenseSrc = '',
licenseImageUrl = [],
url_image_owner_id = '',
authSrc = '',
authImageUrl=[],
url_image_auth_id = '',
authDocSrc = '',
authDocImageUrl = [],
url_image_auth_doc = '',
productSrc = '',
productImageUrl = [],
url_image_product = '',
produceSrc = '',
produceImageUrl = [],
url_image_produce = '',
retailSrc = '',
retailImageUrl = [],
url_image_retail = '';
var o = {}
var b = {}
var j = {}

const Upyun = require('../../utils/upyun-wxapp-sdk')
const upyun = new Upyun({
  bucket: 'jinlaisandbox-images',
  operator: 'jinlaisandbox',
})



//var str = 'orderId=21140600050549799429&orderStatus=TRADE_SUCCESS&payTime=2014-07-22 11:43:31';
//var key = 'REzySUKRCPfyfV/jfgwTA==';
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
  var ss = objD.getSeconds()+s;
  if (ss < 10) ss = '0' + ss;
  u = u.toString()
  str = yy + MM + '/' + MM + dd + '/' + hh + mm + ss + u + '.jpg';
  return str;
}

var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    display:'display:none',
    array:'',
    tel:'',
    ownerImageSrc:'',//展现到view层的图片地址
    licenseImageSrc:'',
    authImageSrc:'',
    authDocImageSrc: '',
    productImageSrc: '',
    produceImageSrc: '',
    retailImageSrc: '',
    index:'',
    disable:true,
    disLicense: 'display:block',
    disOwner: 'display:block',
    disAuth: 'display:block',
    disAuthDoc: 'display:block',
    disProduct: 'display:block',
    disProduce: 'display:block',
    disRetail: 'display:block',
    lineUp:'display:block;',
    firstIn:'display:none;',
    nameFocus:false,
    briefnameFocus: false,
    TelpublicFocus: false,
    licenseFocus: false,
    ownerFocus: false,
    ssnownerFocus:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    //获取本地user.user_id、user.mobile值备用
    //赋值tel_protected_biz相应部分为user.mobile值
    var that = this
    //获取本地user.user_id、user.mobile值备用
    //赋值tel_protected_biz相应部分为user.mobile值
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data.content.mobile)
        user_id = res.data.content.user_id
        console.log(user_id)
        tel_protected_biz = res.data.content.mobile
        that.setData({
          tel: res.data.content.mobile,
        })
      },
      fail: function (err) {

      }
    })
  
  },
  firstIn:function(e){  
    this.setData({
      lineUp: 'display:none;',
      firstIn: 'display:block;'
    })
  },
  lineUp:function(e){
    this.setData({
      lineUp: 'display:block;',
      firstIn: 'display:none;'
    })
  },
  getName:function(e){
    name = e.detail.value
  },
  verName:function(e){
    var patrn = /^.{5,35}$/; 
    if (patrn.test(name)){

    }else{
      wx.showToast({
        title: '商家全称5到35字之间',
        icon: 'loading',
        duration: 2000
      })
      this.setData({
        nameFocus: true,
      })
    }
  },
  getBrief_name: function (e) {
    brief_name = e.detail.value
  },
  verBrief_name: function (e) {
    var patrn = /^.{0,15}$/;
    if (patrn.test(brief_name)) {

    } else {
      wx.showToast({
        title: '商家简称最长15个字',
        icon: 'loading',
        duration: 2000
      })
      this.setData({
        briefnameFocus: true,
      })
    }
  },
  getDescription:function(e){
    description = e.detail.value
  },
  getTel_public: function (e) {
    tel_public = e.detail.value
  },
  verTel_public: function (e) {
    var patrn = /(^(400|800)\d{7})|(\d{3,4}(-){0,1}\d{7,8}$)/;
    if (patrn.test(tel_public)) {
    } else {
      wx.showToast({
        title: '消费者联系电话输入格式不正确',
        icon: 'loading',
        duration: 2000
      })
      this.setData({
        TelpublicFocus: true,
      })
    }
  },
  getTel_protected_biz: function (e) {
    tel_protected_biz = e.detail.value
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
  getFullname_owner:function(e){
    fullname_owner = e.detail.value
  },
  getFullname_auth:function(e){
    fullname_auth = e.detail.value
  },
  getCode_license: function (e) {
    code_license = e.detail.value
    code_license = code_license.toLowerCase()
    console.log(code_license)
  },
  verCode_license: function (e) {
    var patrn = /^[a-zA-Z0-9]{15,18}$/;
    if (patrn.test(code_license)) {
    } else {
      wx.showToast({
        title: '工商注册号15-18位',
        icon: 'loading',
        duration: 2000
      })
      this.setData({
        licenseFocus: true,
      })
    }
  },
  getCode_ssn_owner: function (e) {
    code_ssn_owner = e.detail.value
  },
  verCode_ssn_owner: function (e) {
    var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
    if (isIDCard2.test(code_ssn_owner)) {

    } else {
      wx.showToast({
        title: '法人身份证号格式错误',
        icon: 'loading',
        duration: 2000
      })
      this.setData({
        ssnownerFocus: true,
      })
    }
  },
  getCode_ssn_auth: function (e) {
    code_ssn_auth = e.detail.value
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
    bank_name = e.detail.value
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
  getProvince:function(e){
    province = e.detail.value
  },
  getCity: function (e) {
    city = e.detail.value
  },
  getCounty: function (e) {
    county = e.detail.value
  },
  getStreet: function (e) {
    street = e.detail.value
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
        if (self.data.licenseImageSrc !== '') {
          self.setData({
            disLicense: 'display:none',
          });
        } else {
          self.setData({
            disLicense: 'display:block',
          });
        }
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage licenseImageSrc fail, err is', errMsg)
      }
    })
  },
  upImgLicense: function (e) {
    console.log('this is  upImg')
    console.log('this is  for' + user_id)
      time = tick(0,user_id)
      licenseImageUrl[0] = 'license/' + time
      console.log(time)
      upyun.upload({
        localPath: licenseSrc[0],
        remotePath: '/biz/license/' + time,
        success: function (res) {
          console.log('uploadImage success, res is:', res)
          if (res.statusCode==200){
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
      url_image_license = licenseImageUrl.join(',')
      console.log(url_image_license)
  },
  closeImgLicense: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.licenseImageSrc;
    list.splice(index, 1)
    that.setData({
      licenseImageSrc: list
    })
    if (that.data.licenseImageSrc == '') {
      that.setData({
        disLicense: 'display:block',
      });
    } else {
      that.setData({
        disLicense: 'display:none',
      });
    }
  },
  preview:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.licenseImageSrc;
    var curr=list[index]
    wx.previewImage({
      current: curr, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
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
        ownerSrc=res.tempFilePaths
        self.setData({
          ownerImageSrc: ownerSrc,
          disable: false
        })  
        if (self.data.ownerImageSrc !== '') {
          self.setData({
            disOwner: 'display:none',
          });
        } else {
          self.setData({
            disOwner: 'display:block',
          });
        }
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  upImgOwner:function(e){
    console.log('this is  upImg')
    for (var i = 0; i < ownerSrc.length;i++){
      console.log('this is  for')
      //time = tick()
      time = tick(i, user_id)
      ownerImageUrl[i] = 'owner_id/' + time
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
    url_image_owner_id = ownerImageUrl.join(',')
    console.log(url_image_owner_id)
  },
  closeImgOwner:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.ownerImageSrc;
    list.splice(index, 1)
    that.setData({
      ownerImageSrc: list
    });
    if (that.data.ownerImageSrc == '') {
      that.setData({
        disOwner: 'display:block',
      });
    } else {
      that.setData({
        disOwner: 'display:none',
      });
    }
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
        if (self.data.authImageSrc !== '') {
          self.setData({
            disAuth: 'display:none',
          });
        } else {
          self.setData({
            disAuth: 'display:block',
          });
        }
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
      time = tick(i, user_id)
      authImageUrl[i] = 'auth_id/' + time
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
    url_image_auth_id = authImageUrl.join(',')
    console.log(url_image_auth_id)
  },
  closeImgAuth: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.authImageSrc;
    list.splice(index, 1)
    that.setData({
      authImageSrc: list
    });
    if (that.data.authImageSrc == '') {
      that.setData({
        disAuth: 'display:block',
      });
    } else {
      that.setData({
        disAuth: 'display:none',
      });
    }
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
        if (self.data.authImageSrc !== '') {
          self.setData({
            disAuthDoc: 'display:none',
          });
        } else {
          self.setData({
            disAuthDoc: 'display:block',
          });
        }
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
      time = tick(i, user_id)
      authDocImageUrl[i] = 'auth_doc/' + time
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
    url_image_auth_doc = authDocImageUrl.join(',')
    console.log(url_image_auth_doc)

  },
  closeImgAuthDoc: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.authDocImageSrc;
    list.splice(index, 1)
    that.setData({
      authDocImageSrc: list
    });
    if (that.data.authDocImageSrc == '') {
      that.setData({
        disAuthDoc: 'display:block',
      });
    } else {
      that.setData({
        disAuthDoc: 'display:none',
      });
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
        var productArr = [] 
        productArr= self.data.productImageSrc
        productSrc = res.tempFilePaths
        if (productArr){
          productArr = productArr.concat(productSrc)
        }else{
          productArr = productSrc
        }
        self.setData({
          productImageSrc: productArr
        })
        if (self.data.productImageSrc.length >= 4) {
          self.setData({
            disProduct: 'display:none',
          });
        }
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
      time = tick(i, user_id)
      productImageUrl[i] = 'product/' + time
      o[productSrc[i]] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + productImageUrl[i]
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
    //url_image_product = productImageUrl.join(',')
    //console.log(url_image_product)
  },
  closeImgProduct: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.productImageSrc;
    list.splice(index, 1)
    that.setData({
      productImageSrc: list
    })
    if (that.data.productImageSrc.length < 4) {
      that.setData({
        disProduct: 'display:block',
      });
    }
  },
  moveLeftPt: function (e) {
    var that = this;
    var beforeArr = that.data.productImageSrc
    console.log(beforeArr)
    var index = e.currentTarget.dataset.index;
    if (index != 0) {
      console.log(index)
      var temp = beforeArr[index - 1]
      beforeArr[index - 1] = beforeArr[index]
      beforeArr[index] = temp
      that.setData({
        productImageSrc: beforeArr
      });
    }
  },
  moveRightPt: function (e) {
    var that = this;
    var beforeArr = that.data.productImageSrc
    console.log(beforeArr)
    var index = e.currentTarget.dataset.index;
    if (index != beforeArr.length-1) {
      console.log(index)
      var temp = beforeArr[index + 1]
      beforeArr[index + 1] = beforeArr[index]
      beforeArr[index] = temp
      that.setData({
        productImageSrc: beforeArr
      });
    }
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
        var produceArr =[]
        produceArr= self.data.produceImageSrc
        produceSrc = res.tempFilePaths
        if (produceArr){
          produceArr = produceArr.concat(produceSrc)
        }else{
          produceArr = produceSrc
        }
        self.setData({
          produceImageSrc: produceArr
        })
        if (self.data.produceImageSrc.length >= 4) {
          self.setData({
            disProduce: 'display:none',
          });
        }
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
      time = tick(i, user_id)
      produceImageUrl[i] = 'produce/' + time
      b[produceSrc[i]] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + produceImageUrl[i]
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
    //url_image_produce = produceImageUrl.join(',')
    //console.log(url_image_produce)
  },
  closeImgProduce: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.produceImageSrc;
    list.splice(index, 1)
    that.setData({
      produceImageSrc: list
    })
    if (that.data.produceImageSrc.lenght < 4) {
      that.setData({
        disProduce: 'display:none',
      })
    }
  },
  moveLeftCe: function (e) {
    var that = this;
    var beforeArr = that.data.produceImageSrc
    console.log(beforeArr)
    var index = e.currentTarget.dataset.index;
    if (index != 0) {
      console.log(index)
      var temp = beforeArr[index - 1]
      beforeArr[index - 1] = beforeArr[index]
      beforeArr[index] = temp
      that.setData({
        produceImageSrc: beforeArr
      });
    }
  },
  moveRightCe: function (e) {
    var that = this;
    var beforeArr = that.data.produceImageSrc
    console.log(beforeArr)
    var index = e.currentTarget.dataset.index;
    if (index != beforeArr.length - 1) {
      console.log(index)
      var temp = beforeArr[index + 1]
      beforeArr[index + 1] = beforeArr[index]
      beforeArr[index] = temp
      that.setData({
        produceImageSrc: beforeArr
      });
    }
  },
  //门店

  chooseImageRetail: function () {
    const self = this
    wx.chooseImage({
      count: 4,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        var retailArr = []
        retailArr= self.data.retailImageSrc
        retailSrc = res.tempFilePaths
        if (retailArr){
          retailArr = retailArr.concat(retailSrc)
        }else{
          retailArr = retailSrc
        }
        
        self.setData({
          retailImageSrc: retailArr
        })
        if (self.data.retailImageSrc.length >= 4) {
          self.setData({
            disRetail: 'display:none',
          });
        }
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  upImgRetail: function (e) {
    var that =this
    console.log('this is  upImg')
    for (var i = 0; i < retailSrc.length; i++) {
      console.log('this is  for')
      time = tick(i, user_id)
      retailImageUrl[i] = 'retail/' + time
      b[retailSrc[i]] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + retailImageUrl[i]
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
    //url_image_retail = retailImageUrl.join(',')
    //console.log(url_image_retail)
  },
  closeImgRetail: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.retailImageSrc;
    list.splice(index, 1)
    that.setData({
      retailImageSrc: list
    })
    if (that.data.retailImageSrc.lenght < 4) {
      that.setData({
        disRetail: 'display:block',
      });
    }
  },
  moveLeftRe: function (e) {
    var that = this;
    var beforeArr = that.data.retailImageSrc
    console.log(beforeArr)
    var index = e.currentTarget.dataset.index;
    if (index != 0) {
      console.log(index)
      var temp = beforeArr[index - 1]
      beforeArr[index - 1] = beforeArr[index]
      beforeArr[index] = temp
      that.setData({
        retailImageSrc: beforeArr
      });
    }
  },
  moveRightRe: function (e) {
    var that = this;
    var beforeArr = that.data.retailImageSrc
    console.log(beforeArr)
    var index = e.currentTarget.dataset.index;
    if (index != beforeArr.length - 1) {
      console.log(index)
      var temp = beforeArr[index + 1]
      beforeArr[index + 1] = beforeArr[index]
      beforeArr[index] = temp
      that.setData({
        retailImageSrc: beforeArr
      });
    }
  },
  submit:function(e){
    var that = this
    var pt = that.data.productImageSrc
    if (pt.length > 0) {
      for (var i = 0; i < pt.length; i++) {
        if (o.hasOwnProperty(pt[i]) == true) {
          pt[i] = o[pt[i]]
        }
      }
      console.log(pt)
      for (var i = 0; i < pt.length; i++) {
        pt[i] = pt[i].replace('https://jinlaisandbox-images.b0.upaiyun.com/biz/', "")
      }
      console.log(pt)
      url_image_product = pt.join(',')
      console.log(url_image_product)
    }
    var pe = that.data.produceImageSrc
    if (pe.length > 0) {
      for (var i = 0; i < pe.length; i++) {
        if (b.hasOwnProperty(pe[i]) == true) {
          pe[i] = b[pe[i]]
        }
      }
      console.log(pe)
      for (var i = 0; i < pe.length; i++) {
        pe[i] = pe[i].replace('https://jinlaisandbox-images.b0.upaiyun.com/biz/', "")
      }
      url_image_produce = pe.join(',')
      console.log(url_image_produce)
    }
    var re = that.data.retailImageSrc
    if (re.length > 0) {
      for (var i = 0; i < re.length; i++) {
        if (j.hasOwnProperty(re[i]) == true) {
          re[i] = j[re[i]]
        }
      }
      console.log(pe)
      for (var i = 0; i < re.length; i++) {
        re[i] = re[i].replace('https://jinlaisandbox-images.b0.upaiyun.com/biz/', "")
      }
      url_image_retail = re.join(',')
      console.log(url_image_retail)
    }
    if (name == null || brief_name == null || tel_public == null || tel_protected_biz == null || code_license == null || code_ssn_owner == null || licenseImageUrl == null || ownerImageUrl == null){
      wx.showToast({
        title: '带*号的是必须填写的，请补充完整',
        icon: 'success',
        duration: 1000
      })
    }
    var url = 'biz/create'
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
        data: {app_type:'biz',user_id: user_id, name: name, brief_name: brief_name,
          description: description, tel_public: tel_public, tel_protected_biz: tel_protected_biz, fullname_owner: fullname_owner, fullname_auth: fullname_auth,
         code_license: code_license, code_ssn_owner: code_ssn_owner, code_ssn_auth: code_ssn_auth, url_image_license: url_image_license, url_image_owner_id: url_image_owner_id, 
         url_image_auth_id: url_image_auth_id, url_image_auth_doc: url_image_auth_doc, bank_name: bank_name, bank_account: bank_account, url_image_product: url_image_product,
         url_image_produce: url_image_produce, url_image_retail: url_image_retail},
        success: function (result) {
          console.log(result)
          var bizId = result.data.content.biz_id
          console.log(bizId)
          //调用BIZ3，若失败则结束并进行提示
          if (result.data.status==200){
            //设置本地user.biz_id为返回结果中的biz_id值
            wx.showToast({
              title: '创建成功',
              icon: 'success',
              duration: 1000
            })
            wx.setStorage({
              key: "biz",
              data: result
            })
            wx.redirectTo({
              url: '../login/pwresult?title="商家创建成功"'
            })
          }else{
            var err = result.data.content.error.message
            wx.showToast({
              title: err,
              icon: 'success',
              duration: 1000
            })
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
    var that = this
    console.log('onPullDownRefresh')

    wx.showLoading({
      title: '载入中',
    })
    //that.get_biz(that)

    wx.hideLoading()

    wx.stopPullDownRefresh()
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