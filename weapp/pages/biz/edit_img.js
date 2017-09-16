// edit_certain.js
const Upyun = require('../../utils/upyun-wxapp-sdk')
const upyun = new Upyun({
  bucket: 'jinlaisandbox-images',
  operator: 'jinlaisandbox',
})
var app = getApp()
var arr = []
var beforeArr = []
var endArr=[]
var cont=''
var sum
var o={}
var user_id = '', id = '', name = '', value = '', path = '', inputValue = '', productSrc = '', productImageUrl = [], url_image_product = '', time = '';
function tick(s, bizId, userId) {
  var objD = new Date();
  var str;
  var b = bizId
  var u = userId
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
  b = b.toString()
  str = b + '/' + yy + MM + '/' + MM + dd + '/' + hh + mm + ss + u + '.jpg';
  return str;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    value: '',
    productImageSrc:'',
    index:'',
    dis:'display:none',
    disUp:true,
    disSub:true,
    leftAndRight:'display:block',
    currentValue:'',
    nullValue:'display:block'
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    id = options.id
    name = options.name
    path = options.img
    sum = options.sum
    console.log(sum)
    wx.setNavigationBarTitle({ title: options.text })
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
        data: { id: id },
        success: function (result) {
          console.log(result)
          console.log(result.data.content[name])
          if (sum == 1 && (result.data.content[name] !== null || result.data.content[name] === '')){
            console.log('sdkflskdfl')
            that.setData({
              leftAndRight: 'display:none'
            })
            beforeArr = result.data.content[name].split(",")
            if (beforeArr.length>0){
              for (var i = 0; i < beforeArr.length; i++) {
                beforeArr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + beforeArr[i]
              }
              that.setData({
                productImageSrc: beforeArr
              });
              that.setData({
                dis: 'display:none'
              })
            }else{
              cont=1
              that.setData({
                dis: 'display:block'
              })
            }
          } else if (result.data.content[name] === null || result.data.content[name] === '') {
            that.setData({
              dis: 'display:block'
            })
          } else if (sum == 4 && result.data.content[name]!==''){
            beforeArr = result.data.content[name].split(",")
            console.log(beforeArr)
            if (beforeArr.length <= 1){
                that.setData({
                  leftAndRight: 'display:none'
                })
                var arr = new Array
                arr[0] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + result.data.content[name]
                that.setData({
                  productImageSrc: arr
                })
            }else{
              for (var i = 0; i < beforeArr.length; i++) {
                beforeArr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + beforeArr[i]
              }
              that.setData({
                productImageSrc: beforeArr,
              })
            }
              
            if (beforeArr.length > 0 && beforeArr.length < 5) {
              cont = 4 - beforeArr.length
              that.setData({
                dis: 'display:block'
              })
            } else if (beforeArr.length >= 4){
              that.setData({
                dis: 'display:none'
              })
            }
          }
          
        },
        fail: function (result) {
          console.log(result)
        }
      })
    }
    
    console.log('======================'+options.value + options.name + options.id)
    this.setData({
      title: options.text,
      value: options.value
    })

    wx.getStorage({
      key: 'user',
      success: function (res) {
        user_id = res.data.content.user_id
      },
      fail: function (err) {

      }
    })
  },
  getEditVaue: function (e) {
    inputValue = e.detail.value
    if (inputValue == value) {
      wx.showToast({
        title: '修改内容与原内容相同',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  //产品

  chooseImageProduct: function () {
    const self = this
    
    wx.chooseImage({
      count: cont,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths)
        productSrc = res.tempFilePaths
        if (self.data.productImageSrc==''){
          beforeArr = productSrc
        }else{
          beforeArr = self.data.productImageSrc
          console.log(beforeArr)
          beforeArr = beforeArr.concat(productSrc)
          if (beforeArr.length>=2){
            self.setData({
              leftAndRight: 'display:block'
            })
          }else{
            leftAndRight: 'display:none'
          }
          console.log(beforeArr)
        }
        
        console.log('选择图片之后的')
        console.log(beforeArr)
        self.setData({
          productImageSrc: beforeArr,
          disUp: false
        })
        if (beforeArr.length == 4) {
          self.setData({
            dis: 'display:none'
          });
        } 
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  upImgProduct: function (e) {
    var that =this
    console.log('this is  upImg')
    for (var i = 0; i < productSrc.length; i++) {
      time = tick(i, id, user_id)
      productImageUrl[i] = path+'/' + time
      
      o[productSrc[i]] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + productImageUrl[i]
      upyun.upload({
        localPath: productSrc[i],
        remotePath: '/biz/'+ path +'/' + time,
        success: function (res) {
          console.log('uploadImage success, res is:', res)
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 1000
          }) 
          that.setData({
            disSub: false
          });
        },
        fail: function ({ errMsg }) {
          console.log('uploadImage fail, errMsg is', errMsg)
        }
      })
    }
    console.log(o)
  },
  closeImgProduct: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    beforeArr = that.data.productImageSrc;
    beforeArr.splice(index, 1)
    that.setData({
      productImageSrc: beforeArr
    });
    console.log('删除图片之后的')
    console.log(beforeArr)
    if (beforeArr.length >= 0 && beforeArr.length < 4) {
      cont = 4 - beforeArr.length
      that.setData({
        dis: 'display:block'
      });
    }
  },
  moveLeft:function(e){
    console.log(beforeArr)
    var that = this;
    var index = e.currentTarget.dataset.index;
    if (index != 0){
      console.log(index)
      var temp = beforeArr[index - 1]
      beforeArr[index - 1] = beforeArr[index]
      beforeArr[index] = temp
      console.log(beforeArr)
      that.setData({
        productImageSrc: beforeArr
      });
    }
   
  },
  edit_img: function (e) {

    for (var i = 0; i < beforeArr.length; i++){
      if (o.hasOwnProperty(beforeArr[i])==true){
        beforeArr[i] = o[beforeArr[i]]
      }
    }
    console.log(beforeArr)
    for (var i = 0; i < beforeArr.length; i++) {
      beforeArr[i] = beforeArr[i].replace('https://jinlaisandbox-images.b0.upaiyun.com/biz/', "")
    }
    url_image_product = beforeArr.join(',')
    console.log(url_image_product)
    // 通过API获取或处理数据
    var url = 'biz/edit_certain'
    var params = {}
    var api_result = api_request(url, params)
    var bizId = id
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
        data: { app_type: 'biz', id: id, user_id: user_id, name: name, value: url_image_product },
        success: function (result) {
          if(result.data.status==200){
            wx.showToast({
              title: '编辑成功',
              icon: 'success',
              duration: 1000
            })
            wx.navigateBack({
              url: '../../pages/biz/detail?id=' + bizId,
            })
          }
        },
        fail: function (result) {
          console.log(result)
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