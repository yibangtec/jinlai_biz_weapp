// pages/order/orderDelivery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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