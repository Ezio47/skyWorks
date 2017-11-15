<template>
  <div class="con">
       <SkylineMap></SkylineMap>
  </div>
</template>

<script>

  import SkylineMap from '../skycompnents/map/SkylineMap.vue'
export default {
  name: 'HelloWorld',
  components: {SkylineMap},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.con{
  width: 100%;
  height: 100%;
}
</style>
