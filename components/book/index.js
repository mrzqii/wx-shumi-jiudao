// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      const bid = this.properties.book.id
      // 直接在组件里面跳转是非常方便的，但是一个弊端就是通用性降低了 所以就要权衡自己的项目和需求
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`,
      })
       
    }

  }
})
