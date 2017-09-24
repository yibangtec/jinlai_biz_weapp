// edit.js
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
  str = yy + MM + '/' + MM + dd + '/' + hh + mm + ss + ''+ u + '.jpg';
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
var app = getApp();
var timestamp = ''
var timestamp2 = ''
var itemId = ''
var obj={}
var user_id=''
var biz_id=''
var mainImageUrl = []
var figureImageUrl = []
var srcUrl = []
var o={}
var newChoose=''
var newSrc=[]
var b={}
var time_to_publish =''
var time_to_suspend=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemObj:'',
    objectBizArray:'',
    sum:'',
    mainImageSrc: '',
    figureImageSrc: '',
    src: '',
    dis:'display:block',
    disfig: 'display:block',
    disSrc: 'display:block',
    dates: '',
    times: '',
    dateDowns: '',
    timeDowns: '',
    items: [
      { name: 0, value: '是' },
      { name: 1, value: '否', checked: 'true' },
    ],
    currentYes:'',
    currentNo:'coupon-current',
    time_to_publish:'',
    time_to_suspend:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.datetimePicker = new pickerFile.pickerDatetime({
      page: this,
      animation: 'slide',
      duration: 500
    });
    var that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        user_id = res.data.content.user_id
      },
      fail: function (err) {

      }
    })

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
          var objectBizArray=[]
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





    itemId = options.id
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
          if (result.data.status == 200) {
            obj = result.data.content
            
            delete obj.freight_template_id
            biz_id = result.data.content.biz_id
            obj.user_id = user_id
            obj.id=itemId
            time_to_publish = formatDateTime(obj.time_to_publish)
            time_to_suspend = formatDateTime(obj.time_to_suspend)
            that.setData({
              time_to_publish: time_to_publish,
              time_to_suspend: time_to_suspend,
            })
            console.log(user_id)
            if (obj.coupon_allowed == 0){
              that.setData({
                currentYes: '',
                currentNo: 'coupon-current'
              })
            } else if (obj.coupon_allowed == 1){
              that.setData({
                currentYes: '',
                currentNo: 'coupon-current'
              })
            }
            
            var arr = []
            arr = result.data.content.url_image_main.split(",")
            if (arr.length > 0) {
              for (var i = 0; i < arr.length; i++) {
                arr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/item/' + arr[i]
              }
            }
            if (arr.length>=1){
              that.setData({
                dis: 'display:none'
              })
            }
            
            var arrFigure=[] 
            arrFigure = result.data.content.figure_image_urls.split(",")
            console.log('figure')
            console.log(arrFigure)
            if (result.data.content.figure_image_urls =='' ) {
              arrFigure=[]
            }else{
              for (var i = 0; i < arrFigure.length; i++) {
                arrFigure[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/item/' + arrFigure[i]
              }
            }
            if (arr.arrFigure >= 4) {
              that.setData({
                disfig: 'display:none'
              })
              
            }


            var arrVideo = result.data.content.figure_video_urls.split(",")
            if (result.data.content.figure_video_urls == '') {
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
              itemObj: result.data.content,
              sum: result.data.content.category_biz_id,
              mainImageSrc: arr,
              figureImageSrc: arrFigure,
              src: arrVideo
            })
          }
          console.log(result)
          /*
          if (result.data.content.time_to_publish){
            var strArr=[]
            strArr = result.data.content.time_create.split(" ")
            that.setData({
              dates: strArr[0],
              times: strArr[1],
            })
          }
          if (result.data.content.time_to_suspend) {
            var endArr = []
            endArr = result.data.content.time_create.split(" ")
            that.setData({
              dateDowns: endArr[0],
              timeDowns: endArr[1],
            })
          }
          */
          
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    obj.coupon_allowed = e.detail.value
  },
  startTap: function () {
    var that = this
    timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    this.datetimePicker.setPicker('startDate');
  },
  endTap: function () {
    this.datetimePicker.setPicker('endDate');
    var stringTime = this.data.startDate;
    timestamp2 = Date.parse(new Date(stringTime));
    timestamp2 = timestamp2 / 1000;
    if (timestamp2< timestamp) {
      wx.showToast({
        title: '上架时间不能小于当前时间',
        icon: 'loading',
        duration: 2000
      })
    }
    console.log(this.data.startDate)
    obj.time_to_publish = timestamp2
  },
  yes:function(e){
    var yes = e.currentTarget.dataset.coupon
    this.setData({
      currentYes: 'coupon-current',
      currentNo: ''
    })
    obj.coupon_allowed = yes
  },
  no:function(e){
    var yes = e.currentTarget.dataset.coupon
    this.setData({
      currentYes: '',
      currentNo: 'coupon-current'
    })
    obj.coupon_allowed = yes
  },
  bindPickerBiz: function (e) {
    console.log('所属商家', e.detail.value)
    //obj.category_biz_id = e.detail.value
    obj.category_biz_id = 1
    this.setData({
      index: e.detail.value
    })
  },
  getCode_biz: function (e) {
    var re = /^[A-Za-z0-9]+$/
    if (re.test(e.detail.value)) {
      obj.code_biz = e.detail.value
    } else {
      wx.showToast({
        title: '商品编码只能英文大小写字母、数字',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  getItem_name: function (e) {
    if (typeof (e.detail.value) == 'number') {
      wx.showToast({
        title: '商品名称不能纯数字',
        icon: 'loading',
        duration: 2000
      })
    }
    obj.name = e.detail.value
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
  getDescription:function(e){
    obj.description = e.detail.value
  },
  getTag_price: function (e) {
    if (e.detail.value > 99999.99) {
      wx.showToast({
        title: '商品原价不能大于99999.99',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value < 0) {
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
    } else {
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
    var that = this
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
  getPromotion_id: function (e) {
    obj.promotion_id = e.detail.value
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
        title: '商品上架时间不能小于当前时间',
        icon: 'loading',
        duration: 2000
      })
    }
    obj.time_to_publish = timestamp2
  },
  // 点击日期组件确定事件 
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  bindTimeChangeDown: function (e) {
    if (this.data.dateDowns == '') {
      wx.showToast({
        title: '请先选择上架日期',
        icon: 'loading',
        duration: 2000
      })
    }
    console.log(e.detail.value)
    this.setData({
      timeDowns: e.detail.value + ':00'
    })
    // 获取当前时间戳(以s为单位)
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //当前时间戳为：1403149534
    console.log("当前时间戳为：" + timestamp);
    var stringTime = this.data.dateDowns + ' ' + e.detail.value + ':00';
    var timestamp2 = Date.parse(new Date(stringTime));
    timestamp2 = timestamp2 / 1000;
    //2014-07-10 10:21:12的时间戳为：1404958872 
    console.log(stringTime + "的时间戳为：" + timestamp2);
    if (timestamp2 < timestamp) {
      wx.showToast({
        title: '商品下架时间不能小于当前时间',
        icon: 'loading',
        duration: 2000
      })
    }
    obj.time_to_suspend = timestamp2
  },
  // 点击日期组件确定事件 
  bindDateChangeDown: function (e) {
    console.log(e.detail.value)
    this.setData({
      dateDowns: e.detail.value
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
            obj.figure_image_urls = currArr.join(',')
            console.log(obj.figure_image_urls)
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
            obj.figure_video_urls = currArr.join(',')
            console.log(obj.figure_video_urls)
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
    if (obj.time_to_publish == null) {
      console.log('jskadfksdkfh')
      delete obj.time_to_publish
      
    }
    if (obj.time_to_suspend == null) {
      delete obj.time_to_suspend
    }

    if (this.data.endDate){
      var stringTime = this.data.endDate;
      var timestamp4 = Date.parse(new Date(stringTime));
      timestamp4 = timestamp4 / 1000;
      if (timestamp4 < timestamp2) {
        wx.showToast({
          title: '下架时间不能小于上架时间',
          icon: 'loading',
          duration: 2000
        })
      }
      console.log(timestamp4 + '+' + timestamp2)
      obj.time_to_suspend = timestamp4
    }
    
    for (var key in obj) {
      //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
      if (obj[key] == null) {
        delete obj[key]
      }
    }
    console.log(obj)
    obj.app_type = 'biz'
    var url = 'item/edit'
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
          if (result.data.status == 200) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
            wx.redirectTo({
              url: 'result?title="商品修改成功"'
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