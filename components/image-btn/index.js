// components/image-btn/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // opentype:""
  },

  /**
   * 组件的初始数据
   */
  data: {
    like:false,
    count:12,
    count1:122
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event){
      this.like = !this.like
      console.log(event)
    }
  }
})
