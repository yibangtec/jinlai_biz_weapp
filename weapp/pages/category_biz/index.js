// pages/category_biz/index.js
var app = getApp()
var url_image =''
var name = ''
var user_id = ''
var bizId = ''
var mainImageUrl = []
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
    isEdit:'display:block;',
    isAll: 'display:none;',
    item:'',
    listAll:'display:block',
    listCreat:'display:none',
    selectedAll: false,
    selectedAllStatus:false,
    mainImageSrc: '',
    dis: 'display:block',
    mainImageUrl:'',
    imgText:'开始上传',
    imgStyle:'background-color:#c9caca'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res)
        bizId = res.data.content.biz_id
        
      },
      fail: function (err) {

      }
    })
    var that = this 
        var url = 'item_category_biz/index'
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
            data: { limit: 10,},
            success: function (result) {
              console.log(result.data)
              var list = result.data.content
              for(var i=0;i<list.length;i++){
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
  allCategory:function(e){
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
  edit:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'edit?Id=' + id
    })
  },
  detail:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'detail?Id=' + id
    })
  },
  recovery:function(e){
    wx.navigateTo({
      url: 'recovery'
    })
  },
  quit:function(e){
    var that = this
    that.setData({
      isSelect:'display:none;',
      isEdit: 'display:block;',
      isAll: 'display:none;',
    })
  },
  editBtn:function(e){
    var that = this
    that.setData({
      isSelect: 'display:block;',
      isEdit: 'display:none;',
      isAll: 'display:block;',
    })
  },
  selected:function(e){
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
  selectAllItem:function(e){
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
  getName:function(e){
    name = e.detail.value
    console.log(name)
  },
  //主图
  
  chooseImageMain: function () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        self.setData({
          mainImageSrc: res.tempFilePaths
        })
        console.log(self.data.mainImageSrc)
        var le = self.data.mainImageSrc.length
        if (le >= 1) {
          self.setData({
            dis: 'display:none'
          })
        }
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage licenseImageSrc fail, err is', errMsg)
      }
    })
  },
  upImgMain: function (e) {
    var that = this
    var temp = that.data.mainImageSrc
    console.log('this is  upImg')
    for (var i = 0; i < temp.length; i++) {
      console.log('this is  for' + user_id)
      var time = tick(i, user_id)
      mainImageUrl[i] = 'image_main/' + time
      console.log(time)
      upyun.upload({
        localPath: temp[i],
        remotePath: '/item/image_main/' + time,
        success: function (res) {
          console.log('uploadImage success, res is:', res)
          if (res.statusCode == 200) {
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              imgText: '已上传',
              imgStyle: 'background-color:#ff3649'
            });
            url_image = mainImageUrl[0]
            //obj.url_image_main = mainImageUrl[0]
          }

        },
        fail: function ({ errMsg }) {
          console.log('uploadImage fail, errMsg is', errMsg)
        }
      })
    }
  },
  closeImgMain: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.mainImageSrc;
    list.splice(index, 1)
    that.setData({
      mainImageSrc: list
    });
    console.log(that.data.mainImageSrc.length)
    var le = that.data.mainImageSrc.length
    if (le < 1) {
      that.setData({
        dis: 'display:block',
        imgText: '开始上传',
        imgStyle: 'background-color:#c9caca'
      })
    }
  },
  submitCreat:function(e){
    var that = this
    var url = 'item_category_biz/create'
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
        data: { app_type: 'biz', biz_id: bizId, parent_id: '', name: name, url_image: url_image },
        success: function (result) {
          console.log(result)
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