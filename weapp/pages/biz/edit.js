// edit.js
var amapFile = require('../../utils/amap-wx')
//var addToolbar = require('../../http://webapi.amap.com/maps?v=1.3&key=b0a6d590c3195b86fcc13676afa62eba&plugin=AMap.Geocoder')
//var addToolbar = require('../../http://cache.amap.com/lbs/static/addToolbar')
var user_id, bizId, name, brief_name, url_logo, url_name, slogan, description, notification, url_web, url_weibo, url_wechat,
  tel_public, tel_protected_biz, tel_protected_fiscal, tel_protected_order, nation, province, city, county, street, longitude, latitude,
  code_license, code_ssn_owner, code_ssn_auth, bank_name, bank_account;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:'',
    biz:'',
    con:'container'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that=this
    
    wx.request({
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: 'https://restapi.amap.com/v3/geocode/geo?address=北京市朝阳区阜通东大街6号&output=JSON&key=b0a6d590c3195b86fcc13676afa62eba',
      success: function (result) {
        console.log(result)
        
      },
      fail: function (result) {
        console.log(result)
      }
    })
    var myAmapFun = new amapFile.AMapWX({ key: 'b0a6d590c3195b86fcc13676afa62eba' });
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
    var map = new AMap.Map(that.data.con, {
      center: [117.000923, 36.675807],
      zoom: 6
    });
    console.log(that.data.con)
    //获取本地user.user_id值，以及传入的biz_id值
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data.content.mobile)
        user_id = res.data.content.user_id
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
    var patrn = /^.{7,30}$/;
    if (patrn.test(name)) {

    } else {
      wx.showToast({
        title: '商家全称输入字符长度应在7到30个',
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
  getCode_license: function (e) {
    code_license=e.detail.value
    var patrn = /^.{18}$/;
    if (patrn.test(code_license)) {

    } else {
      wx.showToast({
        title: '请输入18位营业执照号',
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