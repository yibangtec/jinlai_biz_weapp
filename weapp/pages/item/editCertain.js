// pages/item/editCertain.js
const Upyun = require('../../utils/upyun-wxapp-sdk')
const yun = require('../../utils/video')
const upyun = new Upyun({
  bucket: 'jinlaisandbox-images',
  operator: 'jinlaisandbox',
})
const yu = new yun({
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
  str = yy + MM + '/' + MM + dd + '/' + hh + mm + ss + '' + u + '.jpg';
  return str;
}
function tr(s, bizId) {
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
  str = yy + MM + '/' + MM + dd + '/' + hh + mm + ss + u + '.mp4';
  return str;
}
var app = getApp();
var obj = {}
var itemId = ''
var objItem = ''
var user_id = ''
var biz_id = ''
var value = ''
var itemName = ''
var mainImageUrl = []
var figureImageUrl = []
var srcUrl = []
var o = {}
var newChoose = ''
var newSrc = []
var b = {}
var itemValue=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainImageSrc:'',
    src:'',
    figureImageSrc:'',
    dis:'display:block',
    imgStyle:'display:block',
    disSrc: 'display:block',
    videoImgStyle: 'display:block',
    styleFigure:'display:block',
    timeStyle:'display:none',
    currentDate:'',
    dates: '',
    times: '',
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

    
    itemId = options.id
    value = options.iValue
    itemName = options.iName

    
    if (value == "time_to_publish" || value =="time_to_suspend"){
      that.setData({
        imgStyle: 'display:none',
        videoImgStyle: 'display:none',
        styleFigure: 'display:none',
        timeStyle: 'display:block'
      })
    } else if (value =='figure_video_urls'){
      that.setData({
        imgStyle: 'display:none',
        styleFigure: 'display:none',
        videoImgStyle: 'display:block',
        timeStyle: 'display:none'
      })
    } else if (value == "url_image_main"){
      that.setData({
        imgStyle: 'display:block',
        styleFigure: 'display:none',
        videoImgStyle: 'display:none',
        timeStyle: 'display:none'
      })
    } else if (value == "figure_image_urls"){
      that.setData({
        imgStyle: 'display:none',
        styleFigure: 'display:block',
        videoImgStyle: 'display:none',
        timeStyle: 'display:none'
      })
    }

    that.setData({
      title: options.iName,
    })
    wx.setNavigationBarTitle({ title: options.iName })

    var url = 'item/detail'
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
        data: { app_type: 'item', id: itemId },
        success: function (result) {
          console.log(result)
          if (result.data.status == 200) {
            objItem = result.data.content

            var arr = objItem[value]
            arr = arr.split(",")
            if (arr.length > 0) {
              for (var i = 0; i < arr.length; i++) {
                arr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/item/' + arr[i]
              }
            }
            if (arr.length >= 1) {
              that.setData({
                dis: 'display:none'
              })
            }
            var arrFigure = []
            arrFigure = objItem[value].split(",")
            console.log('figure')
            console.log(arrFigure)
            if (objItem[value] == '') {
              arrFigure = []
            } else {
              for (var i = 0; i < arrFigure.length; i++) {
                arrFigure[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/item/' + arrFigure[i]
              }
            }
            if (arr.arrFigure >= 4) {
              that.setData({
                disfig: 'display:none'
              })

            }
            var arrVideo = objItem[value].split(",")
            if (objItem[value] == '') {
              arrVideo = []
            } else {
              for (var i = 0; i < arrVideo.length; i++) {
                arrVideo[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/item/' + arrVideo[i]
              }
            }
            if (arr.arrVideo >= 4) {
              that.setData({
                disSrc: 'display:none'
              })

            }
            that.setData({
              mainImageSrc: arr,
              figureImageSrc: arrFigure,
              src: arrVideo
            })
          }
          
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
  },
  current: function (e) {

    var objD = new Date();
    var yy = objD.getYear();
    if (yy < 1900) yy = yy + 1900;
    var MM = objD.getMonth() + 1;
    if (MM < 10) MM = '0' + MM;
    var dd = objD.getDate();
    if (dd < 10) dd = '0' + dd;
    var strd = yy + '-' + MM + '-' + dd
    this.setData({
      currentDate: strd
    })
  },
  bindTimeChange: function (e) {
    if (this.data.dates == '') {
      wx.showToast({
        title: '请先选择上架日期',
        icon: 'loading',
        duration: 2000
      })
    }
    console.log(e.detail.value)
    this.setData({
      times: e.detail.value + ':00'
    })
    // 获取当前时间戳(以s为单位)
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //当前时间戳为：1403149534
    console.log("当前时间戳为：" + timestamp);
    var stringTime = this.data.dates + ' ' + e.detail.value + ':00';
    var timestamp2 = Date.parse(new Date(stringTime));
    timestamp2 = timestamp2 / 1000;
    //2014-07-10 10:21:12的时间戳为：1404958872 
    console.log(stringTime + "的时间戳为：" + timestamp2);
    if (timestamp2 < timestamp) {
      wx.showToast({
        title: '时间不能小于当前时间',
        icon: 'loading',
        duration: 2000
      })
    }
    itemValue = timestamp2
  },
  // 点击日期组件确定事件 
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
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

            itemValue = mainImageUrl[0]
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
        newChoose = res.tempFilePaths
        var before = self.data.figureImageSrc.concat(newChoose)
        self.setData({
          figureImageSrc: before
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
    console.log('this is  upImg')
    for (var i = 0; i < newChoose.length; i++) {
      console.log('this is  for' + user_id)
      var time = tick(i, user_id)
      figureImageUrl[i] = 'image_figure/' + time
      console.log(time)
      o[newChoose[i]] = 'https://jinlaisandbox-images.b0.upaiyun.com/item/' + figureImageUrl[i]
      upyun.upload({
        localPath: newChoose[i],
        remotePath: '/item/image_figure/' + time,
        success: function (res) {
          console.log('uploadImage success, res is:', res)
          if (res.statusCode == 200) {
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
            var currArr = that.data.figureImageSrc
            for (var i = 0; i < currArr.length; i++) {
              if (o.hasOwnProperty(currArr[i]) == true) {
                currArr[i] = o[currArr[i]]
              }
            }
            console.log(currArr)
            for (var i = 0; i < currArr.length; i++) {
              currArr[i] = currArr[i].replace('https://jinlaisandbox-images.b0.upaiyun.com/item/', "")
            }
            itemValue = currArr.join(',')
            console.log(itemValue)
          }

        },
        fail: function ({ errMsg }) {
          console.log('uploadImage fail, errMsg is', errMsg)
        }
      })
    }
    obj.figure_image_urls = figureImageUrl.join(',')
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
  chooseVideo: function (e) {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        newSrc = res.tempFilePath
        var n = that.data.src
        var beforeVideo = n.concat(newSrc)
        console.log(beforeVideo)
        that.setData({
          src: beforeVideo
        })
        if (that.data.src >= 4) {
          that.setData({
            disSrc: 'display:none'
          })
        }
        console.log(that.data.src)

      }
    })
  },
  upVideo: function (e) {
    var that = this
    var time = tr(0, user_id)
    srcUrl[0] = 'video_figure/' + time
    b[newSrc] = 'https://jinlaisandbox-images.b0.upaiyun.com/item/' + srcUrl[0]
    console.log(time)
    yu.upload({
      localPath: newSrc,
      remotePath: '/item/video_figure/' + time,
      success: function (res) {
        console.log('uploadImage success, res is:', res)
        if (res.statusCode == 200) {
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          })
          var currArr = that.data.src
          for (var i = 0; i < currArr.length; i++) {
            if (b.hasOwnProperty(currArr[i]) == true) {
              currArr[i] = b[currArr[i]]
            }
          }
          console.log(currArr)
          for (var i = 0; i < currArr.length; i++) {
            currArr[i] = currArr[i].replace('https://jinlaisandbox-images.b0.upaiyun.com/item/', "")
          }
          itemValue = currArr.join(',')
          console.log(itemValue)
        }

      },
      fail: function ({ errMsg }) {
        console.log('uploadImage fail, errMsg is', errMsg)
      }
    })


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
  submit:function(e){
    var url = 'item/edit_certain'
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
        data: { app_type: 'biz', id: itemId, user_id: user_id, name: value, value: itemValue },
        success: function (result) {
          if (result.data.status == 200) {
            wx.showToast({
              title: result.data.content.message,
              icon: 'loading',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: result.data.content.error.message,
              icon: 'loading',
              duration: 2000
            })
          }
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