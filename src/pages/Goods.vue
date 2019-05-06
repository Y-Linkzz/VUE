<template>
    <div class="main">
      商品内容
      
      <button @click.stop="add" class="cube-btn">+</button>
      <button @click.stop="add" class="cube-btn">+</button>
      <button @click.stop="add" class="cube-btn">+</button>
    <div class="shop-cart">
      <Moveball ref="shopcart"></Moveball>
    </div>
    </div>
    
</template>

<script>
import Moveball from "../components/Moveball.vue"
import state from "../observable.js"
export default {
  data() {
    return {
      isok:true
     }
  },
  methods: {
    fetch(){
      if(this.isok){
          this.isok = false;
      }
      //发送请求
    },
    popupshow(){
      state.ispopup = true;
    },
    popupshow2(){
      this.$createDialog({
        type:'confirm',
        title:"6666",
        content:'777777',
        $events:{
          confirm:()=>{
            console.log(111)
          }
        }
      }).show();
    },
    //点击添加的按键---------
    add(el){
      // console.log(el)
      this._drop(el.target)
    },
    _drop(el){
      // 体验优化,异步执行下落动画
      this.$nextTick(()=>{
        this.$refs.shopcart.drop(el)
      })
    }
    //-----------------------------
  },
  computed: { //用这个来拿公有数据
    state() {
      return state;
    }
  },
  components:{
    Moveball
  }
};
</script>
<style scoped>
.shop-cart{
  position:fixed;
  width:100%;
  height:50px;
  bottom:0;
  left:0;
}
.main{
  height:100%;
}
.cube-btn{
  width:16px;
  height:16px;
  margin-left:280px;
  border-radius:50%;
  
}
</style>
