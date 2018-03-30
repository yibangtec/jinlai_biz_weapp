// pages/coupon_template/index.js
var app = getApp()
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
    listAll: 'display:block',
    listCreat: 'display:none',
    selectedAll: false,
    selectedAllStatus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var url = 'coupon/index'
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
  },
  deleteCategory: function (e) {
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
  edit:function(e){
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