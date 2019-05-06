<template>
    <div class="ball-container">
        <transition name="fade" v-for="ball in balls"  @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
    </div>
    
</template>

<script>
export default {
  data() {
    return {
        balls:[ //设置5个小球
            {show:false},
            {show:false},
            {show:false},
            {show:false},
            {show:false}
        ],
        dropBalls:[]
     }
  },
  methods: {
    drop(el){
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { //将false的小球放到dropBalls
            ball.show = true;
            ball.el = el; //设置小球的el属性为一个dom对象
            this.dropBalls.push(ball); 
            return;
          }
        }
    },
    beforeEnter(el){ //这个方法的执行是因为这是一个vue的监听事件
        const ball = this.dropBalls[this.dropBalls.length - 1] //最后一个也就是最新的一个
        const rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
        const x = rect.left - 32   //32是存放小球距离手机屏幕的left值
        const y = -(window.innerHeight - rect.top - 22) //负数,因为是从左上角往下的的方向
        el.style.display = "" //清空display
        el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`; 
        //处理内层动画
        let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
        inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
    },
    enter(el, done) { //这个方法的执行是因为这是一个vue的监听事件
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; //触发重绘html
        this.$nextTick(() => { //让动画效果异步执行,提高性能
          el.style.transform = el.style.webkitTransform = 'translate3d(0,0,0)';
          //处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
          inner.style.transform = inner.style.webkitTransform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
        });
    },
    afterEnter(el){   //这个方法的执行是因为这是一个vue的监听事件
        let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
        if (ball) {
          ball.show = false;
          el.style.display = 'none'; //隐藏小球
        }
    }
  }
};
</script>

<style scoped>
.ball-container{
  width:50px;
  height:50px;
  background:black;
  margin-left:16px;
}
.ball-container .ball{
  position:fixed;
  left: 32px;
  bottom: 22px;
  z-index:200;
  transition: all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
.ball-container .inner{
  width:16px;
  height:16px;
  border-radius:50%;
  background:rgb(0,160,220);
  transition: all .6s linear;
}
</style>
