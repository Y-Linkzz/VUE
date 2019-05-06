<template>
    <div class="tab">
       <cube-tab-bar v-model="selectedLabel"
                    show-slider
                    :use-transition="disabled"
                    ref="tabNav"
                    :data="tabs"
                    >
                <cube-tab v-for="(item, index) in tabs"  :label="item.label" :key="item.label">
                </cube-tab>
       </cube-tab-bar>
       
     <div class="slide-wrapper">  
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="index"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
        
          <cube-slide-item v-for="(tab,index) in tabs" :key="index">
            <component :is="tab.component" :data="tab.data" ref="component"></component>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props:{
          tabs:{
            type:Array,
            default(){
              return {}
            }
          },
          initialIndex:{
            type:Number,
            default:0
          }
        },
    data () {
      return {
        disabled: false,
        loop: false,
        autoPlay: false,
        showDots: false,
        
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          /* lock y-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        },
        scrollOptions: {
          /* lock x-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        },

        index:this.initialIndex
        
      }
    },
    mounted(){
      var silde = document.querySelector('.cube-tab-bar-slider');
      var html = `<span class="slider"></span>`;
      silde.innerHTML = html;
      this.changePage(this.index); //默认渲染当前的index
    },
    methods: {
      changePage (current) {
        this.index = current;
        const component = this.$refs.component[current];
        component.fetch && component.fetch()  //组件是否有该方法 有就调用
      },
      scroll (pos) {
        const x = Math.abs(pos.x)
        const tabItemWidth = this.$refs.tabNav.$el.clientWidth
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
        const deltaX = x / slideScrollerWidth * tabItemWidth
        this.$refs.tabNav.setSliderTransform(deltaX)
      }
    },
    computed:{
      selectedLabel:{
        get(){
          return this.tabs[this.index].label
        },
        set(newVal) {
        this.index = this.tabs.findIndex((value)=>{
          return value.label === newVal
        })
       }
      }
    }
    
  }
</script>

<style  scoped >
.tab{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.slide-wrapper{
  flex: 1;
}
.tab >>> .cube-tab{
  padding: 10px 0;
  width: 50px;
}
.tab >>> .cube-tab_active{
  color: red;
}
.tab >>> .cube-tab-bar-slider{
  background:transparent;
  /* background: red; */
}
.tab >>> .slider{
  display: block;
  margin: auto;
  height: 100%;
  width: 50px;
  background: red;
}
</style>



