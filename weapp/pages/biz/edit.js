// edit.js
const Upyun = require('../../utils/upyun-wxapp-sdk')
const upyun = new Upyun({
  bucket: 'jinlaisandbox-images',
  operator: 'jinlaisandbox',
})
function tick(s, bizId, userId) {
  var objD = new Date();
  var str;
  var b = bizId
  var u = userId
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
  b = b.toString()
  str = b + '/'+ yy + MM + '/' + MM + dd + '/' + hh + mm + ss + u + '.jpg';
  return str;
}

var amapFile = require('../../utils/amap-wx')
//var addToolbar = require('../../http://webapi.amap.com/maps?v=1.3&key=b0a6d590c3195b86fcc13676afa62eba&plugin=AMap.Geocoder')
//var addToolbar = require('../../http://cache.amap.com/lbs/static/addToolbar')
var user_id = '', bizId = '', name = '', brief_name = '', url_logo = '', url_name = '', slogan = '', 
  description = '', notification = '', url_web = '', url_weibo = '', url_wechat = '',
  tel_public = '', tel_protected_biz = '', tel_protected_fiscal = '', tel_protected_order = '',
  nation, province = '', city = '', county = '', street = '', longitude = '', latitude = '',
  code_license = '', code_ssn_owner = '', code_ssn_auth = '', bank_name = '', bank_account = '', fullname_owner = '',
  fullname_auth = '', product = '', produce = '', retail = '', license = '', owner_id = '', auth_id = '', auth_doc='';
var time,
  ownerSrc = '',//进行计算时候的url
  ownerImageUrl = [],//回调给后台的图片又拍云存储地址
  licenseSrc = '',
  url_logoSrc='',
  licenseImageUrl = [],
  url_logoImageUrl = [],
  authSrc = '',
  authImageUrl = [],
  authDocSrc = '',
  authDocImageUrl = [],
  productSrc = '',
  productImageUrl = [],
  produceSrc = '',
  produceImageUrl = [],
  retailSrc = [],
  retailImageUrl = [],
  biz='';
