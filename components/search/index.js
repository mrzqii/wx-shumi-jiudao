// 必须相对路径
import {KeywordModel} from '../../models/keyword.js'
import { BookModel} from '../../models/book.js'
import { paginationBev } from '../behaviors/pagination.js'

const keywordModel = new KeywordModel
const bookModel = new BookModel
Component({

  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type: String,
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    // dataArray:[],
    searching:false,
    q:'',
    // 通过这个变量设置一个锁，当数据还没有返回回来的时候就不能再次执行请求数据
    loading:false,
    loadingCenter:false

  },
  // 小程序组件在初始化的时候会调用这个生命周期函数
  attached(){
    // 优化
    // const historyWords = keywordModel.getHistory()
    // const hotWords = keywordModel.getHot()
    this.setData({
      historyWords: keywordModel.getHistory()
    });
    keywordModel.getHot().then( res=> {
      this.setData({
        hotWords:res.hot
      })
    })
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载更多：当数据总条数达到total了以后就不需要再发送请求了
    // 当上一条数据请求回来了才能请求第二条
    loadMore(){
      if(!this.data.q) return
      // 为了让代码语义化
      // if(this.data.loading) return 
      if (this._isLocked()) return 
      
      if(this.hasMore()){
        // 不用setData就没有双向绑定的功能，这里不需要
        // this.data.loading = true
        // 语义化处理
        this._locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
        .then( res=> {
          this.setMoreData(res.books)
          // const newArray = this.data.dataArray.concat(res.books)
          // this.data.loading = false
          this._unlocked()
        }, () => {
          // 细节：当请求失败的时候也是需要解锁的。当我们突然断网以后就算请求没有成功也需要把锁解开。不然就是死锁了
          this._unlocked()
        })
      }

    },
    onCancel(){
      this.initialize()
      // 为什么我们使用trigger把这个事件抛出来，而不是通过在组件里面设置一个变量来控制隐藏显示
      // 其实是为了组件的通用性，把决定权抛到外部。自己不处理太具体的逻辑。
      this.triggerEvent('cancel',{},{})
    },
    // 用户点击搜索的×按钮
    onDelete(){
      // this.setData({
      //   searching: false
      // })
      this.initialize()
      this._closeResult()
    },
    onConfirm(event){
      this._showResult()
      // 显示loading图案
      this._showLoadingCenter()
    //  清空之前的数据
      this.initialize()
      // event.detail.value是input框的输入值
      // event.detail.text是子组件v-tag派发的tapping事件携带的参数text
      const q = event.detail.value || event.detail.text
      this.setData({
        // dataArray:res.books,
        q: q
      })
      bookModel.search(0, q)
      .then( res=> {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        // 表示关键词有正确的返回值以后再把储存
        keywordModel.addToHistory(q)
        // 隐藏loading图案
        this._hideLoadingCenter()
      })
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    },
    _isLocked(){
      return this.data.loading? true:false
    },
    _locked(){
      this.setData({
        loading:true
      })
      // loading需要在wxml里面使用，所以需要进行数据双向的绑定
      // this.data.loading = true
    },
    _unlocked(){
      this.setData({
        loading: false
      })
      // loading需要在wxml里面使用，所以需要进行数据双向的绑定
      // this.data.loading = false
    },
    _showResult(){
      this.setData({
        searching: true,
 
      })
    },
    _closeResult(){
      this.setData({
        searching: false,
        q:''
      })
    }

  }
})
