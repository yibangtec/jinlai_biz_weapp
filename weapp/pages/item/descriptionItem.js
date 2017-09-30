// pages/item/descriptionItem.js
const Upyun = require('../../utils/upyun-wxapp-sdk')
const upyun = new Upyun({
  bucket: 'jinlaisandbox-images',
  operator: 'jinlaisandbox',
})
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
  var ss = objD.getSeconds() + s;
  if (ss < 10) ss = '0' + ss;
  u = u.toString()
  str = yy + MM + '/' + MM + dd + '/' + hh + mm + ss + u + '.jpg';
  return str;
}
var app = getApp();
var itemId = ''
var value = ''
var user_id = ''
var itemName = ''
var thisObj = ''
var itemValue = ''
var text = ''
var indexText=''

function formatDateTime(timeStamp) {
  var date = new Date();
  date.setTime(timeStamp * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    value: '',
    dis: true,
    length: '',
    showModal: false,
    text:'',
    imgSrc:'',
    array:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        user_id = res.data.content.user_id
      },
      fail: function (err) {

      }
    })
    
  },
  showDialogBtn: function (e) {
    
    indexText = e.currentTarget.dataset.index + 1
    console.log(indexText)
    this.setData({
      showModal: true
    })
  },
  getText:function(e){
    text=e.detail.value
    console.log(indexText)
    var that = this
    var arr = that.data.array
    var objText = {}
    objText.type = 'p'
    objText.value = text
    if (indexText==='01'){
      arr.splice(0, 1, objText) 
    }else{
      arr = that.data.array
      arr.splice(indexText, 0, objText)
    } 
    console.log(text)
    that.setData({
      array: arr
    })
    console.log(arr)
  },
  chooseImage: function (e) {
    var index = e.currentTarget.dataset.index + 1
    console.log(index)
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        var licenseSrc = res.tempFilePaths
        var time = tick(0, user_id)
        var descriptionSrc = 'https://jinlaisandbox-images.b0.upaiyun.com/item/description/' + time
        var obj = {}
        obj.type='img'
        obj.value = descriptionSrc
        var arr = self.data.array
        console.log(self.data.array.length)
        if (index === '01') {
          arr.splice(0, 1, obj) 
        } else if (index == self.data.array.length){
          arr = self.data.array
          arr.push(obj)
          console.log(arr)
        } else {
          arr = self.data.array
          arr.splice(index, 0, obj)
        } 
       
        console.log(time)
        upyun.upload({
          localPath: licenseSrc[0],
          remotePath: '/item/description/' + time,
          success: function (res) {
            console.log('uploadImage success, res is:', res)
            if (res.statusCode == 200) {
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
              })
              self.setData({
                array: arr
              })
            }
          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage licenseImageSrc fail, err is', errMsg)
      }
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  //获取元素自适应后的实际宽度  
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应  
      // console.log(scale);  
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error  
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var that =this
    this.hideModal();
  },
  closeImg:function(e){
    var that = this;
    var index = e.currentTarget.dataset.current;
    var list = that.data.array;
    list.splice(index, 1)
    that.setData({
      array: list
    });
    
  },
  moveTop: function (e) {
    var that = this;
    var beforeArr = that.data.array
    console.log(beforeArr)
    var index = e.currentTarget.dataset.current;
    if (index != 0) {
      console.log(index)
      var temp = beforeArr[index - 1]
      beforeArr[index - 1] = beforeArr[index]
      beforeArr[index] = temp
      console.log(beforeArr)
      that.setData({
        array: beforeArr
      });
    }
  },
  moveBot: function (e) {
    var that = this;
    var beforeArr = that.data.array
    console.log(beforeArr)
    var index = e.currentTarget.dataset.current;
    if (index != beforeArr.length - 1) {
      console.log(index)
      var temp = beforeArr[index + 1]
      beforeArr[index + 1] = beforeArr[index]
      beforeArr[index] = temp
      console.log(beforeArr)
      that.setData({
        array: beforeArr
      });
    }
  },
  submit:function(e){
    var that = this 
    var arr = that.data.array
    console.log(arr)
    var str=''
    for(var i=0;i<arr.length;i++){
      if (arr[i].type == 'p'){
        str += '<p>' + arr[i].value + '<p>'
      } else if (arr[i].type == 'img'){
        str += '<img ' + 'src="'+ arr[i].value +'" '+ '/>'
      }
    }
    var pages = getCurrentPages(); 
    var currPage = pages[pages.length - 1]; 
    //当前页面
    var prevPage = pages[pages.length - 2]; 
    //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({str: str})
    
    wx.navigateBack({
      url: 'createItem',
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