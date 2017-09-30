// pages/biz/detail.js
var app = getApp()
var text = '', bizId = '', biz = '';
var markersData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    biz : {},
    id : "",
    pArr:[],
    pArr1: [],
    pArr2: [],
    tel:'',
    markers: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    console.log(options)

    var that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res)
        that.setData({
          tel: res.data.content.mobile,
        })
      },
      fail: function (err) {

      }
    })
    that.setData({
      id: options.id,
    })


    // 通过API获取或处理数据
    var url = 'biz/detail'
    bizId = options.id
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
        data: { id: bizId },
        success: function (result) {
          console.log(result.data)
          that.setData({
            markers: [{
              iconPath: "../../image/map.png",
              id: 0,
              latitude: result.data.content.latitude,
              longitude: result.data.content.longitude,
              width: 30,
              height: 30
            }],
          })
          biz = result.data.content
          var p = result.data.content.url_image_product
          if (p){
            var arr = p.split(",")
            for (var i = 0; i < arr.length; i++) {
              arr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + arr[i]
            }
          } else {
            arr = []
          }
          console.log(arr)
          var p1 = result.data.content.url_image_produce
          if(p1){
            var arr1 = p1.split(",")
            for (var i = 0; i < arr1.length; i++) {
              arr1[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + arr1[i]
            }
          } else {
            arr1 = []
          }

          if (p2) {
            var p2 = result.data.content.url_image_retail
            var arr2 = p2.split(",")
            for (var i = 0; i < arr2.length; i++) {
              arr2[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + arr2[i]
            }
          }else{
            arr2=[]
          }
          
          that.setData({ biz: result.data.content, pArr: arr, pArr1: arr1, pArr2: arr2 });

        },
        fail: function (result) {
          console.log(result)
        }
      })
    }


    
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "选中 marker 图标的相对路径"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "未选中 marker 图标的相对路径"; //如：..­/..­/img/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  },

  previewOneImg:function(e){
    var OneImg = e.currentTarget.dataset.name
    var str = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + biz[OneImg]
    wx.previewImage({
      current: str, // 当前显示图片的http链接
      urls: [str]
    })
  },
  preview: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.pArr;
    console.log(e)
    var curr = list[index]
    wx.previewImage({
      current: curr, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },
  edit_name:function(e){
    var n = e.currentTarget.dataset.name
    var v = e.currentTarget.dataset.value
    var t = e.currentTarget.dataset.text
    console.log(bizId + n + biz[n]+t)
    wx.navigateTo({
      url: 'edit_certain?id=' + bizId + '&name=' + n + '&value=' + biz[n]+'&text='+t
    })
  },
  edit_img:function(e){
    var n = e.currentTarget.dataset.name
    var v = e.currentTarget.dataset.name
    var t = e.currentTarget.dataset.text
    var img = e.currentTarget.dataset.img
    var s = e.currentTarget.dataset.sum
    console.log(bizId + n + biz[v] + t)
    console.log(img)
    wx.navigateTo({
      url: 'edit_img?id=' + bizId + '&name=' + n + '&value=' + biz[v] + '&text=' + t+'&img='+img+'&sum='+s
    })
  },
  button_edit:function(e){
    wx.navigateTo({
      url: 'edit?id=' + bizId,
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
  onShow: function (options) {
    console.log('onLoad')
    

    var that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          tel: res.data.content.mobile,
        })
      },
      fail: function (err) {

      }
    })
    


    // 通过API获取或处理数据
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
        data: { id: bizId },
        success: function (result) {
          console.log(result.data)
          biz = result.data.content
          var p = result.data.content.url_image_product
          var arr = p.split(",")
          for (var i = 0; i < arr.length; i++) {
            arr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + arr[i]
          }
          console.log(arr)
          var p1 = result.data.content.url_image_produce
          var arr1 = p1.split(",")
          for (var i = 0; i < arr1.length; i++) {
            arr1[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + arr1[i]
          }
          console.log(arr1)
          if (p2) {
            var p2 = result.data.content.url_image_retail
            var arr2 = p2.split(",")
            for (var i = 0; i < arr2.length; i++) {
              arr2[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/biz/' + arr2[i]
            }
          } else {
            arr2 = []
          }
          console.log(arr2)
          that.setData({ biz: result.data.content, pArr: arr, pArr1: arr1, pArr2: arr2 });

        },
        fail: function (result) {
          console.log(result)
        }
      })
    }
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