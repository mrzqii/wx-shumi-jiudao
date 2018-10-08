const paginationBev = Behavior({
  data:{
    dataArray:[],
    total: null,
    noneResult:false
  },
  methods:{
    // 新添加的数据
    setMoreData(dataArray){
      const temArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: temArray
      })
    },
    getCurrentStart(){
      return this.data.dataArray.length
    },
    setTotal(total){
      this.data.total = total
      if(total===0){
        this.setData({
          noneResult:true
        })
      }
    },
    // 是否还有更多的数据需要加载
    hasMore(){
      if (this.data.dataArray.length >= this.data.total) {
        return false
      }else{
        return true
      }

    },
    initialize(){
      this.setData({
        dataArray :[],
        noneResult:false

      })
      // 如果这样设置不会触发DOM更新
      this.data.dataArray = []
      this.data.total = null
    }
  }
})

export { paginationBev }