// pages/team/index.js
var app = getApp()
var obj = {}
obj.type = 'freePostage'
obj.type_actual = 'piece'
var name = ''
var tel = ''
var role = '管理员'
var level = ''
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
    tab: {
      freePostage: 'type-current',
      logistics: '',
      electron: '',
    },
    typeContent: {
      freePostage: 'display:block',
      logistics: 'display:none',
      electron: 'display:none'
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
    errorTips:'',
    tipsDisplay:'display:none',
    btnStyle:'background-color:#CACACA;'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var url = 'stuff/index'
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
        data: { limit: 10, },
        success: function (result) {
          console.log(result.data)
          var list = result.data.content
          for (var i = 0; i < list.length; i++) {
            list[i].selected = false
          }
          that.setData({
            item: list
          })
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
  },
  typeClick: function (e) {
    var that = this
    var thisType = e.currentTarget.dataset.type
    console.log(thisType)
    var typeContent = that.data.typeContent
    var tab = that.data.tab
    for (var key in typeContent) {
      //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
      if (key == thisType) {
        typeContent[key] = 'display:block'
        tab[key] = 'type-current'
      } else {
        typeContent[key] = 'display:none'
        tab[key] = ''
      }
    }
    that.setData({
      typeContent: typeContent,
      tab: tab,
    })
    obj.type = thisType
    if (thisType =='freePostage'){
      role = '管理员'
    } else if (thisType == 'logistics'){
      role = '经理'
    } else if (thisType == 'electron'){
      role = '成员'
    } else{
      role = '管理员'
    }
    


  },
  allTeam: function (e) {
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
      footedStyle: 'display:block',
      footedBar: 'display:block',
    })
    var url = 'stuff/index'
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
        data: { limit: 10, },
        success: function (result) {
          console.log(result.data)
          var list = result.data.content
          for (var i = 0; i < list.length; i++) {
            list[i].selected = false
          }
          that.setData({
            item: list
          })
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }

  },
  deleteTeam: function (e) {

    var that = this
    that.setData({
      currentTab: {
        first: '',
        center: 'tab-current',
        last: ''
      },
      listAll: 'display:block',
      isEdit: 'display:block',
      listCreat: 'display:none',
    })
    
  },
  crearTeam: function (e) {
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
  getName:function(e){
    name = e.detail.value
    console.log(name)
    if (name.trim().length > 0) {
      this.setData({
        errorTips: '',
        tipsDisplay: 'display:none'
      });
    } else {
      this.setData({
        errorTips: '姓名不能为空',
        tipsDisplay: 'display:block'
      });
    }
  },
  wacthName:function(e){
    var fullName = e.detail.value
    if (fullName.trim().length > 0) {
      this.setData({
        errorTips: '',
        tipsDisplay: 'display:none'
      });
    } else {
      
    }
  },
  getMobile:function(e){
    tel = e.detail.value
    var regTel = /^1\d{10}$/;
    if (regTel.test(tel)) {
      this.setData({
        errorTips: '',
        tipsDisplay: 'display:none'
      });
    } else {
      this.setData({
        errorTips: '手机号格式错误',
        tipsDisplay: 'display:block'
      });
    }
  },
  wacthtMobile: function (e) {
    var mobile = e.detail.value
    var regTel = /^1\d{10}$/;
    if (regTel.test(tel)) {
      this.setData({
        errorTips: '',
        tipsDisplay: 'display:none'
      });
    } else {

    }
  },
  getLevel:function(e){
    level = e.detail.value
  },
  wacthLevel:function(e){
    var levelCurrent = e.detail.value
    if (levelCurrent.trim().length>0){
      this.setData({
        btnStyle: 'background-color:#ff3649;'
      });
    }
    
  },
  submitCreate:function(e){
    var that = this
    var url = 'stuff/create'
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
        data: { app_type: 'biz', user_id: userId, mobile: tel, role:role, level:level, biz_id:bizId,},
        success: function (result) {
          console.log(result.data)
          var list = result.data.content
          for (var i = 0; i < list.length; i++) {
            list[i].selected = false
          }
          that.setData({
            item: list
          })
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