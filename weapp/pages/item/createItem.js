// createItem.js
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
var objectArray=[]
var objectBizArray=[]
var obj={}
var user_id=''
var biz_id=''
var mainImageUrl=[]
var figureImageUrl=[]
var srcUrl=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectArray:'',
    array:['1','2'],
    index:'',
    sum:'',
    num:'',
    objectBizArray:'',
    items: [
      { name: 'USA', value: '是' },
      { name: 'CHN', value: '否', checked: 'true' },
    ],
    mainImageSrc:'',
    figureImageSrc:'',
    dis:'display:block',
    disfig:'display:block',
    src:'',
    disSrc:'display:block'
    
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data.content.mobile)
        user_id = res.data.content.user_id
        biz_id = res.data.content.biz_id
      },
      fail: function (err) {

      }
    })


    var url = 'item_category/index'
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
        data: { app_type: 'item',},
        success: function (result) {
          console.log(result.data.content)
          var categoryId = result.data.content
          for (var i = 0; i < categoryId.length; i++){
            objectArray[i]=categoryId[i]
          }
          that.setData({
            objectArray: objectArray
          })
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
    var u = 'item_category_biz/index'
    var api_result = api(u, params)
    function api(url, api_params) {
      // 生成签名
      app.sign_generate(api_params)

      // 通过小程序的网络请求API发送请求
      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'item', },
        success: function (result) {
          console.log(result.data.content)
          var categoryId = result.data.content
          for (var i = 0; i < categoryId.length; i++) {
            objectBizArray[i] = categoryId[i]
          }
          that.setData({
            objectBizArray: objectBizArray
          })
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
  },
  bindPickerChange: function (e) {
    console.log('所属系统分类', e.detail.value)
    obj.category_id = e.detail.value
    console.log(obj.category_id)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerArray:function(e){
    console.log('所属品牌', e.detail.value)
    obj.brand_id = e.detail.value
    this.setData({
      sum: e.detail.value
    })
  },
  bindPickerBiz:function(e){
    console.log('所属商家', e.detail.value)
    obj.category_biz_id = e.detail.value
    this.setData({
      num: e.detail.value
    })
  },
  getCode_biz:function(e){
    var re=/^[A-Za-z0-9]+$/
    if (re.test(e.detail.value)) {
      obj.code_biz = e.detail.value
    }else{
      wx.showToast({
        title: '商品编码只能英文大小写字母、数字',
        icon: 'loading',
        duration: 2000
      })
    }
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
        console.log(self.data.mainImageSrc.length)
        var le = self.data.mainImageSrc.length
        if (le >= 1){
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
        dis: 'display:block'
      })
    }
  },
  preview: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.mainImageSrc;
    var curr = list[index]
    wx.previewImage({
      current: curr, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },
  //形象图
  chooseImageFigure: function () {
    const self = this
    wx.chooseImage({
      count: 4,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        self.setData({
          figureImageSrc: res.tempFilePaths
        })
        console.log(self.data.figureImageSrc.length)
        var le = self.data.figureImageSrc.length
        if (le >= 4) {
          self.setData({
            disfig: 'display:none'
          })
        }
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage licenseImageSrc fail, err is', errMsg)
      }
    })
  },
  upImgFigure: function (e) {
    var that = this
    var temp = that.data.figureImageSrc
    console.log('this is  upImg')
    for (var i = 0; i < temp.length; i++) {
    console.log('this is  for' + user_id)
    var time = tick(i, user_id)
    figureImageUrl[i] = 'image_figure/' + time
    console.log(time)
    upyun.upload({
      localPath: temp[i],
      remotePath: '/item/image_figure/' + time,
      success: function (res) {
        console.log('uploadImage success, res is:', res)
        if (res.statusCode == 200) {
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
    }
  },
  closeImgFigure: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.figureImageSrc;
    list.splice(index, 1)
    that.setData({
      figureImageSrc: list
    });
    console.log(that.data.figureImageSrc.length)
    var le = that.data.figureImageSrc.length
    if (le < 1) {
      that.setData({
        disfig: 'display:block'
      })
    }
  },
  moveLeft: function (e) {
    
    var that = this;
    var beforeArr = that.data.figureImageSrc
    console.log(beforeArr)
    var index = e.currentTarget.dataset.index;
    if (index != 0) {
      console.log(index)
      var temp = beforeArr[index - 1]
      beforeArr[index - 1] = beforeArr[index]
      beforeArr[index] = temp
      console.log(beforeArr)
      that.setData({
        figureImageSrc: beforeArr
      });
    }

  },
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  chooseVideo:function(e){
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        console.log(res.tempFilePath)
        that.setData({
          src: res.tempFilePath
        })
        console.log(that.data.src)
        
      }
    })
  },
  upVideo: function (e) {
    var that = this
    var temp = that.data.src
    console.log('this is  upVideo')
    for (var i = 0; i < temp.length; i++) {
      console.log('this is  for' + user_id)
      var time = tick(i, user_id)
      srcUrl[i] = 'video_figure/' + time
      console.log(time)
      upyun.upload({
        localPath: temp[i],
        remotePath: '/item/video_figure/' + time,
        success: function (res) {
          console.log('uploadImage success, res is:', res)
          if (res.statusCode == 200) {
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
    }
  },
  closeVideo: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.src;
    list.splice(index, 1)
    that.setData({
      src: list
    });
    console.log(that.data.src.length)
    var le = that.data.src.length
    if (le < 1) {
      that.setData({
        disfig: 'display:block'
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