<template>
    <transition name="fade">
        <cube-popup 
        type="my-popup" 
        ref="myPopup"
        v-show="state.ispopup"
        :maskClosable = true
        :z-index=90
        position = "bottom"
        @mask-click ="maskClick"
        >
        <transition name="move">
        <div class="popcontent" v-show="state.ispopup">
            6666
        </div>
        </transition>
        </cube-popup>
    </transition>
    
</template>

<script>
import state from "../observable.js"
export default {
  data() {
    return {
        
    };
  },
  methods: {
    maskClick() {
      state.ispopup = false;
    }
  },
  computed: { //用这个来拿公有数据
    state() {
      return state;
    }
  }
};
</script>

<style scoped>
.cube-my-popup{
  /*设置弹窗的位置*/
  bottom: 150px;
}
.fade-enter,.fade-leave-to{
  /*进入之间的状态  和 离开的状态*/
  opacity: 0;
}
.fade-enter-active,.fade-leave-active{
  /*过渡时间曲线*/
  transition: all .3s ease-in-out;
}
.move-enter,.move-leave-to{
  /*过渡效果加v-show*/
  transform: translate3d(0,100%,0)
}
.move-enter-active,.move-leave-active{
  transition: all .3s ease-in-out;
}
.popcontent{
    background: red;
    text-align: center;
    height: 80px;
}
</style>
