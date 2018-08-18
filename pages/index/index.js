//index.js
//获取应用实例
let timer;//定时器
let numAi=0;//电脑图片下标标记
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status:true,
    winNum:0,
    imageAiSrc: '',
    imageUserSrc:'/pages/image/wenhao.jpg',
    gameOfPlay:'',
    srcs:[
      '/pages/image/shitou.jpg',
      '/pages/image/jiandao.jpg',
      '/pages/image/bu.jpg',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.timeGo();
    // let sum = Math.floor(Math.random() * 4);
    // console.log(sum);
    wx.getStorage({
      key: 'winNum',
      success: function (res) {
        that.setData({ winNum: res.data});
      }
    })
  },

  timeGo:function(){
    timer = setInterval(this.move,100);
  },

  /*让电脑随机产生图片*/
  move:function(){
    this.setData({ imageAiSrc: this.data.srcs[numAi] });
    numAi = Math.floor(Math.random() * 3);
  },

  /*重新开局*/
  again:function(e){
    if(!this.data.status){//消除双重点击again导致定时器无法清除的bug
      this.timeGo();
    }
    this.setData({imageUserSrc:'/pages/image/wenhao.jpg'});
    this.setData({ status: true });
  },

  /*获取你选择的图片*/
  changeForChoose(e){
    if (this.data.status){
        let currentId = e.currentTarget.id;
        this.setData({ imageUserSrc: this.data.srcs[currentId]});
        clearInterval(timer);
        this.calculate();
        this.setData({status:false});
    }
  },

  /*判断谁赢谁输*/
  calculate:function(){
    let user = this.data.imageUserSrc;
    // console.log(user);
    let Ai = this.data.imageAiSrc;
    let num = this.data.winNum;
    if (user == Ai){
      this.setData({ gameOfPlay:'平局'});
    } else if (user == '/pages/image/shitou.jpg' && Ai == '/pages/image/jiandao.jpg' || user == '/pages/image/jiandao.jpg' && Ai == '/pages/image/bu.jpg' || user == '/pages/image/bu.jpg' && Ai == '/pages/image/shitou.jpg'){
      num++;
      this.setData({ gameOfPlay: '你赢了' });
      wx.setStorage({key: 'winNum', data: num })
    }else{
      this.setData({ gameOfPlay: '你输了' });
    }
    this.setData({ winNum: num });
  }
})