var o={}
var b={}
var j={}
var bizObj={}
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
    url_logoImageSrc:'',
    authImageSrc: '',
    authDocImageSrc: '',
    productImageSrc: '',
    produceImageSrc: '',
    retailImageSrc: '',
    index: '',
    disLicense:'display:block',
    disOwner: 'display:block',
    disAuth: 'display:block',
    disAuthDoc: 'display:block',
    disProduct: 'display:block',
    disProduce: 'display:block',
    disRetail: 'display:block',
    disUrl_logo: 'display:block',
    disLeftImg:''
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
        user_id = res.data.content.user_id
        console.log('user_id')
        console.log(user_id)
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
          console.log(result.data.content)
          biz = result.data.content
          for (var key in biz) {
            //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
            if (biz[key] === null) {
              biz[key] = ''
            }
          }  
          that.setData({
            biz: result.data.content,
          });
          if (biz.url_logo !== '') {
            var url_logo = []
              url_logo[0] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + url_logo[i]
            
            that.setData({
              url_logoImageSrc: url_logo,
            });
            console.log(that.data.licenseImageSrc)
            if (that.data.url_logoImageSrc !== '') {
              that.setData({
                disUrl_logo: 'display:none',
              });
            }
          }
          if (biz.url_image_license !== '') {
            var licenseArr = biz.url_image_license.split(",")
            for (var i = 0; i < licenseArr.length; i++) {
              licenseArr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + licenseArr[i]
            }
            
            that.setData({
              licenseImageSrc: licenseArr,
            });
            console.log(that.data.licenseImageSrc)
            if (that.data.licenseImageSrc !== ''){
              that.setData({
                disLicense: 'display:none',
              });
            }
          } 
          console.log(biz.url_image_owner_id)
          if (biz.url_image_owner_id !== '') {
            var ownerArr = biz.url_image_owner_id.split(",")
            for (var i = 0; i < ownerArr.length; i++) {
              ownerArr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + ownerArr[i]
            }
            console.log(ownerArr)
            that.setData({
              ownerImageSrc: ownerArr,
            });
            if (that.data.ownerImageSrc !== '') {
              that.setData({
                disOwner: 'display:none',
              });
            }
          }
          if (biz.url_image_auth_id!==''){
            var authArr = biz.url_image_auth_id.split(",")
            for (var i = 0; i < authArr.length; i++) {
              authArr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + authArr[i]
            }
            console.log(authArr)
            that.setData({
              authImageSrc: authArr,
            });
            if (that.data.authImageSrc !== '') {
              that.setData({
                disAuth: 'display:none',
              });
            }
          }
          if (biz.url_image_auth_doc !== '') {
            var auth_docArr = biz.url_image_auth_doc.split(",")
            for (var i = 0; i < auth_docArr.length; i++) {
              auth_docArr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + auth_docArr[i]
            }
            console.log(auth_docArr)
            that.setData({
              authDocImageSrc: auth_docArr,
            });
            if (that.data.authImageSrc !== '') {
              that.setData({
                disAuthDoc: 'display:none',
              });
            }
          }
          if (biz.url_image_product !== ''){
            console.log(biz.url_image_product)
            var productArr = biz.url_image_product.split(",")
            console.log(productArr)
            for (var i = 0; i < productArr.length; i++) {
              productArr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + productArr[i]
            }
            console.log(productArr)
            that.setData({
              productImageSrc: productArr,
            })
            if (that.data.productImageSrc.length>=4){
              that.setData({
                disProduct: 'display:none',
              });
            }
          }
          if (biz.url_image_produce !== '') {
            var produceArr = biz.url_image_produce.split(",")
            for (var i = 0; i < produceArr.length; i++) {
              produceArr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + produceArr[i]
            }
            that.setData({
              produceImageSrc: produceArr,
            })
            if (that.data.produceImageSrc.lenght >= 4) {
              that.setData({
                disProduce: 'display:none',
              });
            }
          }
          if (biz.url_image_retail !== '') {
            var retailArr = biz.url_image_retail.split(",")
            var cont = 4 - productArr.length
            for (var i = 0; i < retailArr.length; i++) {
              retailArr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + retailArr[i]
            }
            that.setData({
              retailImageSrc: retailArr,
            })
            if (that.data.retailImageSrc.lenght >= 4) {
              that.setData({
                disRetail: 'display:none',
              });
            }
          }
          
         
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
      biz.name = name
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
    biz.brief_name = brief_name
  },

  getUrl_logo:function(e){
    url_logo
  },
  chooseImageUrl_logo: function () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        url_logoSrc = res.tempFilePaths
        self.setData({
          url_logoImageSrc: url_logoSrc
        })
        if (self.data.url_logoImageSrc !== '') {
          self.setData({
            disUrl_logo: 'display:none',
          });
        } else {
          self.setData({
            disUrl_logo: 'display:block',
          });
        }
      },
      fail: function ({ errMsg }) {
        console.log('urllogo err is', errMsg)
      }
    })
  },
  upImgUrl_logo: function (e) {
    console.log('this is  upImg')
    console.log('this is  for')
    time = tick(0, bizId, user_id)
    url_logoImageUrl[0] = 'url_logo/' + time
    console.log(time)
    upyun.upload({
      localPath: url_logoSrc[0],
      remotePath: '/biz/url_logo/' + time,
      success: function (res) {
        console.log('uploadImage success, res is:', res)
        if (res.statusCode == 200) {
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          })
          biz.url_logo = url_logoImageUrl[0]
        }

      },
      fail: function ({ errMsg }) {
        console.log('uploadImage fail, errMsg is', errMsg)
      }
    })

  },
  closeImgUrl_logo: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.url_logoImageSrc;
    list.splice(index, 1)
    that.setData({
      url_logoImageSrc: list
    });
    if (that.data.url_logoImageSrc == '') {
      that.setData({
        disUrl_logo: 'display:block',
      });
    } else {
      that.setData({
        disUrl_logo: 'display:none',
      });
    }

  },
  getUrl_name:function(e){
    url_name = e.detail.value
    biz.url_name = url_name
  },
  getSlogan: function (e) {
    slogan=e.detail.value
    biz.slogan = slogan
  },
  getDescription: function (e) {
    description = e.detail.value
    biz.description = description
  },
  getNotification: function (e) {
    notification=e.detail.value
    biz.notification = notification
  },
  getUrl_web: function (e) {
    url_web=e.detail.value
    biz.url_web = url_web
  },
  getUrl_weibo: function (e) {
    url_weibo=e.detail.value
    biz.url_weibo = url_weibo
  },
  getUrl_wechat: function (e) {
    url_wechat=e.detail.value
    biz.url_wechat = url_wechat
  },
  getTel_public: function (e) {
    tel_public=e.detail.value
    var patrn = /(^(400|800)\d{7})|(\d{3,4}(-){0,1}\d{7,8}$)/;
    if (patrn.test(tel_public)) {
      biz.tel_public = tel_public
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
      biz.tel_protected_biz = tel_protected_biz
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
      biz.tel_protected_fiscal = tel_protected_fiscal
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
      biz.tel_protected_order = tel_protected_order
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
    biz.nation = nation
  },
  getProvince: function (e) {
    province=e.detail.value
    biz.province = province
  },
  getCity: function (e) {
    city=e.detail.value
    biz.city = city
  },
  getCounty: function (e) {
    county=e.detail.value
    biz.county = county
  },
  getStreet: function (e) {
    street=e.detail.value
    biz.street = street
  },
  getFullname_owner:function(e){
    fullname_owner = e.detail.value
    biz.fullname_owner = fullname_owner
  },
  getFullname_auth: function (e) {
    fullname_auth = e.detail.value
    biz.fullname_auth = fullname_auth
  },
  getCode_license: function (e) {
    code_license=e.detail.value
    var patrn = /^[a-zA-Z0-9]{15,18}$/;
    if (patrn.test(code_license)) {
      biz.code_license = code_license
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
      biz.code_ssn_owner = code_ssn_owner
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
      biz.code_ssn_auth = code_ssn_auth
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
      biz.bank_name = bank_name
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
      biz.bank_account = bank_account
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
    console.log('this is  for')
    time = tick(0, bizId, user_id)
    licenseImageUrl[0] = 'license/' + time
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
          biz.url_image_license = licenseImageUrl[0]
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
    if (that.data.licenseImageSrc == '') {
      that.setData({
        disLicense: 'display:block',
      });
    }else{
      that.setData({
        disLicense: 'display:none',
      });
    }

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
  upImgOwner: function (e) {
    console.log('this is  upImg')
    for (var i = 0; i < ownerSrc.length; i++) {
      console.log('this is  for')
      time = tick(i, bizId, user_id)
      ownerImageUrl[i] = 'owner_id/' + time
      //console.log(arr[i])
      upyun.upload({
        localPath: ownerSrc[i],
        remotePath: '/biz/owner_id/' + time,
        success: function (res) {
          console.log('uploadImage success, res is:', res)
          if (res.statusCode == 200) {
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })
            biz.url_image_owner_id = ownerImageUrl[i]
          }
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
    if (that.data.ownerImageSrc == '') {
      that.setData({
        disOwner: 'display:block',
      });
    }else{
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
      time = tick(i, bizId, user_id)
      authImageUrl[i] = 'auth_id/' + time
      //console.log(arr[i])
      upyun.upload({
        localPath: authSrc[i],
        remotePath: '/biz/auth_id/' + time,
        success: function (res) {
          console.log('uploadImage success, res is:', res)
          if (res.statusCode == 200) {
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })
            biz.url_image_auth_id = authImageUrl[i]
          }
          
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
    if (that.data.authImageSrc == '') {
      that.setData({
        disAuth: 'display:block',
      });
    }else{
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
      time = tick(i, bizId, user_id)
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
          biz.url_image_auth_doc = authDocImageUrl[i]
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
    if (that.data.authDocImageSrc == '') {
      that.setData({
        disAuthDoc: 'display:block',
      });
    }else{
      that.setData({
        disAuthDoc: 'display:none',
      });
    }
  },

  //产品

  chooseImageProduct: function () {
    const self = this
    var num = 4 - self.data.productImageSrc.length
    wx.chooseImage({
      count: num,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        console.log(self.data.productImageSrc)
        var beforeProductArr = self.data.productImageSrc
        productSrc = res.tempFilePaths
        console.log( productSrc)
        if (beforeProduceArr) {
          beforeProductArr = beforeProductArr.concat(productSrc)
        } else {
          beforeProductArr = productSrc
        }
        
        console.log(beforeProductArr)
        self.setData({
          productImageSrc: beforeProductArr
        })
        if (self.data.productImageSrc.length >= 4) {
          console.log(self.data.productImageSrc)
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
      time = tick(i, bizId, user_id)
      productImageUrl[i] = 'product/' + time
      //console.log(arr[i])
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
    //biz.url_image_product = productImageUrl.join(",")
  },
  closeImgProduct: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.productImageSrc;
    console.log( list)
    list.splice(index, 1)
    that.setData({
      productImageSrc: list
    });
    if (that.data.productImageSrc.length < 4) {
      that.setData({
        disProduct: 'display:block',
      });
    }
    console.log(that.data.productImageSrc)
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
  //工厂
  chooseImageProduce: function () {
    const self = this
    var num = 4-self.data.produceImageSrc.length
    console.log(num)
    wx.chooseImage({
      count: num,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        var beforeProduceArr = self.data.produceImageSrc
        produceSrc = res.tempFilePaths
        console.log(productSrc)
        if (beforeProduceArr) {
          beforeProduceArr = beforeProduceArr.concat(produceSrc)
        } else {
          beforeProduceArr = produceSrc
        }
        
        self.setData({
          produceImageSrc: beforeProduceArr
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
      time = tick(i, bizId, user_id)
      produceImageUrl[i] = 'produce/' + time
      //console.log(arr[i])
      b[produceSrc[i]] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + produceImageUrl[i]
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
    //biz.url_image_produce = produceImageUrl.join(",")
  },
  closeImgProduce: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.produceImageSrc;
    list.splice(index, 1)
    that.setData({
      produceImageSrc: list
    });
    if (that.data.produceImageSrc.lenght < 4) {
      that.setData({
        disProduce: 'display:none',
      });
    }
  },
  moveLeftPe: function (e) {
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
  //门店

  chooseImageRetail: function () {
    const self = this
    var num = 4 - self.data.retailImageSrc.length
    wx.chooseImage({
      count: num,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        var beforeRetailArr = self.data.retailImageSrc
        console.log('图片选择是beforeRetailArr')
        console.log(beforeRetailArr)
        retailSrc = res.tempFilePaths
        console.log('图片选择是retailSrc')
        console.log(retailSrc)
        if (beforeRetailArr){
          beforeRetailArr = beforeRetailArr.concat(retailSrc)
        }else{
          beforeRetailArr = retailSrc
        }
        
        console.log('图片选择是concat')
        console.log(beforeRetailArr)
        self.setData({
          retailImageSrc: beforeRetailArr
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
    var that = this
    console.log('this is  upImg')
    for (var i = 0; i < retailSrc.length; i++) {
      console.log('this is  for')
      time = tick(i, bizId, user_id)
      retailImageUrl[i] = 'retail/' + time
      //console.log(arr[i])
      j[retailSrc[i]] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + retailImageUrl[i]
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
    //biz.url_image_retail = retailImageUrl.join(",")
  },
  closeImgRetail: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.retailImageSrc;
    list.splice(index, 1)
    that.setData({
      retailImageSrc: list
    });
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
  submit: function (e) {
    var that = this
    if (!name) {
      name = biz.name
      console.log(name)
    }
    if (!county){
      county = biz.county
      console.log(county)
    }
    
    var pt = that.data.productImageSrc
    if (pt.length>0){
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
      product = pt.join(',')
      biz.url_image_product = product
      console.log(product)
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
      produce = pe.join(',')
      biz.url_image_produce = produce
      console.log(produce)
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
      retail = re.join(',')
      biz.url_image_retail = retail
      console.log(retail)
    }
    
    
    if (licenseImageUrl.length >0){
      license = licenseImageUrl[0]
    }else{
      license = biz.url_image_license
    }
    console.log(license)
    if (ownerImageUrl.length > 0) {
      owner_id = ownerImageUrl[0]
    } else {
      owner_id = biz.url_image_owner_id
    }
    console.log(owner_id)
    if (authImageUrl.length > 0) {
      auth_id = authImageUrl[0]
    } else {
      auth_id = biz.url_image_auth_id
    }
    console.log(auth_id)
    if (authDocImageUrl.length > 0) {
      auth_doc = authDocImageUrl[0]
    } else {
      auth_doc = biz.url_image_auth_doc
    }
    
    biz.app_type= 'biz'
    biz.id = bizId
    biz.user_id = user_id

    for (var key in biz) {
      //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
      if (biz[key] === 'null') {
        biz[key] =''
      }
    }  
    console.log(biz)


    var url = 'biz/edit'
    var params = {}
    var api_result = api_request(url, params)
    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      app.sign_generate(api_params)
      console.log(product)
      // 通过小程序的网络请求API发送请求
      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: biz,
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
            wx.navigateBack({
              url: '../../pages/biz/detail?id=' + bizId,
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
   * {app_type: 'biz', id: bizId, user_id: user_id, name: name, brief_name: brief_name, url_name: url_name,url_logo: url_logo, slogan: slogan,
          description: description, notification: notification, url_web: url_web, url_weibo: url_weibo, url_wechat: url_wechat,
          tel_public: tel_public, tel_protected_biz: tel_protected_biz, tel_protected_fiscal: tel_protected_fiscal, tel_protected_order:tel_protected_order,
          fullname_owner: fullname_owner, fullname_auth: fullname_auth,code_license: code_license,code_ssn_owner: code_ssn_owner,
          code_ssn_auth: code_ssn_auth, url_image_license: license, url_image_owner_id: owner_id,url_image_auth_id: auth_id,url_image_auth_doc: auth_doc,
          bank_name: bank_name, bank_account: bank_account, url_image_product: product, url_image_produce: produce, url_image_retail: retail,
          nation: nation,province: province,city: city, county: county, street: street,longitude: 39.23222,latitude: 116.23456}
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