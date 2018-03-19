// pages/item/index.js
var app = getApp();
var initdata = function (that) {
  var list = that.data.list
  for (var i = 0; i < list.length; i++) {
    list[i].txtStyle = ""
  }
  that.setData({ list: list })
}   
var user_id='' 
var id = ''
var operation = ''
var password = ''
var bizId = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 180,//删除按钮宽度单位（rpx） 
    list:'',
    showModal: false,
    itemObj:'',
    itemStyle:'display:none',
    itemNone:'display:block',
    groundingStyle:'display:none',
    underStyle: 'display:none',
    deleteStyle: 'display:none',
    selectedAllStatus: false,
    selectedAll:false,
    userId:'',
    isEdit:'display:block',
    isSelect:'display:none;',
    isUpEdit: 'display:block',
    isUpSelect: 'display:none;',
    isDownEdit: 'display:block',
    isDownSelect: 'display:none;',
    isDelEdit: 'display:block',
    isDelSelect: 'display:none;',
    current:{
      all:'tab-current',
      up:'',
      down:'',
      del:''
    },
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data.content)
        user_id = res.data.content.user_id
        bizId = res.data.content.biz_id
        that.setData({
          userId: user_id,
        })
        var url = 'item/index'
        var params = {}
        var api_result = api_request(url, params)
        that.initEleWidth();
        // 网络请求
        function api_request(url, api_params) {
          // 生成签名
          console.log(bizId)
          app.sign_generate(api_params)

          // 通过小程序的网络请求API发送请求 time_delete:'null', bizId
          wx.request({
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            url: app.globalData.url_api + url,
            data: { app_type: 'item', time_delete: 'NULL', biz_id: bizId},
            success: function (result) {
              if (result.data.status == 200) {
                for (var i = 0; i < result.data.content.length; i++) {
                  result.data.content[i].txtStyle = ""
                  result.data.content[i].selected = false
                }
                that.setData({
                  list: result.data.content,
                  itemStyle: 'display:block',
                  itemNone: 'display:none',
                  groundingStyle: 'display:none',
                  underStyle: 'display:none',
                  deleteStyle: 'display:none',
                })
              } else {
                that.setData({
                  list: [],
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
      fail: function (err) {
         
      }
    })
   
  },
  escEdit: function (e) {
    this.setData({
      isEdit: 'display:block',
      isSelect: 'display:none;',
    });
  },
  bindCheckbox: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = this.data.list[index].selected;
    var list = this.data.list;
    var num = parseInt(this.data.list[index].num);
    var price = this.data.list[index].price;
    if (!selected) {
      this.setData({
        count: this.data.count + num * price,
        number: num + this.data.number

      });
    } else {
      this.setData({
        count: this.data.count - num * price,
        number: this.data.number - num

      });
    }

    list[index].selected = !selected;

    this.setData({
      list: list
    });
  },
  bindSelectAll: function (e) {
    var selectedAllStatus = this.data.selectedAllStatus;
    var selectedAll = !selectedAllStatus;
    var list = this.data.list;
    
    if (!selectedAllStatus) {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAll;
        //var num = parseInt(this.data.list[i].num);
        //var price = parseInt(this.data.list[i].price);
        //this.setData({
          //count: this.data.count - num * price,
          //number: this.data.number - num

        //});
      }
      this.setData({
        list: list,
        selectedAllStatus:true
      });
    }else{
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAll;
        //var num = parseInt(this.data.list[i].num);
        //var price = parseInt(this.data.list[i].price);
        //this.setData({
        //count: this.data.count - num * price,
        //number: this.data.number - num

        //});
      }
      this.setData({
        list: list,
        selectedAllStatus: false
      });
    }
  },
  SelectAll:function(e){
    var selectedAllStatus = this.data.selectedAll;
    var selectedAll = !selectedAllStatus;
    var list = this.data.list;

    if (!selectedAllStatus) {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAll;
        //var num = parseInt(this.data.list[i].num);
        //var price = parseInt(this.data.list[i].price);
        //this.setData({
        //count: this.data.count - num * price,
        //number: this.data.number - num

        //});
      }
      this.setData({
        list: list,
        selectedAll: true
      });
    } else {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = selectedAll;
        //var num = parseInt(this.data.list[i].num);
        //var price = parseInt(this.data.list[i].price);
        //this.setData({
        //count: this.data.count - num * price,
        //number: this.data.number - num

        //});
      }
      this.setData({
        list: list,
        selectedAll: false
      });
    }
  },
  deleteItemAll:function(e){
    var all = this.data.selectedAllStatus
    var userId = e.currentTarget.dataset.user
    var value = e.currentTarget.dataset.value
    var title = e.currentTarget.dataset.title
    var arr = []
    var list = this.data.list
    if (this.data.selectedAllStatus === true){
      console.log(this.data.selectedAllStatus)
      for (var i = 0; i < list.length; i++){
        arr[i] = list[i].item_id
      }
    }else{
      console.log(this.data.selectedAllStatus)
      for (var i = 0; i < list.length; i++) {
        if (list[i].selected === true){
          arr.push(list[i])
        }
      }
      wx.setStorage({
        key: 'list',
        data: arr,
      })
    }
    this.setData({
      title: title,
      value: value
    });
    wx.navigateTo({
      url: 'deleteItem?user=' + userId + '&biz=' + bizId + '&all=' + all,
    })
  },
  delete: function (e) {
    var itemId = e.currentTarget.dataset.name
    var value = e.currentTarget.dataset.value
    var title = e.currentTarget.dataset.title
    console.log(value)
    this.setData({
      title: title,
      value: value
    });
    wx.navigateTo({
      url: 'deleteItem?id=' + itemId + '&biz=' + bizId + '&user=' + user_id,
    })
  },
  itemDeleted:function(e){

    var that = this
    that.setData({
      current: {
        all: '',
        up: '',
        down: '',
        del: 'tab-current'
      },
      isEdit: 'display:block',
      isSelect: 'display:none;',
    })
    var url = 'item/index'
    var params = {}
    var api_result = api_request(url, params)
    that.initEleWidth();
    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      console.log(bizId)
      app.sign_generate(api_params)

      // 通过小程序的网络请求API发送请求 time_delete:'null', bizId
      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'item', time_delete: 'IS NOT NULL', biz_id: bizId },
        success: function (result) {
          if (result.data.status == 200) {
            for (var i = 0; i < result.data.content.length; i++) {
              result.data.content[i].txtStyle = ""
              result.data.content[i].selected = false
            }
            that.setData({
              list: result.data.content,
            })
          } else {
            that.setData({
              list: [],
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
    /* 
    wx.navigateTo({
      url: 'itemDeleted',
    })
    */
  },
  listClick:function(e){
    var itemId = e.currentTarget.dataset.name
    wx.navigateTo({
      url: 'detail?id='+itemId,
    })
  },
  editClick:function(e){
    var that = this
    that.setData({
      isEdit: 'display:none',
      isSelect: 'display:block;'
    })
    
  },
  createItem:function(e){
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res)
        bizId = bizId = res.data.content.biz_id
        console.log(bizId)
        if (bizId) {
          wx.navigateTo({
            url: 'createItem?biz=' + bizId,
          })
        }
      },
      fail: function (err) {
        console.log(err)
        console.log("用户注册后创建了biz，这里user中没有bizID要去biz本地中")
        wx.getStorage({
          key: 'biz',
          success: function (res) {
            console.log(res)
            bizId = res.data.data.content.id
            console.log(bizId)
            if (bizId) {
              wx.navigateTo({
                url: 'createItem?biz=' + bizId,
              })
            }
          },
          fail: function (err) {
            console.log(err)
            console.log("如果biz——id为空")
            wx.showToast({
              title: '请先创建商家',
              icon: 'loading',
              duration: 2000
            })
          }
        })
      }
    })
    
    
    
  },
  //快速创建
  fastCreateItem: function (e) {

  },
  allItem:function(e){
    var that = this
    that.setData({
      current: {
        all: 'tab-current',
        up: '',
        down: '',
        del: ''
      },
      isEdit: 'display:block',
      isSelect: 'display:none;',
    })
    var url = 'item/index'
    var params = {}
    var api_result = api_request(url, params)
    that.initEleWidth();
    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      console.log(bizId)
      app.sign_generate(api_params)

      // 通过小程序的网络请求API发送请求 time_delete:'null', bizId
      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'item', time_delete: 'NULL', biz_id: bizId },
        success: function (result) {
          if (result.data.status == 200) {
            for (var i = 0; i < result.data.content.length; i++) {
              result.data.content[i].txtStyle = ""
              result.data.content[i].selected = false
            }
            that.setData({
              list: result.data.content,
              itemStyle: 'display:block',
              itemNone: 'display:none',
              groundingStyle: 'display:none',
              underStyle: 'display:none',
              deleteStyle: 'display:none',
            })
          } else {
            that.setData({
              list: [],
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
  //上架
  grounding:function(e){
    var that = this
    that.setData({
      current: {
        all: '',
        up: 'tab-current',
        down: '',
        del: ''
      },
      isEdit: 'display:block',
      isSelect: 'display:none;',
    })
    var url = 'item/index'
    var params = {}
    var api_result = api_request(url, params)
    that.initEleWidth();
    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      console.log(bizId)
      app.sign_generate(api_params)

      // 通过小程序的网络请求API发送请求 time_delete:'null', bizId
      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'item', time_delete: 'IS PUBLISH NULL', biz_id: bizId },
        success: function (result) {
          if (result.data.status == 200) {
            for (var i = 0; i < result.data.content.length; i++) {
              result.data.content[i].txtStyle = ""
              result.data.content[i].selected = false
            }
            that.setData({
              list: result.data.content,
            })
          }else{
            that.setData({
              list: [],
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
    /* 
    wx.navigateTo({
      url: 'grounding'
    })
    */
  },
  //下架
  undercarriage:function(e){
    var that = this
    that.setData({
      current: {
        all: '',
        up: '',
        down: 'tab-current',
        del: ''
      },
      isEdit: 'display:block',
      isSelect: 'display:none;',
    })
    var url = 'item/index'
    var params = {}
    var api_result = api_request(url, params)
    that.initEleWidth();
    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      console.log(bizId)
      app.sign_generate(api_params)

      // 通过小程序的网络请求API发送请求 time_delete:'null', bizId
      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'item', time_delete: 'IS SUSPEND NULL', biz_id: bizId },
        success: function (result) {
          if (result.data.status == 200) {
            for (var i = 0; i < result.data.content.length; i++) {
              result.data.content[i].txtStyle = ""
              result.data.content[i].selected = false
            }
            that.setData({
              list: result.data.content,
            })
          } else {
            that.setData({
              list: [],
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
    /*
    wx.navigateTo({
      url: 'undercarriage'
    })
    */
  },
  freightTemplate:function(e){
    wx.navigateTo({
      url: '../freight/index'
    })
  },
  
  editItem: function (e) {
    var itemId = e.currentTarget.dataset.name
    console.log(itemId)
    wx.navigateTo({
      url: 'edit?id=' + itemId,
    })
  },
  
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置  
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var that = this
    initdata(that)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置  
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值  
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变  
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离  
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度  
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项  
      var index = e.currentTarget.dataset.index;
      var list = this.data.list;
      console.log(list)
      console.log(index)
      console.log(txtStyle)
      list[index].txtStyle = txtStyle;
      //更新列表的状态  
      this.setData({
        list: list
      });
    }
  },

  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置  
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离  
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮  
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项  
      var index = e.currentTarget.dataset.index;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态  
      this.setData({
        list: list
      });
    }
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
  //点击删除按钮事件  
  delItem: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          //获取列表中要删除项的下标  
          var index = e.currentTarget.dataset.index;
          var list = that.data.list;
          //移除列表中下标为index的项  
          list.splice(index, 1);
          //更新列表的状态  
          that.setData({
            list: list
          });
        } else {
          initdata(that)
        }
      }
    })

  }  ,
  /**
  * 弹窗
  */
  showDialogBtn: function (e) {
    this.setData({
      showModal: true
    })
    var that = this
    id=e.currentTarget.dataset.name;
    console.log(id)

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
        data: { app_type: 'item', id: id },
        success: function (result) {
          if (result.data.status == 200) {
            var thisObj = result.data.content
            that.setData({
              itemObj: thisObj,
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
  getPassword:function(e){
    password = e.detail.value
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
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
    this.hideModal();
    var that = this
    var url = 'item/edit_bulk'
    var params = {}
    var api_result = api_request(url, params)

    console.log(user_id)
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
        data: { app_type: 'biz', user_id: user_id, ids: id, operation: 'delete', password: password},
        success: function (result) {
          console.log(user_id)
          console.log(operation)
          console.log(password)
          if (result.data.status == 200) {
            wx.showToast({
              title: '商品删除成功',
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
  backItem:function(e){

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