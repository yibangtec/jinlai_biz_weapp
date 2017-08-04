//index.js
//获取应用实例
var app = getApp()
var login, bizId;
Page({
  data: {
    bizs: [],
    infoStyle:'display:none',
    comeInBtn:'display:none',
    name:'',
    brief_name:'',
    tel_public:'',
    tel_protected_biz:'',
    status:''
  },
  onLoad: function ()
  {
    //清除本地存储
    //wx.clearStorage()
    
  },
 
  button_biz_create:function(e){
    wx.navigateTo({
      url: '../../pages/biz/creat',
    })
  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ()
  {
    return {
      title: '进来商城',
      path: '/pages/index/index'
    }
  },

  onPullDownRefresh: function ()
  {
    console.log('onPullDownRefresh')
  
    wx.showLoading({
      title: '载入中',
    })

    var that = this
    that.get_biz(that)

    wx.hideLoading()

    wx.stopPullDownRefresh()
  },
  onShow: function () {
    var that = this;
    var timestamp = Date.parse(new Date())
    console.log(timestamp)
    //获取本地time_expire_login值，若为空或小于当前时间戳则转到密码登录页
    wx.getStorage({
      key: 'time_expire_login',
      success: function (res) {
        login = res.data
        console.log(login)
        if (login == undefined || login < timestamp) {
          wx.redirectTo({
            url: '../../pages/login/login'
          })
        }
      },
      fail: function (err) {
        console.log(err)
        wx.redirectTo({
          url: '../../pages/login/login'
        })
      }
    })
    wx.getStorage({
      key: 'user',
      success: function (res) {
        //获取本地user.password值，若为空则转到密码设置页
        console.log(res.data)
        if (res.data.content.password == "") {
          wx.redirectTo({
            url: '../../pages/login/pwset'
          })

        }

      },
      fail: function (err) {

      }
    })
    wx.getStorage({
      key: 'biz',
      success: function (res) {
        console.log(res.data)
        //获取本地user.biz_id值，若为空则结束并显示button_biz_create
        bizId = res.data.content.id
        console.log(bizId)
        //调用BIZ2，若成功则显示info_biz并赋值相应元素；若status为414则显示button_biz_create，否则进行相应提示
        // 通过API获取或处理数据
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
            data: { id: bizId },
            success: function (result) {
              console.log(bizId)
              console.log(result)
              if (result.data.status === 200) {
                that.setData({
                  infoStyle: 'display:block',
                  name: result.data.content.name,
                  brief_name: result.data.content.brief_name,
                  tel_public: result.data.content.tel_public,
                  tel_protected_biz: result.data.content.tel_protected_biz,
                  status: result.data.content.status
                });
              } else if (result.data.status === 414) {
                that.setData({
                  comeInBtn: 'display:block'
                });
              }

            },
            fail: function (result) {
              console.log(result)
              wx.vibrateShort()
            }
          })
        }
        if (res.data.content.id == "") {
          that.setData({
            comeInBtn: 'display:block'
          });
        }
      },
      fail: function (err) {

      }
    })
    console.log("onLoad")
  },
  info_biz: function (e) {
    wx.navigateTo({
      url: '../../pages/biz/detail?id=' + bizId,
    })
  },
}) // end Page
