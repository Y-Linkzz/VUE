<template>
  <div id="app">
    <cube-button @click="goto('home')">tab-basic</cube-button>
    <cube-button @click="goto('button')">tab-composite</cube-button>
    <cube-view></cube-view>
  </div>
</template>

<script>
import CubeView from './components/cube-view.vue'
export default {
  name: 'app',
  methods: {
    goto(subPath){
      this.$router.push({ name: subPath});
    }
  },
  components: {
     CubeView
  },
  
}
</script>