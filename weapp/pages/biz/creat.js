// creat.js
var user_id,
name, 
brief_name, 
description,
tel_public,
tel_protected_biz,
code_license,
code_ssn_owner,
code_ssn_auth,
bank_name,
bank_account,
time,
ownerSrc,//进行计算时候的url
ownerImageUrl = [];
//ownerSrc,
//ownerImageUrl = [],
//回调给后台的图片又拍云存储地址

const Upyun = require('../../utils/upyun-wxapp-sdk')
const upyun = new Upyun({
  bucket: 'jinlaisandbox-images',
  operator: 'jinlaisandbox',
})



//var str = 'orderId=21140600050549799429&orderStatus=TRADE_SUCCESS&payTime=2014-07-22 11:43:31';
//var key = 'REzySUKRCPfyfV/jfgwTA==';
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
  var ss = objD.getSeconds()+s;
  if (ss < 10) ss = '0' + ss;
  str = yy + MM + dd + "_" + hh + mm + ss + '.jpg';
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
    displayImg: 'display:block',
    index:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'user',
      success: function (res) {
        user_id = res.data.content.user_id
      },
      fail: function (err) {

      }
    })
  
  },
  getName:function(e){
    name = e.detail.value
  },
  verName:function(e){
    var patrn = /^.{7,30}$/; 
    if (patrn.test(name)){

    }else{
      wx.showToast({
        title: '输入字符长度应在7到30个',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getBrief_name: function (e) {
    brief_name = e.detail.value
  },
  getDescription:function(e){
    description = e.detail.value
  },
  getTel_public: function (e) {
    tel_public = e.detail.value
    var patrn = /(^(400|800)\d{7})|(\d{3,4}(-){0,1}\d{7,8}$)/;
    if (patrn.test(tel_public)) {

    } else {
      wx.showToast({
        title: '输入格式不正确',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getTel_protected_biz: function (e) {
    tel_protected_biz = e.detail.value
    var re = /^1\d{10}$/
    if (re.test(tel_protected_biz)) {

    } else {
      wx.showToast({
        title: '输入格式不正确',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getCode_license: function (e) {
    code_license = e.detail.value
    var patrn = /^.{18}$/; 
    if (patrn.test(code_license)) {

    } else {
      wx.showToast({
        title: '请输入18位',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getCode_ssn_owner: function (e) {
    code_ssn_owner = e.detail.value
    var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
    if (isIDCard2.test(code_ssn_owner)) {

    } else {
      wx.showToast({
        title: '请输入18正确格式身份证号',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getCode_ssn_auth: function (e) {
    code_ssn_auth = e.detail.value
    var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
    if (isIDCard2.test(code_ssn_auth)) {

    } else {
      wx.showToast({
        title: '请输入18正确格式身份证号',
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
    var re = /[0-9](-)/
    if (re.test(bank_account)) {

    } else {
      wx.showToast({
        title: '请输入正确格式开户行账号',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  closeImgLicense: function () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        ownerSrc = res.tempFilePaths
        self.setData({
          ownerImageSrc: ownerSrc
        })
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  upImgLicense: function (e) {
    console.log('this is  upImg')
    for (var i = 0; i < ownerSrc.length; i++) {
      console.log('this is  for')
      time = tick(i)
      ownerImageUrl[i] = '/auth_doc/' + time
      //console.log(arr[i])
      upyun.upload({
        localPath: ownerSrc[i],
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
  chooseImageLicense: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.ownerImageSrc;
    list.splice(index, 1)
    that.setData({
      ownerImageSrc: list
    });
  },

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
          ownerImageSrc: ownerSrc
        })
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
      time = tick(i)
      ownerImageUrl[i] = '/auth_doc/' + time
      //console.log(arr[i])
      upyun.upload({
        localPath: ownerSrc[i],
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
  closeImgOwner:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.ownerImageSrc;
    list.splice(index, 1)
    that.setData({
      ownerImageSrc: list
    });
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