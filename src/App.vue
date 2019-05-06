<template>
  <div id="app">
    <div class="tab-wrapper">
        <Tab :tabs="tabs" :initialIndex="0"></Tab>
    </div>

    <Popup></Popup>
  </div>
</template>

<script>
import Goods from "./pages/Goods"
import Ratings from "./pages/Ratings"
import Tab from "./components/tab"
import Popup from "./components/Popup.vue"

export default {
  data(){
    return{
      seller:{},
    }
  },
  computed:{
    tabs(){
      return [
        {
        label:'商品',
        component:Goods, 
        data:{seller:this.seller}
        },
        {
        label:'评价',
        component:Ratings, 
        data:{seller:this.seller}
        }
      ]
    }
  },
  components: {
     Tab,
     Popup
     
  },
  
}
</script>

<style >
html,body{
  height: 100%;
}
#app{
  height: 100%;
}
.tab-wrapper{
  height: 100%;
}

</style>
