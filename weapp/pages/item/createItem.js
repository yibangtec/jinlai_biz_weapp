// createItem.js
var pickerFile = require('../../utils/picker_datetime.js');
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
  str = yy + MM + '/' + MM + dd + '/' + hh + mm + ss + u + '.jpg';
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
  str = yy + '/' + MM + dd + '/' + hh + mm + ss + u + '.mp4';
  return str;
}
var app = getApp();
var timestamp = ''
var timestamp2 = ''
var objectArray=[]
var objectBizArray=[]
var obj={}
var user_id=''
var biz_id=''
var mainImageUrl=[]
var figureImageUrl=[]
var srcUrl=[]
var newChoose = []
var o = {}
var currArr = ''
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
      { name: 0, value: '是' },
      { name: 1, value: '否', checked: 'true' },
    ],
    mainImageSrc:'',
    figureImageSrc:'',
    dis:'display:block',
    disfig:'display:block',
    src:'',
    disSrc:'display:block',
    currentDate:'',
    disable:'true',
    videoStyle:'display:none',
    str:'',
    currentYes: '',
    currentNo: 'coupon-current',
    start:'',
    end:''
  },
  bindPickerChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    obj.coupon_allowed = e.detail.value
  },
  // 点击时间组件确定事件 
  yes: function (e) {
    var yes = e.currentTarget.dataset.coupon
    this.setData({
      currentYes: 'coupon-current',
      currentNo: ''
    })
    obj.coupon_allowed = yes
  },
  no: function (e) {
    var yes = e.currentTarget.dataset.coupon
    this.setData({
      currentYes: '',
      currentNo: 'coupon-current'
    })
    obj.coupon_allowed = yes
  },

  startTap: function () {
    var that = this
    this.datetimePicker.setPicker('startDate');
  },
  endTap: function () {
    this.datetimePicker.setPicker('endDate');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.biz)
    biz_id = options.biz
    obj.biz_id = biz_id
    this.datetimePicker = new pickerFile.pickerDatetime({
      page: this,
      animation: 'slide',
      duration: 500
    });
    var that =this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res)
        user_id = res.data.content.user_id
        obj.user_id = user_id
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
          console.log(result)
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
    var category_id = objectArray[e.detail.value].category_id
    obj.category_id = category_id
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
    var category_biz_id = objectArray[e.detail.value].category_biz_id
    //obj.category_biz_id = e.detail.value
    obj.category_biz_id = category_biz_id
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
  getItem_name:function(e){
    if (typeof (e.detail.value) == 'number'){
      wx.showToast({
        title: '商品名称不能纯数字',
        icon: 'loading',
        duration: 2000
      })
    }
    obj.name = e.detail.value
  },
  getDescription: function (e) {
    obj.description = e.detail.value
  },
  getSlogan: function (e) {
    if (typeof (e.detail.value) == 'number') {
      wx.showToast({
        title: '商品宣传语不能纯数字',
        icon: 'loading',
        duration: 2000
      })
    }
    obj.name = e.detail.value
  },
  getTag_price: function (e) {
    if (e.detail.value>99999.99){
      wx.showToast({
        title: '商品原价不能大于99999.99',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value < 0){
      wx.showToast({
        title: '商品原价不能小于0',
        icon: 'loading',
        duration: 2000
      })
    }
    obj.tag_price = e.detail.value
  },
  getPrice: function (e) {
    if (e.detail.value > 99999.99) {
      wx.showToast({
        title: '商品现价不能大于99999.99',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value < 0) {
      wx.showToast({
        title: '商品现价不能小于0',
        icon: 'loading',
        duration: 2000
      })
    }
    obj.price = e.detail.value
  },
  getUnit_name: function (e) {
    if (e.detail.value == '斤' || e.detail.value == '双' || e.detail.value == '头' || e.detail.value == '件') {
      obj.unit_name = '份'
    } else {
      obj.unit_name = e.detail.value
    }
  },
  getWeight_net: function (e) {
    if (e.detail.value > 999.99) {
      wx.showToast({
        title: '商品净重不能大于999.99KG',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value < 0) {
      wx.showToast({
        title: '商品净重不能小于0KG',
        icon: 'loading',
        duration: 2000
      })
    }else{
      obj.weight_net = e.detail.value
    }
    
  },
  getWeight_gross: function (e) {
    if (e.detail.value > 999.99) {
      wx.showToast({
        title: '商品毛重不能大于999.99KG',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value < 0) {
      wx.showToast({
        title: '商品毛重不能小于0KG',
        icon: 'loading',
        duration: 2000
      })
    } else {
      obj.weight_gross = e.detail.value
    }

  },
  getWeight_volume: function (e) {
    if (e.detail.value > 999.99) {
      wx.showToast({
        title: '商品体积重不能大于999.99KG',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value < 0) {
      wx.showToast({
        title: '商品体积重不能小于0KG',
        icon: 'loading',
        duration: 2000
      })
    } else {
      obj.weight_volume = e.detail.value
    }

  },
  getStocks: function (e) {
    var that =this
    if (e.detail.value > 65553) {
      wx.showToast({
        title: '商品库存不能大于65535',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value < 0) {
      wx.showToast({
        title: '商品库存不能小于0',
        icon: 'loading',
        duration: 2000
      })
    } else {
      obj.stocks = e.detail.value
      that.setData({
        disable: false
      })
    }
  },
  getQuantity_max: function (e) {
    if (e.detail.value > 99) {
      wx.showToast({
        title: '商品最高限量不能大于99',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value < 0) {
      wx.showToast({
        title: '商品最高限量不能小于0',
        icon: 'loading',
        duration: 2000
      })
    } else {
      obj.quantity_max = e.detail.value
    }
  },
  getQuantity_min: function (e) {
    if (e.detail.value > 99) {
      wx.showToast({
        title: '商品最低限量不能大于99',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value < 0) {
      wx.showToast({
        title: '商品最低限量不能小于0',
        icon: 'loading',
        duration: 2000
      })
    } else {
      obj.quantity_min = e.detail.value
    }
  },
  getDiscount_credit: function (e) {
    if (e.detail.value > 0.5) {
      wx.showToast({
        title: '积分抵扣率不能大于0.5',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value < 0) {
      wx.showToast({
        title: '积分抵扣率不能小于0',
        icon: 'loading',
        duration: 2000
      })
    } else {
      obj.discount_credit = e.detail.value
    }
  },
  getCommission_rate: function (e) {
    if (e.detail.value > 0.5) {
      wx.showToast({
        title: '积分抵扣率不能大于0.5',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value < 0) {
      wx.showToast({
        title: '积分抵扣率不能小于0',
        icon: 'loading',
        duration: 2000
      })
    } else {
      obj.commission_rate = e.detail.value
    }
  },
  itemDescription:function(e){
    wx.navigateTo({
      url: 'descriptionItem',
    })
  },
  getPromotion_id:function(e){
    obj.promotion_id = e.detail.value
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

            obj.url_image_main = mainImageUrl[0]
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
        var before = self.data.figureImageSrc
        console.log('选择之前的before')
        console.log(before)
        newChoose = res.tempFilePaths
        console.log('选择的')
        console.log(newChoose)
        if (before) {
          console.log('zhen')
          before = before.concat(newChoose)
        } else {
          before = newChoose
        }
        console.log('显示的')
        console.log(before)
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
    if (le < 4) {
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
          videoStyle: 'display:block',
          src: res.tempFilePath
        })
        console.log(that.data.src)
        
      }
    })
  },
  upVideo: function (e) {
    var that = this
    var temp = that.data.src
      console.log('this is  for' + user_id)
      var time = tr(0, user_id)
      srcUrl[0] = 'video_figure/' + time
      console.log(time)
      yu.upload({
        localPath: temp,
        remotePath: '/item/video_figure/' + time,
        success: function (res) {
          console.log('uploadImage success, res is:', res)
          if (res.statusCode == 200) {
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
            obj.figure_video_urls = srcUrl[0]
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
    var that = this
    obj.time_to_publish=this.data.start
    obj.time_to_suspend = this.data.end
    console.log(obj)
    if (obj.time_to_publish == null) {
      console.log('jskadfksdkfh')
      delete obj.time_to_publish

    }
    if (obj.time_to_suspend == null) {
      delete obj.time_to_suspend
    }

    
      
    
    var pt = that.data.figureImageSrc
    if (pt.length > 0) {
      for (var i = 0; i < pt.length; i++) {
        if (o.hasOwnProperty(pt[i]) == true) {
          pt[i] = o[pt[i]]
        }
      }
      console.log(pt)
      for (var i = 0; i < pt.length; i++) {
        pt[i] = pt[i].replace('https://jinlaisandbox-images.b0.upaiyun.com/item/', "")
      }
      console.log(pt)
      var product = pt.join(',')
      obj.figure_image_urls = product
    }
    for (var key in obj) {
      //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
      if (obj[key] == null) {
        obj[key] = ''
      }
    }

    obj.app_type='biz'
    console.log(this.data.str)
    obj.description = this.data.str
    var url = 'item/create'
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
        data: obj,
        success: function (result) {
          console.log(result)
          if (result.data.status==200){
            wx.showToast({
              title: '创建成功',
              icon: 'success',
              duration: 2000
            })
            wx.redirectTo({
              url: 'result?title="商家创建成功"'
            })
          }else{
            wx.showToast({
              title: result.data.content.error.message,
              icon: 'success',
              duration: 2000
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    
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